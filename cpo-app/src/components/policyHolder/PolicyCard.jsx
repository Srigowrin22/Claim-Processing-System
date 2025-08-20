import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

// Map policy names to image URLs
const policyImageMap = {
  "Sun Unique Health": "https://i.pinimg.com/736x/93/a8/72/93a872f9ee1ac0d97d40660db0ee70a5.jpg",
  "Sun Wedding Gift": "https://i.pinimg.com/736x/b8/9f/93/b89f93a82191f1f67e87d0916ac05e59.jpg",
  "Medi Classic": "https://i.pinimg.com/736x/26/9d/71/269d71bea4630f15909be8fe5e5e1eb8.jpg",
  "Diabetes Safe": "https://i.pinimg.com/736x/9f/56/14/9f5614bf7ebb09d88224b22fd0dfe3ce.jpg",
  "Family Health Optima": "https://i.pinimg.com/736x/64/f2/75/64f275448931b9bbf46e9fb2c881e3ff.jpg",
  "Senior Citizen Red Carpet": "https://i.pinimg.com/736x/2b/19/5b/2b195b45e834d70e6b4a285180a04a01.jpg",
  "Super Surplus": "https://i.pinimg.com/736x/84/4f/01/844f0117776d116fae37ccb8d7a6f1d1.jpg",
  "Sun Netplus": "https://i.pinimg.com/736x/72/a6/cc/72a6cc9084023a90e3f77c25fb8bcd49.jpg",
  "Sun Health Gain": "https://i.pinimg.com/736x/9e/a4/cf/9ea4cf96a1e89511df2b877244065862.jpg",
  "Sun Criticare Plus": "https://i.pinimg.com/736x/72/af/e5/72afe5d86e9ecb134729c985473e01de.jpg",
  "Maternity and Newborn Health Policy": "https://i.pinimg.com/736x/4e/77/71/4e777150bc7a6d7c261046e7d22edf50.jpg"
};

const defaultPolicyImage = '/static/images/cards/contemplative-reptile.jpg';

export default function PolicyCard({ policy, cover = {}, customerId, onDetails, onMore }) {
  const [expanded, setExpanded] = React.useState(false);
  const [detailsOpen, setDetailsOpen] = React.useState(false);

  // Dynamically select image URL based on policy name
  const imageUrl = policyImageMap[policy.policy_name] || defaultPolicyImage;

  const handleToggle = () => {
    setExpanded((prev) => !prev);
    if (onMore) onMore(!expanded);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, height: 450, display: 'flex', flexDirection: 'column' }}>
        <CardActionArea sx={{ flexGrow: 1 }}>
          <CardMedia
            component="img"
            height="140"
            image={imageUrl}
            alt={policy.policy_name}
          />
          <CardContent sx={{ overflow: 'hidden' }}>
            <Typography gutterBottom variant="h5" component="div" noWrap={!expanded}>
              {policy.policy_name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Customer ID: {customerId}
            </Typography>
            <Box sx={{ maxHeight: expanded ? 'none' : 100, overflow: 'hidden' }}>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Sum Assured:</strong> ₹{policy.sumAssured?.toLocaleString?.() ?? 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Premium:</strong> ₹{policy.premium?.toLocaleString?.() ?? 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }}>
                <strong>Validity:</strong> {policy.validity || 'N/A'}
              </Typography>
              {expanded && (
                <>
                  <Typography variant="body2" sx={{ mb: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                    <strong>Exclusions:</strong> {policy.exclusion || 'N/A'}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Cover Details
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cover Name:</strong> {cover.cover_name || 'N/A'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Cover Amount:</strong> {cover.cover_amount ? `₹${cover.cover_amount.toLocaleString()}` : 'N/A'}
                  </Typography>
                  {Array.isArray(cover.addon) && cover.addon.length > 0 && (
                    <>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                        Add-ons:
                      </Typography>
                      <List dense sx={{ pl: 2, mb: 0 }}>
                        {cover.addon.map((item, idx) => (
                          <ListItem key={idx} disablePadding>
                            <ListItemText primary={item} />
                          </ListItem>
                        ))}
                      </List>
                    </>
                  )}
                </>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions sx={{ justifyContent: 'space-between' }}>
          <Button size="small" color="primary" onClick={() => setDetailsOpen(true)}>
            Details
          </Button>
          <Button size="small" color="secondary" onClick={handleToggle}>
            {expanded ? 'Less' : 'More'}
          </Button>
        </CardActions>
      </Card>

      {/* Details Dialog for Cover */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Cover Details (ID: {cover.cover_id ?? 'N/A'})
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Card sx={{ boxShadow: 3, backgroundColor: 'background.paper' }}>
            <CardContent>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1 }}>
                {cover.cover_name || 'N/A'}
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <strong>Cover Amount:</strong> {cover.cover_amount ? `₹${cover.cover_amount.toLocaleString()}` : 'N/A'}
              </Typography>
              {Array.isArray(cover.addon) && cover.addon.length > 0 && (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Add-ons:
                  </Typography>
                  <List dense sx={{ pl: 2, mb: 0 }}>
                    {cover.addon.map((item, idx) => (
                      <ListItem key={idx} disablePadding>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
