import React, { useState } from "react";
import { Box, Typography, Card, CardContent, CardActions, Button, Grid, Switch, FormControlLabel } from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function MedicalValidatorDashboard() {
  // Demo data: Replace with your API data if needed
  const [pendingCount, setPendingCount] = useState(7);
  const [approveCount, setApproveCount] = useState(12);
  const [available, setAvailable] = useState(true);

  const handleStatusChange = (event) => {
    setAvailable(event.target.checked);
    // Optionally, send status to backend here
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", bgcolor: "#f8fafb" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Medical Validator Dashboard
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={available}
              onChange={handleStatusChange}
              color="success"
            />
          }
          label={available ? "Available" : "Unavailable"}
        />
      </Box>
      <Grid container spacing={3}>
        {/* Pending Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" sx={{ borderLeft: "6px solid #ff9800" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <PendingActionsIcon sx={{ color: "#ff9800", fontSize: 36, mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Pending to Verify
                </Typography>
              </Box>
              <Typography variant="h3" color="text.primary" fontWeight="bold">
                {pendingCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Claims waiting for your verification
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="warning" variant="outlined">
                View Pending
              </Button>
            </CardActions>
          </Card>
        </Grid>
        {/* Approve Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card variant="outlined" sx={{ borderLeft: "6px solid #4caf50" }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CheckCircleIcon sx={{ color: "#4caf50", fontSize: 36, mr: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  Submitted for Approve
                </Typography>
              </Box>
              <Typography variant="h3" color="text.primary" fontWeight="bold">
                {approveCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Claims submitted for approval
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="success" variant="outlined">
                View Submitted
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
