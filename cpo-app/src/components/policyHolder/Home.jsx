import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InfoIcon from '@mui/icons-material/Info';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CopyrightIcon from '@mui/icons-material/Copyright';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home({ customer }) {
  const [profile, setProfile] = React.useState(customer);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setProfile(customer);
  }, [customer]);

  React.useEffect(() => {
    if (!customer) return;
    let isMounted = true;

    const fetchProfile = async () => {
      setRefreshing(true);
      try {
        const res = await fetch(`http://localhost:9090/customers/${customer.id}`);
        if (!res.ok) throw new Error("Failed to fetch customer");
        const data = await res.json();
        if (isMounted) setProfile(data);
      } catch (e) {
        // Optionally handle error
      } finally {
        if (isMounted) setRefreshing(false);
      }
    };

    fetchProfile();
    const interval = setInterval(fetchProfile, 2000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [customer]);

  if (!profile) {
    return <Typography color="error">Customer details not available.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Customer & Nominee Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardHeader
              avatar={<FamilyRestroomIcon color="primary" fontSize="large" />}
              title={
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  Welcome, {profile.customer_name}!
                </Typography>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                <FavoriteIcon color="error" sx={{ verticalAlign: 'middle', mr: 1 }} />
                <strong>Nominee:</strong> {profile.nominee_name} ({profile.nominee_relation}), born on {profile.nominee_dob}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body1">
                Your health and peace of mind are our top priorities. Explore your policies and claims using the menu.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Health Insurance Info Card */}
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 3, borderRadius: 3 }}>
            <CardHeader
              avatar={<HealthAndSafetyIcon color="success" fontSize="large" />}
              title={
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Why Take Health Insurance?
                </Typography>
              }
              sx={{ pb: 0 }}
            />
            <CardContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Health insurance protects you and your family from unexpected medical expenses, ensuring access to quality healthcare without financial stress. It covers hospitalization, surgeries, critical illnesses, and more.
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Key Benefits:
              </Typography>
              <ul style={{ marginTop: 0, marginBottom: 16, paddingLeft: 24 }}>
                <li>Cashless treatment at network hospitals</li>
                <li>Covers pre and post-hospitalization expenses</li>
                <li>Tax benefits under Section 80D</li>
                <li>Peace of mind for you and your loved ones</li>
                <li>Access to preventive health checkups</li>
              </ul>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                Who Needs Health Insurance?
              </Typography>
              <ul style={{ marginTop: 0, marginBottom: 0, paddingLeft: 24 }}>
                <li>Individuals and families</li>
                <li>Senior citizens</li>
                <li>People with pre-existing conditions</li>
                <li>Young professionals and students</li>
                <li>Anyone seeking financial security against health emergencies</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Disclaimer and Copyright */}
        <Grid item xs={12}>
          <Card sx={{ mt: 4, borderRadius: 3, backgroundColor: '#fffde7', boxShadow: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <WarningAmberIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Disclaimer
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ mb: 1 }}>
                The information provided on this page is for general guidance only. Please refer to your policy documents for exact terms, conditions, and coverage. For any clarification, contact our support team.
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <CopyrightIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="caption" color="text.secondary">
                  {new Date().getFullYear()} Sun Health and Allied Insurance. All rights reserved.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
