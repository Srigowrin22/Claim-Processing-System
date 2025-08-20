// import React from 'react';
// import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// const orders = [
//   { id: 1, customer: 'Alice', product: 'Laptop', status: 'Shipped' },
//   { id: 2, customer: 'Bob', product: 'Smartphone', status: 'Processing' },
//   { id: 3, customer: 'Charlie', product: 'Tablet', status: 'Delivered' },
// ];

// export default function Cashless() {
//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Orders</Typography>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Order ID</TableCell>
//               <TableCell>Customer</TableCell>
//               <TableCell>Product</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{order.customer}</TableCell>
//                 <TableCell>{order.product}</TableCell>
//                 <TableCell>{order.status}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  CircularProgress,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import DoneAllIcon from '@mui/icons-material/DoneAll';

// ---- STATIC DATA ----
const staticClaims = [
  {
    claim_id: 1,
    customer_id: 100,
    hospital_id: 501,
    doc_id: 9001,
    expected_amount: 20000,
    approved_amount: 0,
    submitted_date: '2025-06-01',
    last_updated_date: '2025-06-02',
    status: 'submitted',
    canAct: false,
  },
  {
    claim_id: 2,
    customer_id: 101,
    hospital_id: 502,
    doc_id: 9002,
    expected_amount: 15000,
    approved_amount: 0,
    submitted_date: '2025-06-03',
    last_updated_date: '2025-06-04',
    status: 'submitted',
    canAct: false,
  },
  {
    claim_id: 3,
    customer_id: 102,
    hospital_id: 503,
    doc_id: 9003,
    expected_amount: 18000,
    approved_amount: 0,
    submitted_date: '2025-06-05',
    last_updated_date: '2025-06-06',
    status: 'validated',
    canAct: true,
  },
  {
    claim_id: 4,
    customer_id: 103,
    hospital_id: 504,
    doc_id: 9004,
    expected_amount: 22000,
    approved_amount: 0,
    submitted_date: '2025-06-07',
    last_updated_date: '2025-06-08',
    status: 'queried',
    canAct: true,
  },
  {
    claim_id: 5,
    customer_id: 104,
    hospital_id: 505,
    doc_id: 9005,
    expected_amount: 25000,
    approved_amount: 25000,
    submitted_date: '2025-06-09',
    last_updated_date: '2025-06-10',
    status: 'approved',
    canAct: false,
  },
  {
    claim_id: 6,
    customer_id: 105,
    hospital_id: 506,
    doc_id: 9006,
    expected_amount: 17000,
    approved_amount: 0,
    submitted_date: '2025-06-11',
    last_updated_date: '2025-06-12',
    status: 'rejected',
    canAct: false,
  },
];

const statusColors = {
  submitted: 'default',
  validated: 'info',
  queried: 'warning',
  approved: 'success',
  rejected: 'error',
};

function isPending(status) {
  return ['submitted', 'validated', 'queried'].includes(status);
}
function isCompleted(status) {
  return ['approved', 'rejected'].includes(status);
}

export default function CashlessPage() {
  const [claimId, setClaimId] = useState('');
  const [claim, setClaim] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [queryDialog, setQueryDialog] = useState({ open: false, comment: '', claimId: null });
  const [tab, setTab] = useState('recent');

  // For updating static data in this demo, keep a local copy
  const [claims, setClaims] = useState(staticClaims);

  // Show 3 most recent claims by last_updated_date (descending)
  const recentClaims = [...claims]
    .sort((a, b) => new Date(b.last_updated_date) - new Date(a.last_updated_date))
    .slice(0, 3);

  const pendingClaims = claims.filter((c) => isPending(c.status));
  const completedClaims = claims.filter((c) => isCompleted(c.status));

  const handleSearch = async () => {
    setLoading(true);
    setClaim(null);
    await new Promise((res) => setTimeout(res, 700)); // Simulate delay
    const found = claims.find((c) => String(c.claim_id) === String(claimId.trim()));
    setLoading(false);
    if (found) {
      setClaim(found);
    } else {
      setSnackbar({ open: true, message: 'Claim not found.', severity: 'error' });
    }
  };

  // Action handlers
  const handleValidate = (claim_id) => {
    setSnackbar({ open: true, message: `Sending validation...`, severity: 'info' });
    setTimeout(() => {
      setClaims((prev) =>
        prev.map((c) =>
          c.claim_id === claim_id ? { ...c, status: 'validated', canAct: true, last_updated_date: today() } : c
        )
      );
      if (claim && claim.claim_id === claim_id) {
        setClaim((prev) => prev ? { ...prev, status: 'validated', canAct: true, last_updated_date: today() } : prev);
      }
      setSnackbar({ open: true, message: `Validation response received for Claim #${claim_id}`, severity: 'success' });
    }, 1200);
  };

  const handleApprove = (claim_id) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.claim_id === claim_id
          ? { ...c, status: 'approved', approved_amount: c.expected_amount, canAct: false, last_updated_date: today() }
          : c
      )
    );
    if (claim && claim.claim_id === claim_id) {
      setClaim((prev) => prev ? { ...prev, status: 'approved', approved_amount: prev.expected_amount, canAct: false, last_updated_date: today() } : prev);
    }
    setSnackbar({ open: true, message: `Claim #${claim_id} approved`, severity: 'success' });
  };

  const handleReject = (claim_id) => {
    setClaims((prev) =>
      prev.map((c) =>
        c.claim_id === claim_id
          ? { ...c, status: 'rejected', canAct: false, last_updated_date: today() }
          : c
      )
    );
    if (claim && claim.claim_id === claim_id) {
      setClaim((prev) => prev ? { ...prev, status: 'rejected', canAct: false, last_updated_date: today() } : prev);
    }
    setSnackbar({ open: true, message: `Claim #${claim_id} rejected`, severity: 'error' });
  };

  const handleQueryOpen = (claim_id) => setQueryDialog({ open: true, comment: '', claimId: claim_id });

  const handleQuerySubmit = () => {
    setQueryDialog({ open: false, comment: '', claimId: null });
    setSnackbar({ open: true, message: `Sending query...`, severity: 'info' });
    setTimeout(() => {
      setClaims((prev) =>
        prev.map((c) =>
          c.claim_id === queryDialog.claimId ? { ...c, status: 'queried', canAct: true, last_updated_date: today() } : c
        )
      );
      if (claim && claim.claim_id === queryDialog.claimId) {
        setClaim((prev) => prev ? { ...prev, status: 'queried', canAct: true, last_updated_date: today() } : prev);
      }
      setSnackbar({ open: true, message: `Query response received for Claim #${queryDialog.claimId}`, severity: 'success' });
    }, 1200);
  };

  const isFinal = (status) => status === 'approved' || status === 'rejected';

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  // Render claim card (for both search and lists)
  const renderClaimCard = (c, showActions = false) => (
    <Card
      variant="outlined"
      sx={{
        minWidth: 270,
        maxWidth: 330,
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
      key={c.claim_id}
    >
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Claim #{c.claim_id}</Typography>
          <Chip label={c.status.toUpperCase()} color={statusColors[c.status]} />
        </Stack>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Customer ID: {c.customer_id}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Hospital ID: {c.hospital_id}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Doc ID: {c.doc_id}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Expected Amount: ₹{c.expected_amount.toLocaleString()}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Approved Amount: ₹{c.approved_amount.toLocaleString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Submitted: {c.submitted_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Last Updated: {c.last_updated_date}
        </Typography>
      </CardContent>
      {showActions && (
        <CardActions sx={{ mt: 'auto' }}>
          <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'center' }}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              onClick={() => handleValidate(c.claim_id)}
              disabled={c.status !== 'submitted'}
            >
              Validate
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={() => handleApprove(c.claim_id)}
              disabled={!c.canAct || isFinal(c.status)}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleReject(c.claim_id)}
              disabled={!c.canAct || isFinal(c.status)}
            >
              Reject
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => handleQueryOpen(c.claim_id)}
              disabled={!c.canAct || isFinal(c.status)}
            >
              Query
            </Button>
          </Stack>
        </CardActions>
      )}
    </Card>
  );

  // Tab content
  let tabContent = null;
  if (tab === 'recent') {
    tabContent = (
      <Grid container spacing={2}>
        {recentClaims.length
          ? recentClaims.map((c) => (
              <Grid item xs={12} sm={6} md={4} key={c.claim_id} sx={{ display: 'flex' }}>
                {renderClaimCard(c, false)}
              </Grid>
            ))
          : <Typography sx={{ m: 2 }}>No recent claims.</Typography>
        }
      </Grid>
    );
  } else if (tab === 'pending') {
    tabContent = (
      <Grid container spacing={2}>
        {pendingClaims.length
          ? pendingClaims.map((c) => (
              <Grid item xs={12} sm={6} md={4} key={c.claim_id} sx={{ display: 'flex' }}>
                {renderClaimCard(c, true)}
              </Grid>
            ))
          : <Typography sx={{ m: 2 }}>No pending claims.</Typography>
        }
      </Grid>
    );
  } else if (tab === 'completed') {
    tabContent = (
      <Grid container spacing={2}>
        {completedClaims.length
          ? completedClaims.map((c) => (
              <Grid item xs={12} sm={6} md={4} key={c.claim_id} sx={{ display: 'flex' }}>
                {renderClaimCard(c, false)}
              </Grid>
            ))
          : <Typography sx={{ m: 2 }}>No completed claims.</Typography>
        }
      </Grid>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: 900, mx: 'auto', pb: 8 }}>
      <Typography variant="h4" gutterBottom sx={{textAlign:"center"}}>
        Cashless Settlement
      </Typography>

      {/* Search Bar */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Enter Claim ID"
          variant="outlined"
          value={claimId}
          onChange={(e) => setClaimId(e.target.value.replace(/[^0-9]/g, ""))}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={!claimId.trim() || loading}
        >
          Search
        </Button>
      </Stack>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {/* Searched Claim */}
      {claim && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex' }}>
            {renderClaimCard(claim, true)}
          </Grid>
        </Grid>
      )}

      {/* Tab Content */}
      <Box sx={{ mt: 2 }}>
        {tabContent}
      </Box>

      {/* Bottom Navigation */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          showLabels
        >
          <BottomNavigationAction label="Recent" value="recent" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Pending" value="pending" icon={<HourglassEmptyIcon />} />
          <BottomNavigationAction label="Completed" value="completed" icon={<DoneAllIcon />} />
        </BottomNavigation>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Query Dialog */}
      <Dialog open={queryDialog.open} onClose={() => setQueryDialog({ open: false, comment: '', claimId: null })}>
        <DialogTitle>Enter Query Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            multiline
            minRows={3}
            fullWidth
            value={queryDialog.comment}
            onChange={(e) => setQueryDialog((prev) => ({ ...prev, comment: e.target.value }))}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQueryDialog({ open: false, comment: '', claimId: null })}>Cancel</Button>
          <Button
            onClick={handleQuerySubmit}
            disabled={!queryDialog.comment.trim()}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
