import * as React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardActions, Button, Stack, Divider, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Paper, TextField, BottomNavigation, BottomNavigationAction, IconButton, Tooltip
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CancelIcon from '@mui/icons-material/Cancel';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import { Viewer } from '@react-pdf-viewer/core';

// --- StatusTabs Component ---
function StatusTabs({ value, onChange }) {
  return (
    <Paper elevation={3} sx={{ mb: 3, borderRadius: 3 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={onChange}
        sx={{
          height: 56,
          px: 2,
          '& .MuiBottomNavigationAction-root': {
            mx: 2,
            minWidth: 260,
          },
          '& .Mui-selected': {
            color: '#1976d2',
          },
        }}
      >
        <BottomNavigationAction
          label="In Process"
          value="Forwarded"
          icon={<PendingActionsIcon sx={{ fontSize: 28 }} />}
        />
        <BottomNavigationAction
          label="Approved"
          value="Approved"
          icon={<ThumbUpIcon sx={{ fontSize: 28 }} />}
        />
        <BottomNavigationAction
          label="Rejected"
          value="Rejected"
          icon={<ThumbDownIcon sx={{ fontSize: 28 }} />}
        />
      </BottomNavigation>
    </Paper>
  );
}

// --- Document Preview Dialog ---
function isPdf(val) {
  return typeof val === 'string' && (
    val.toLowerCase().includes('application/pdf') ||
    val.toLowerCase().endsWith('.pdf')
  );
}

function DocumentPreviewDialog({ open, docUrl, docType, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Document Preview</DialogTitle>
      <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        {docUrl ? (
          isPdf(docUrl) ? (
            <div style={{ width: 600, height: 800 }}>
              <Viewer fileUrl={docUrl} />
            </div>
          ) : (
            <img src={docUrl} alt={docType} style={{ maxWidth: 600, maxHeight: 800, borderRadius: 8 }} />
          )
        ) : (
          <Typography>No document found.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">Close</Button>
      </DialogActions>
    </Dialog>
  );
}

// --- ClaimDocumentDialog Component ---
function ClaimDocumentDialog({ open, claim, document, onClose }) {
  const [previewDocUrl, setPreviewDocUrl] = React.useState(null);
  const [previewDocType, setPreviewDocType] = React.useState('');

  const handlePreview = (val, key) => {
    setPreviewDocUrl(val);
    setPreviewDocType(key);
  };
  const handleClosePreview = () => {
    setPreviewDocUrl(null);
    setPreviewDocType('');
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>Claim #{claim?.id} - Documents</DialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          {claim && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Claim Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>Claim ID:</strong> {claim.id}</Typography>
                  <Typography variant="body2"><strong>Customer ID:</strong> {claim.customer_id}</Typography>
                  <Typography variant="body2"><strong>Hospital ID:</strong> {claim.hospital_id || '-'}</Typography>
                  <Typography variant="body2"><strong>Expected Amount:</strong> ₹{claim.expected_amount}</Typography>
                  <Typography variant="body2"><strong>Approved Amount:</strong> ₹{claim.approved_amount || '-'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2"><strong>Status:</strong> {claim.status}</Typography>
                  <Typography variant="body2"><strong>Feedback:</strong> {claim.feedback || '-'}</Typography>
                  <Typography variant="body2"><strong>Submitted:</strong> {claim.submitted_date}</Typography>
                  <Typography variant="body2"><strong>Last Updated:</strong> {claim.last_updated_date || '-'}</Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 3 }} />
            </Box>
          )}
          {document ? (
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Uploaded Documents
              </Typography>
              <Grid container spacing={3}>
                {Object.entries(document).map(([key, val]) =>
                  key !== "id" && key !== "verified_by" && key !== "claim_id" && key !== "last_updated" && val ? (
                    <Grid item xs={12} sm={6} md={4} key={key}>
                      <Card variant="outlined" sx={{ p: 2, minHeight: 140, borderRadius: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ textTransform: 'capitalize' }}>
                          {key.replace(/_/g, ' ')}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <Tooltip title="Preview">
                            <IconButton color="primary" onClick={() => handlePreview(val, key)}>
                              <PreviewIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Download">
                            <IconButton
                              color="secondary"
                              component="a"
                              href={val}
                              download={key + (isPdf(val) ? ".pdf" : ".jpg")}
                            >
                              <DownloadIcon />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </Card>
                    </Grid>
                  ) : null
                )}
              </Grid>
            </Box>
          ) : (
            <Typography>No documents found.</Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={onClose} variant="outlined" color="error" startIcon={<CancelIcon />}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <DocumentPreviewDialog
        open={Boolean(previewDocUrl)}
        docUrl={previewDocUrl}
        docType={previewDocType}
        onClose={handleClosePreview}
      />
    </>
  );
}

// --- ValidateDialog Component with Approved Amount input and validation ---
function ValidateDialog({
  open,
  claim,
  approvedAmount,
  onChangeApprovedAmount,
  onAccept,
  onReject,
  onClose,
  loading
}) {
  const isApproveDisabled = !approvedAmount || Number(approvedAmount) === 0 || Number(approvedAmount) > (claim?.expected_amount || 0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Validate Claim #{claim?.id}</DialogTitle>
      <DialogContent>
        {claim && (
          <Box sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              Claim Summary
            </Typography>
            <Typography><strong>Expected Amount:</strong> ₹{claim.expected_amount}</Typography>
            <Typography><strong>Current Approved Amount:</strong> ₹{claim.approved_amount ?? '-'}</Typography>
            <Typography><strong>Status:</strong> {claim.status}</Typography>
            <Divider sx={{ my: 1 }} />
          </Box>
        )}

        <TextField
          label="Approved Amount (₹)"
          value={approvedAmount}
          onChange={e => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              if (claim && Number(val) <= claim.expected_amount) {
                onChangeApprovedAmount(val);
              } else if (val === '') {
                onChangeApprovedAmount('');
              }
            }
          }}
          fullWidth
          margin="normal"
          helperText={`Enter amount up to ₹${claim?.expected_amount ?? 0}`}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          disabled={loading}
          error={approvedAmount !== '' && Number(approvedAmount) > (claim?.expected_amount || 0)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onReject}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={<ThumbDownIcon />}
        >
          Reject
        </Button>
        <Button
          onClick={onAccept}
          color="success"
          variant="contained"
          disabled={loading || isApproveDisabled}
          startIcon={<ThumbUpIcon />}
        >
          Approve
        </Button>
        <Button
          onClick={onClose}
          color="inherit"
          variant="outlined"
          disabled={loading}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// --- Main CashlessPage ---
export default function CashlessPage() {
  const [claims, setClaims] = React.useState([]);
  const [documents, setDocuments] = React.useState({});
  const [tab, setTab] = React.useState('Forwarded');
  const [loading, setLoading] = React.useState(true);
  const [viewDoc, setViewDoc] = React.useState(null); // claim id
  const [validateClaim, setValidateClaim] = React.useState(null); // claim object
  const [approvedAmount, setApprovedAmount] = React.useState('');
  const [validateLoading, setValidateLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  // Fetch claims and documents
  const fetchData = React.useCallback(async () => {
    setRefreshing(true);
    try {
      const [claimsRes, docsRes] = await Promise.all([
        fetch('http://localhost:9090/claims'),
        fetch('http://localhost:9090/documents'),
      ]);
      const [claimsData, docsData] = await Promise.all([claimsRes.json(), docsRes.json()]);

      setClaims(claimsData);
      const docMap = {};
      docsData.forEach(doc => {
        docMap[doc.claim_id] = doc;
      });
      setDocuments(docMap);
    } catch (e) {
      setClaims([]);
      setDocuments({});
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Auto-refresh every 2 seconds
  React.useEffect(() => {
    fetchData(); // Initial fetch
    const interval = setInterval(() => {
      fetchData();
    }, 2000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Filter claims: status matches tab, and hospital_id is present (not null/undefined/empty)
  const filteredClaims = claims.filter(c =>
    (c.hospital_id !== null && c.hospital_id !== undefined && c.hospital_id !== '') &&
    (tab === 'Forwarded' ? c.status === 'Forwarded' : c.status === tab)
  );

  // Handle Accept/Reject
  const handleValidate = async (claim, status) => {
    setValidateLoading(true);
    try {
      // Feedback auto-set to status
      const feedbackToSend = status;

      await fetch(`http://localhost:9090/claims/${claim.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          feedback: feedbackToSend,
          approved_amount: status === 'Approved' ? Number(approvedAmount) : null,
        }),
      });
      setValidateClaim(null);
      setApprovedAmount('');
      await fetchData();
    } catch (e) {
      alert('Failed to update claim');
    } finally {
      setValidateLoading(false);
    }
  };

  function getStatusLabel(status) {
    if (status === 'Forwarded') return 'In Process';
    return status;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ flex: 1 }}>
          Cashless Claims
        </Typography>
      </Stack>

      <StatusTabs value={tab} onChange={(_, v) => setTab(v)} />

      {loading ? (
        <Typography sx={{ mt: 4, textAlign: 'center' }}>Loading claims...</Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredClaims.length === 0 ? (
            <Grid item xs={12}>
              <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 8 }}>
                No claims to display in this status.
              </Typography>
            </Grid>
          ) : (
            filteredClaims.map(claim => (
              <Grid item xs={12} md={6} lg={4} key={claim.id}>
                <Card sx={{ borderLeft: `5px solid #1976d2`, borderRadius: 3, boxShadow: 4 }}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AssignmentIcon color="primary" />
                        <Typography variant="h6" fontWeight="bold">Claim #{claim.id}</Typography>
                        <Chip
                          label={getStatusLabel(claim.status)}
                          color={
                            claim.status === "Approved"
                              ? "success"
                              : claim.status === "Rejected"
                                ? "error"
                                : "warning"
                          }
                          size="small"
                        />
                      </Stack>
                      <Divider sx={{ my: 1 }} />
                      <Typography variant="body2"><strong>Customer ID:</strong> {claim.customer_id}</Typography>
                      <Typography variant="body2"><strong>Hospital ID:</strong> {claim.hospital_id || '-'}</Typography>
                      <Typography variant="body2"><strong>Expected Amount:</strong> ₹{claim.expected_amount}</Typography>
                      <Typography variant="body2"><strong>Approved Amount:</strong> ₹{claim.approved_amount || '-'}</Typography>
                      <Typography variant="body2"><strong>Submitted:</strong> {claim.submitted_date}</Typography>
                      <Typography variant="body2"><strong>Feedback:</strong> {claim.feedback || '-'}</Typography>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      onClick={() => setViewDoc(claim.id)}
                      color="primary"
                    >
                      View
                    </Button>
                    {tab === 'Forwarded' && (
                      <Button
                        variant="contained"
                        endIcon={<DoneAllIcon />}
                        onClick={() => {
                          setValidateClaim(claim);
                          setApprovedAmount(claim.approved_amount !== null && claim.approved_amount !== undefined ? String(claim.approved_amount) : '');
                        }}
                        color="success"
                      >
                        Validate
                      </Button>
                    )}
                  </CardActions>
                </Card>
                {/* Documents Modal */}
                <ClaimDocumentDialog
                  open={viewDoc === claim.id}
                  claim={claim}
                  document={documents[claim.id]}
                  onClose={() => setViewDoc(null)}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}

      {/* Validate Modal */}
      {validateClaim && (
        <ValidateDialog
          open={Boolean(validateClaim)}
          claim={validateClaim}
          approvedAmount={approvedAmount}
          onChangeApprovedAmount={setApprovedAmount}
          onAccept={() => handleValidate(validateClaim, "Approved")}
          onReject={() => handleValidate(validateClaim, "Rejected")}
          onClose={() => {
            setValidateClaim(null);
            setApprovedAmount('');
          }}
          loading={validateLoading}
        />
      )}
    </Box>
  );
}
