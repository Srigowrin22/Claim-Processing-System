import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PolicyIcon from '@mui/icons-material/Policy';
import InfoIcon from '@mui/icons-material/Info';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GavelIcon from '@mui/icons-material/Gavel';
import CopyrightIcon from '@mui/icons-material/Copyright';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress';

export default function WelcomeRegionalHead({ user: initialUser, onUserUpdate }) {
  const [user, setUser] = React.useState(initialUser);
  const [updating, setUpdating] = React.useState(false);
  const [fetchingUser, setFetchingUser] = React.useState(false);

  // Sync local user state with prop changes
  React.useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  // Function to fetch user data (for auto-refresh and after update)
  const fetchUserData = React.useCallback(async () => {
    if (!initialUser || !initialUser.id) return;
    setFetchingUser(true);
    try {
      const res = await fetch(`http://localhost:9090/users/${initialUser.id}`);
      if (!res.ok) throw new Error('Failed to fetch user data');
      const fetchedUser = await res.json();
      setUser(fetchedUser);
      if (onUserUpdate) {
        onUserUpdate(fetchedUser);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setFetchingUser(false);
    }
  }, [initialUser, onUserUpdate]);

  // Auto-refresh user data every 5 seconds
  React.useEffect(() => {
    if (initialUser && initialUser.id) {
      fetchUserData(); // initial fetch
      const intervalId = setInterval(fetchUserData, 5000);
      return () => clearInterval(intervalId);
    }
  }, [initialUser, fetchUserData]);

  if (!user) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography color="text.secondary" variant="h6">
          Loading user data...
        </Typography>
      </Box>
    );
  }

  // Handler for status switch
  const handleStatusChange = async (event) => {
    const newStatus = event.target.checked;
    setUpdating(true);
    try {
      const res = await fetch(`http://localhost:9090/users/${user.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newStatus }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to update status: ${res.status} ${res.statusText} - ${errorText}`);
      }

      try {
        const updatedUser = await res.json();
        setUser(updatedUser);
        if (onUserUpdate) {
          onUserUpdate(updatedUser);
        }
      } catch {
        // If no JSON response, refetch user data
        fetchUserData();
      }
    } catch (error) {
      alert(`Failed to update status: ${error.message || error}`);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Wishes & Welcome Card */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Good Day!
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            Welcome, {user.user_name}!
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            We are delighted to have you onboard. Our mission is to empower you with transparent, efficient, and secure insurance solutions.
          </Typography>
        </CardContent>
      </Card>

      {/* Details Card */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Your Details
          </Typography>
          <Typography variant="body1"><strong>User ID:</strong> {user.id}</Typography>
          <Typography variant="body1"><strong>Email:</strong> {user.user_email}</Typography>
          <Typography variant="body1"><strong>Address:</strong> {user.user_address}</Typography>
          <Typography variant="body1"><strong>Hire Date:</strong> {user.hire_date}</Typography>
          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!!user.is_active}
                  onChange={handleStatusChange}
                  color="primary"
                  disabled={updating || fetchingUser}
                />
              }
              label={user.is_active ? "Available" : "Unavailable"}
            />
            {(updating || fetchingUser) && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Box>
        </CardContent>
      </Card>

      {/* About Insurance */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <InfoIcon color="info" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="medium">About Insurance</Typography>
          </Box>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Insurance is more than a product—it's a promise of support when you need it most. At our company, we focus on:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemIcon><VerifiedUserIcon color="success" /></ListItemIcon>
              <ListItemText primary="Trustworthy claims and timely settlements" />
            </ListItem>
            <ListItem>
              <ListItemIcon><PolicyIcon color="primary" /></ListItemIcon>
              <ListItemText primary="A wide range of policies tailored to your needs" />
            </ListItem>
            <ListItem>
              <ListItemIcon><GavelIcon color="warning" /></ListItemIcon>
              <ListItemText primary="Strict adherence to regulatory compliance and fraud prevention" />
            </ListItem>
          </List>
          <Typography variant="body2" sx={{ mt: 1 }}>
            We are committed to guiding you through every step, ensuring clarity and peace of mind.
          </Typography>
        </CardContent>
      </Card>

      {/* Policies Section */}
      <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PolicyIcon color="secondary" sx={{ mr: 1 }} />
            <Typography variant="h6" fontWeight="medium">Our Policies</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <List dense sx={{ flex: 1 }}>
              <ListItem><ListItemText primary="Sun Unique Health" /></ListItem>
              <ListItem><ListItemText primary="Medi Classic" /></ListItem>
              <ListItem><ListItemText primary="Family Health Optima" /></ListItem>
              <ListItem><ListItemText primary="Super Surplus, Sun Netplus" /></ListItem>
            </List>
            <List dense sx={{ flex: 1 }}>
              <ListItem><ListItemText primary="Sun Wedding Gift" /></ListItem>
              <ListItem><ListItemText primary="Diabetes Safe" /></ListItem>
              <ListItem><ListItemText primary="Senior Citizen Red Carpet" /></ListItem>
              <ListItem><ListItemText primary="Sun Health Gain and Sun Criticare Plus" /></ListItem>
            </List>
          </Box>
        </CardContent>
      </Card>

      {/* Disclaimer & Copyright */}
      <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
        <CardContent>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            <GavelIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
            <strong>Disclaimer:</strong> The information provided on this portal is for general reference only. Please consult policy documents and contact our support team for specific queries.
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <CopyrightIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="caption" color="text.secondary">
              © {new Date().getFullYear()} Insurance Company. All rights reserved.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

WelcomeRegionalHead.propTypes = {
  user: PropTypes.object,
  onUserUpdate: PropTypes.func.isRequired,
};
