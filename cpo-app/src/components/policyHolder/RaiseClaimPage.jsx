import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Stack,
  TextField,
  Button,
  Grid,
  Divider,
  Alert,
  InputLabel,
  Chip,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const docFields = [
  { key: 'blood_test', label: 'Blood Test' },
  { key: 'admission_note', label: 'Admission Note', required: true },
  { key: 'prescription', label: 'Prescription' },
  { key: 'xray_report', label: 'X-Ray Report' },
  { key: 'insurance_form', label: 'Insurance Form', required: true },
  { key: 'discharge_summary', label: 'Discharge Summary' },
  { key: 'other', label: 'Other' },
];

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}
function getNowDateTime() {
  return new Date().toISOString();
}

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Props:
 * - customerId: string or number (required)
 * - claim: existing claim object (optional)
 * - document: existing document object (optional)
 * - onClose: callback when form closes (optional)
 */
export default function RaiseClaimPage({ customerId, claim, document, onClose }) {
  const [customer, setCustomer] = React.useState(null);
  const [policies, setPolicies] = React.useState([]);
  const [customerPolicies, setCustomerPolicies] = React.useState([]);
  const [expectedAmount, setExpectedAmount] = React.useState(claim ? String(claim.expected_amount) : '');
  const [docFiles, setDocFiles] = React.useState({});
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [lastClaimId, setLastClaimId] = React.useState(null);
  const [lastDocId, setLastDocId] = React.useState(null);
  const [givenPolicyId, setGivenPolicyId] = React.useState(claim ? String(claim.given_policy_id || '') : '');
  const [loading, setLoading] = React.useState(true);

  // Fetch customer and policies on mount or when customerId changes
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        // Fetch customer by ID
        const customerRes = await fetch(`http://localhost:9090/customers/${customerId}`);
        if (!customerRes.ok) throw new Error('Failed to fetch customer');
        const customerData = await customerRes.json();

        // Fetch all policies
        const policiesRes = await fetch('http://localhost:9090/policies');
        if (!policiesRes.ok) throw new Error('Failed to fetch policies');
        const policiesData = await policiesRes.json();

        setCustomer(customerData);
        setPolicies(policiesData);

        // Filter policies that customer owns
        if (customerData?.policies && Array.isArray(customerData.policies)) {
          const customerPolicyIds = customerData.policies.map((p) => Number(p.policy_id));
          const filteredPolicies = policiesData.filter((p) =>
            customerPolicyIds.includes(Number(p.policy_id))
          );
          setCustomerPolicies(filteredPolicies);
        } else {
          setCustomerPolicies([]);
        }
      } catch (err) {
        setError(err.message || 'Failed to load customer or policies');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [customerId]);

  // Prefill docFiles and givenPolicyId on claim/document change
  React.useEffect(() => {
    if (claim && document) {
      setExpectedAmount(String(claim.expected_amount || ''));
      setGivenPolicyId(String(claim.given_policy_id || ''));
      const docObj = {};
      for (const { key } of docFields) {
        if (document[key]) docObj[key] = document[key];
      }
      setDocFiles(docObj);
    }
  }, [claim, document]);

  // Fetch last IDs for claim and document
  React.useEffect(() => {
    async function fetchLastIds() {
      try {
        const [claimsRes, docsRes] = await Promise.all([
          fetch('http://localhost:9090/claims'),
          fetch('http://localhost:9090/documents'),
        ]);
        const [claims, docs] = await Promise.all([claimsRes.json(), docsRes.json()]);
        setLastClaimId(claims.length > 0 ? Math.max(...claims.map((c) => Number(c.id))) : 3000);
        setLastDocId(docs.length > 0 ? Math.max(...docs.map((d) => Number(d.id))) : 5000);
      } catch {
        // silently fail or set error
      }
    }
    fetchLastIds();
  }, []);

  const handleFileChange = async (key, file) => {
    setError('');
    if (!file) return;
    try {
      const base64 = await fileToBase64(file);
      setDocFiles((prev) => ({ ...prev, [key]: base64 }));
    } catch (err) {
      setError(`Failed to read ${key.replace(/_/g, ' ')}: ${err.message}`);
    }
  };

  const handleCancel = () => {
    setExpectedAmount('');
    setDocFiles({});
    setError('');
    setSuccess('');
    setGivenPolicyId('');
    if (onClose) onClose(false);
  };

  const validate = () => {
    if (!givenPolicyId) return 'Please select a Policy.';
    if (!expectedAmount || isNaN(expectedAmount)) return 'Expected Amount is required and must be a number.';
    for (const field of docFields) {
      if (field.required && !docFiles[field.key]) {
        return `${field.label} is required.`;
      }
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setSubmitting(true);

    const claimId = claim?.id || (lastClaimId !== null ? String(Number(lastClaimId) + 1) : '3001');
    const docId = claim?.doc_id || (lastDocId !== null ? String(Number(lastDocId) + 1) : '5001');
    const submittedDate = getTodayDate();
    const lastUpdated = getNowDateTime();

    const docPayload = {
      id: docId,
      claim_id: claimId,
      last_updated: submittedDate,
    };
    for (const { key } of docFields) {
      docPayload[key] = docFiles[key] || '';
    }

    try {
      // Save document
      await fetch(`http://localhost:9090/documents${claim?.doc_id ? '/' + claim.doc_id : ''}`, {
        method: claim?.doc_id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(docPayload),
      });

      // Save claim with given_policy_id
      const claimPayload = {
        id: claimId,
        customer_id: Number(customerId),
        doc_id: docId,
        expected_amount: Number(expectedAmount),
        approved_amount: claim?.approved_amount || null,
        submitted_date: submittedDate,
        last_updated_date: lastUpdated,
        status: claim?.status || 'Raised',
        feedback: claim?.feedback || '',
        document: docId,
        hospital_id: claim?.hospital_id || null,
        medical_valid: claim?.medical_valid || [],
        given_policy_id: Number(givenPolicyId),
      };
      await fetch(`http://localhost:9090/claims${claim?.id ? '/' + claim.id : ''}`, {
        method: claim?.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(claimPayload),
      });

      setSuccess('Claim saved successfully!');
      setExpectedAmount('');
      setDocFiles({});
      setGivenPolicyId('');
      setLastClaimId(Number(claimId));
      setLastDocId(Number(docId));
      if (onClose) onClose(true);
    } catch (err) {
      setError(err.message || 'Failed to save claim.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !customer) {
    return (
      <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {claim ? 'Edit Claim' : 'Raise New Claim'}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <form onSubmit={handleSubmit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Customer ID"
              name="customer_id"
              value={customer?.id || customerId}
              InputProps={{ readOnly: true }}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth required error={!!error && error.toLowerCase().includes('policy')}>
              <InputLabel id="policy-select-label">Policy Name</InputLabel>
              <Select
                labelId="policy-select-label"
                id="policy-select"
                value={givenPolicyId}
                label="Policy Name"
                onChange={(e) => setGivenPolicyId(e.target.value)}
                disabled={submitting}
              >
                {customerPolicies.length === 0 && (
                  <MenuItem value="" disabled>
                    No policies available
                  </MenuItem>
                )}
                {customerPolicies.map((p) => (
                  <MenuItem key={p.policy_id} value={String(p.policy_id)}>
                    {p.policy_name}
                  </MenuItem>
                ))}
              </Select>
              {!!error && error.toLowerCase().includes('policy') && (
                <FormHelperText>{error}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Expected Amount (₹)"
              value={expectedAmount}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) setExpectedAmount(val);
              }}
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              fullWidth
              error={!!error && error.toLowerCase().includes('amount')}
              helperText="Enter numbers only"
            />

            <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 2 }}>
              Upload Documents
            </Typography>
            <Grid container spacing={2}>
              {docFields.map(({ key, label, required }) => (
                <Grid item xs={12} sm={6} key={key}>
                  <InputLabel required={!!required}>{label}</InputLabel>
                  {docFiles[key] && (
                    <Chip
                      icon={<CheckCircleIcon color="success" />}
                      label="Already uploaded"
                      color="success"
                      size="small"
                      sx={{ mb: 1, mt: 0.5 }}
                    />
                  )}
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(key, e.target.files[0])}
                    style={{ marginTop: 4 }}
                    disabled={submitting}
                  />
                </Grid>
              ))}
            </Grid>

            <TextField
              label="Submitted Date"
              value={claim?.submitted_date || getTodayDate()}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Last Updated"
              value={getNowDateTime().slice(0, 19).replace('T', ' ')}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            {error && !error.toLowerCase().includes('policy') && <Alert severity="error">{error}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <Button type="submit" variant="contained" color="primary" disabled={submitting}>
                {claim ? 'Update' : 'Submit'}
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel} disabled={submitting}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
