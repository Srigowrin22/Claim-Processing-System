import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
import ThumbUp from '@mui/icons-material/ThumbUp';
import ThumbDown from '@mui/icons-material/ThumbDown';
import PendingActions from '@mui/icons-material/PendingActions';
import LocalHospital from '@mui/icons-material/LocalHospital';
import PeopleAlt from '@mui/icons-material/PeopleAlt';
import PolicyIcon from '@mui/icons-material/Policy';

function StatCard({ title, value, icon, color }) {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 230,
        minHeight: 160,
        borderLeft: `4px solid ${color}`,
        bgcolor: '#fafbfc',
        display: 'flex',
        alignItems: 'center',
        p: 2,
        borderRadius: 3,
        boxShadow: 3,
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', p: 0 }}>
        <Box sx={{ mr: 2 }}>
          {React.cloneElement(icon, { sx: { fontSize: 48 }, color: undefined })}
        </Box>
        <Box>
          <Typography variant="body1" fontWeight="bold" color="text.primary" sx={{ letterSpacing: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight="bold" color={color}>
            {value}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function DashboardStatsPage() {
  const [stats, setStats] = React.useState({
    totalPolicies: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    networkedHospitals: 0,
    customers: 0,
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true; // to avoid setting state if unmounted

    async function fetchAll() {
      setLoading(true);
      try {
        const [policiesRes, hospitalsRes, customersRes, claimsRes] = await Promise.all([
          fetch('http://localhost:9090/policies'),
          fetch('http://localhost:9090/hospitals'),
          fetch('http://localhost:9090/customers'),
          fetch('http://localhost:9090/claims'),
        ]);
        const [policies, hospitals, customers, claims] = await Promise.all([
          policiesRes.json(),
          hospitalsRes.json(),
          customersRes.json(),
          claimsRes.json(),
        ]);

        // Calculate claim stats
        const pending = claims.filter(
          c =>
            (c.status === "In Process" && c.feedback === "Forwarded") ||
            (c.status === "Forwarded" && c.feedback === "In Process")
        ).length;
        const approved = claims.filter(c => c.status === "Approved").length;
        const rejected = claims.filter(c => c.status.toLowerCase() === "rejected").length;

        if (isMounted) {
          setStats({
            totalPolicies: policies.length,
            pending,
            approved,
            rejected,
            networkedHospitals: hospitals.length,
            customers: customers.length,
          });
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setStats({
            totalPolicies: 0,
            pending: 0,
            approved: 0,
            rejected: 0,
            networkedHospitals: 0,
            customers: 0,
          });
          setLoading(false);
        }
      }
    }

    fetchAll();

    const interval = setInterval(fetchAll, 1000); // fetch every 1 seconds

    return () => {
      isMounted = false; // cleanup flag
      clearInterval(interval); // clear interval on unmount
    };
  }, []);

  return (
    <Box sx={{ p: { xs: 2, md: 8 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textAlign: "center" }}>
        Welcome, Regional Head!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 6, textAlign: "center" }}>
        Here you can monitor key insurance metrics and track your region's performance at a glance.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Total Policies"
            value={stats.totalPolicies}
            icon={<PolicyIcon color="primary" />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Networked Hospitals"
            value={stats.networkedHospitals}
            icon={<LocalHospital color="secondary" />}
            color="#9c27b0"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Customers"
            value={stats.customers}
            icon={<PeopleAlt />}
            color="#00bcd4"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Pending Claims"
            value={stats.pending}
            icon={<PendingActions />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Approved Claims"
            value={stats.approved}
            icon={<ThumbUp />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <StatCard
            title="Rejected Claims"
            value={stats.rejected}
            icon={<ThumbDown />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
