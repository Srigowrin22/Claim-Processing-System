import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Link } from '@mui/material';

const integrations = [
  { name: 'Google Analytics', url: 'https://analytics.google.com' },
  { name: 'Stripe Payments', url: 'https://stripe.com' },
  { name: 'Salesforce CRM', url: 'https://salesforce.com' },
];

export default function IntegrationsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Integrations</Typography>
      <Typography gutterBottom>
        List of third-party integrations connected to your dashboard:
      </Typography>
      <List>
        {integrations.map((integration) => (
          <ListItem key={integration.name}>
            <Link href={integration.url} target="_blank" rel="noopener">
              <ListItemText primary={integration.name} />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
