import * as React from 'react';
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ShieldIcon from '@mui/icons-material/Shield';

// Images for policies (cycled)
const policyImages = [
  'https://i.pinimg.com/736x/93/a8/72/93a872f9ee1ac0d97d40660db0ee70a5.jpg',
  'https://i.pinimg.com/736x/b8/9f/93/b89f93a82191f1f67e87d0916ac05e59.jpg',
  'https://i.pinimg.com/736x/26/9d/71/269d71bea4630f15909be8fe5e5e1eb8.jpg',
  'https://i.pinimg.com/736x/9f/56/14/9f5614bf7ebb09d88224b22fd0dfe3ce.jpg',
  'https://i.pinimg.com/736x/64/f2/75/64f275448931b9bbf46e9fb2c881e3ff.jpg',
  'https://i.pinimg.com/736x/2b/19/5b/2b195b45e834d70e6b4a285180a04a01.jpg',
  'https://i.pinimg.com/736x/84/4f/01/844f0117776d116fae37ccb8d7a6f1d1.jpg',
  'https://i.pinimg.com/736x/72/a6/cc/72a6cc9084023a90e3f77c25fb8bcd49.jpg',
  'https://i.pinimg.com/736x/9e/a4/cf/9ea4cf96a1e89511df2b877244065862.jpg',
  'https://i.pinimg.com/736x/72/af/e5/72afe5d86e9ecb134729c985473e01de.jpg',
  'https://i.pinimg.com/736x/4e/77/71/4e777150bc7a6d7c261046e7d22edf50.jpg',
];

// Different images for covers (cycled)
const coverImages = [
  'https://i.pinimg.com/736x/66/a6/35/66a6351f918236e0cef05b29206f147e.jpg',
  'https://i.pinimg.com/736x/d1/d5/ae/d1d5ae7743200e46fd685af7bf3da12a.jpg',
  'https://i.pinimg.com/736x/bc/27/f4/bc27f4e28f5dd6efba4b804831a292db.jpg',
  'https://i.pinimg.com/736x/68/05/dc/6805dc92877497aa5407a22c3092af68.jpg',
  'https://i.pinimg.com/736x/17/95/89/179589d7e7694eb88ec3544f9c571ec9.jpg',
];

export default function WelcomePolicyPage() {
  const [policies, setPolicies] = React.useState([]);
  const [covers, setCovers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedPolicy, setSelectedPolicy] = React.useState(null);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [policiesRes, coversRes] = await Promise.all([
          fetch('http://localhost:9090/policies'),
          fetch('http://localhost:9090/covers'),
        ]);
        const policiesData = await policiesRes.json();
        const coversData = await coversRes.json();
        setPolicies(policiesData);
        setCovers(coversData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleOpenDetails = (policy) => {
    setSelectedPolicy(policy);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedPolicy(null);
  };

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Loading policies and covers...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Welcome Message */}
       <Box
    sx={{
      mb: 5,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      px: { xs: 2, sm: 4 },  // Responsive horizontal padding inside welcome box
    }}
  >
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        mb: 1,
      }}
    >
      <HealthAndSafetyIcon color="primary" sx={{ fontSize: 48 }} />
      <Typography
        variant="h3"
        fontWeight="bold"
        sx={{ letterSpacing: 2 }}
      >
        Sun Health & Allied Insurance
      </Typography>
      <ShieldIcon color="success" sx={{ fontSize: 44 }} />
    </Box>

    <Typography
      variant="h5"
      fontWeight={600}
      sx={{ mb: 1, letterSpacing: 1 }}
    >
      Welcome to Your Trusted Insurance Partner
    </Typography>

    <Typography
      variant="h6"
      fontStyle="italic"
      sx={{ maxWidth: 600, mx: 'auto', mb: 2 }}
    >
      Protect your health, secure your future — because every moment matters.
    </Typography>
  </Box>

      {/* 2. Company Content */}
      <Box sx={{ my: 4, p: 3, backgroundColor: 'background.paper', borderRadius: 2, boxShadow: 2 }}>
        <Typography
          variant="h5"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            pb: 1.5,
            mb: 2,
            borderBottom: '2px solid',
            borderColor: 'primary.light',
            letterSpacing: 0.5,
          }}
        >
          About Sun Health and Allied Insurance
        </Typography>
        <Typography paragraph>
          <strong>Sun Health and Allied Insurance</strong>, founded in 2006 and headquartered in Chennai, is proud to be India’s first standalone health insurance company. Established as a joint venture between Sun Health Investments, ICICI Venture, Sequoia Capital, Oman Insurance Company, and ETA Ascon Group, we have grown into a trusted name in the health insurance sector with a robust pan-India presence and over 160 branches.
        </Typography>
        <Typography paragraph>
          We are committed to your well-being, offering a wide range of innovative health insurance products designed to protect you and your loved ones. Our customers enjoy the convenience of cashless hospitalization and reimbursement facilities at more than 6,000 network hospitals across the country.
        </Typography>
        <Typography paragraph>
          Our dedication to service excellence was recognized when we were awarded the <strong>“Claims Service Company of the Year 2014”</strong>. We continue to set benchmarks in the industry with our prompt and hassle-free claims process.
        </Typography>
        <Typography paragraph>
          At Sun Health, we believe that prevention is better than cure. That’s why we offer 24x7 free medical advice and organize preventive health check-ups for our customers, helping you stay proactive about your health.
        </Typography>
        <Typography paragraph>
          <strong>Your health, our priority. Experience peace of mind and comprehensive care with Sun Health and Allied Insurance.</strong>
        </Typography>
      </Box>


      {/* Policies Section */}
      <Box
        sx={{
          mb: 6,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ borderBottom: '2px solid', borderColor: 'primary.main', pb: 1 }}
        >
          Policies Available
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Explore your current insurance policies and their key benefits.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {policies.map((policy, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={policy.policy_id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  height: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': { boxShadow: 10, transform: 'scale(1.03)' },
                }}
                elevation={4}
              >
                <CardActionArea
                  sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={policyImages[index % policyImages.length]}
                    alt={policy.policy_name}
                    sx={{ width: '100%', objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" noWrap>
                      {policy.policy_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sum Assured: ₹{policy.sumAssured.toLocaleString()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" onClick={() => handleOpenDetails(policy)}>
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Covers Section */}
      <Box
        sx={{
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ borderBottom: '2px solid', borderColor: 'primary.main', pb: 1 }}
        >
          Covers Available
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={3}>
          Discover all available covers and their add-ons.
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {covers.map((cover, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={cover.cover_id}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Card
                sx={{
                  maxWidth: 400,
                  height: 350,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': { boxShadow: 10, transform: 'scale(1.03)' },
                }}
                elevation={4}
              >
                <CardActionArea sx={{ flexGrow: 1 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={coverImages[index % coverImages.length]}
                    alt={cover.cover_name}
                    sx={{ width: '100%', objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" noWrap>
                      {cover.cover_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Cover Amount: ₹{cover.cover_amount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold" mt={1}>
                      Add-ons:
                    </Typography>
                    <ul style={{ marginTop: 0, paddingLeft: 20 }}>
                      {cover.addon.map((item, idx) => (
                        <li key={idx} style={{ fontSize: '0.875rem' }}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Policy Details Dialog */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedPolicy?.policy_name}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            <strong>Sum Assured:</strong> ₹{selectedPolicy?.sum_assured.toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Premium:</strong> ₹{selectedPolicy?.premium.toLocaleString()}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Validity:</strong> {selectedPolicy?.validity}
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ fontStyle: 'italic' }}>
            <strong>Exclusions:</strong> {selectedPolicy?.exclusion}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
