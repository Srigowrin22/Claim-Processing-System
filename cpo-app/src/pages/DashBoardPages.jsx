// import React from 'react';
// import { Box, Typography } from '@mui/material';

// export default function DashboardPage() {
//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>Dashboard</Typography>
//       <Typography>Welcome to the Dashboard page!</Typography>
//     </Box>
//   );
// }


import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Divider,
} from '@mui/material';
import {
  CheckCircleOutline,
  PendingActions,
  ThumbUp,
  ThumbDown,
  LocalHospital,
  People,
} from '@mui/icons-material';

// --- Static claims data (replace with API/database for production) ---
const staticClaims = [
  { claim_id: 1, customer_id: 100, hospital_id: 501, status: 'approved' },
  { claim_id: 2, customer_id: 101, hospital_id: 502, status: 'rejected' },
  { claim_id: 3, customer_id: 102, hospital_id: 503, status: 'pending' },
  { claim_id: 4, customer_id: 103, hospital_id: 504, status: 'approved' },
  { claim_id: 5, customer_id: 104, hospital_id: 505, status: 'pending' },
  { claim_id: 6, customer_id: 105, hospital_id: 506, status: 'approved' },
  { claim_id: 7, customer_id: 106, hospital_id: 507, status: 'pending' },
  { claim_id: 8, customer_id: 107, hospital_id: 501, status: 'approved' },
  { claim_id: 9, customer_id: 108, hospital_id: 502, status: 'rejected' },
];

// --- Static user data (replace with API/database for production) ---
const users = [
  {
    user_id: 'MV-001',
    name: 'Dr. Priya Sharma',
    address: '123, Green Avenue, Delhi',
    status: 'Available',
    email: 'priya.sharma@hospital.com',
    password: '***',
    role: 'medical_validator',
  },
  {
    user_id: 'MV-002',
    name: 'Dr. Amit Verma',
    address: '456, Blue Street, Mumbai',
    status: 'Unavailable',
    email: 'amit.verma@hospital.com',
    password: '***',
    role: 'medical_validator',
  },
  {
    user_id: 'MV-003',
    name: 'Dr. Kavita Rao',
    address: '789, Lake View, Bangalore',
    status: 'Available',
    email: 'kavita.rao@hospital.com',
    password: '***',
    role: 'medical_validator',
  },
];

export default function DashboardPage() {
  // Stats calculation
  const stats = {
    totalPolicies: staticClaims.length,
    pending: staticClaims.filter(c => c.status === 'pending').length,
    approved: staticClaims.filter(c => c.status === 'approved').length,
    rejected: staticClaims.filter(c => c.status === 'rejected').length,
    networkedHospitals: new Set(staticClaims.map(c => c.hospital_id)).size,
    totalCustomers: new Set(staticClaims.map(c => c.customer_id)).size,
  };

  const percent = (count) =>
    stats.totalPolicies ? ((count / stats.totalPolicies) * 100).toFixed(1) : 0;

  // Stat card reusable component
  const StatCard = ({ title, value, icon, color }) => (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        minWidth: 210,
        borderLeft: `4px solid ${color}`,
        bgcolor: '#fafbfc',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box sx={{ color, fontSize: 36 }}>{icon}</Box>
          <Box>
            <Typography variant="body2" color="text.secondary">{title}</Typography>
            <Typography variant="h5" fontWeight="bold">{value}</Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );

  // Approved/Rejected % card (same width/height as StatCard)
  const PercentCard = ({ approved, rejected }) => (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        minWidth: 210,
        borderLeft: `4px solid #2e7d32`,
        bgcolor: '#fafbfc',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ThumbUp sx={{ color: '#2e7d32' }} />
            <Typography variant="body2" color="text.secondary">Approved %</Typography>
            <Typography variant="h6" fontWeight="bold" color="success.main">{approved}%</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" alignItems="center" spacing={1}>
            <ThumbDown sx={{ color: '#d32f2f' }} />
            <Typography variant="body2" color="text.secondary">Rejected %</Typography>
            <Typography variant="h6" fontWeight="bold" color="error.main">{rejected}%</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  // Only medical validators
  const validators = users.filter(u => u.role === 'medical_validator');

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="cali" gutterBottom  sx={{textAlign:"center"}} >
        Welcome !
      </Typography>

      {/* Horizontal Stat Cards Row */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <StatCard
            title="Total Policies"
            value={stats.totalPolicies}
            icon={<CheckCircleOutline fontSize="inherit" />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <StatCard
            title="Pending Claims"
            value={stats.pending}
            icon={<PendingActions fontSize="inherit" />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <StatCard
            title="Approved Claims"
            value={stats.approved}
            icon={<ThumbUp fontSize="inherit" />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <StatCard
            title="Rejected Claims"
            value={stats.rejected}
            icon={<ThumbDown fontSize="inherit" />}
            color="#d32f2f"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <StatCard
            title="Networked Hospitals"
            value={stats.networkedHospitals}
            icon={<LocalHospital fontSize="inherit" />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={<People fontSize="inherit" />}
            color="#0288d1"
          />
        </Grid>
        {/* Approved/Rejected % Card */}
        <Grid item xs={12} sm={6} md={3} lg={2}>
          <PercentCard
            approved={percent(stats.approved)}
            rejected={percent(stats.rejected)}
          />
        </Grid>
      </Grid>

      {/* Medical Validators Table */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{textAlign:"center"}}>
          Medical Validators
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Address</b></TableCell>
                <TableCell><b>Status</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {validators.map((validator) => (
                <TableRow key={validator.user_id}>
                  <TableCell>{validator.user_id}</TableCell>
                  <TableCell>{validator.name}</TableCell>
                  <TableCell>{validator.address}</TableCell>
                  <TableCell>
                    <Chip
                      label={validator.status}
                      color={validator.status === 'Available' ? 'success' : 'error'}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {validators.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No medical validators found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
