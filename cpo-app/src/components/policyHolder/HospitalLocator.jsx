import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Card,
  CardContent,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export default function HospitalLocator() {
  const [expanded, setExpanded] = useState(false);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loadingHospitals, setLoadingHospitals] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded);
    if (isExpanded && cities.length === 0) {
      setLoadingCities(true);
      fetch("http://localhost:9090/hospitals")
        .then((res) => res.json())
        .then((data) => {
          const uniqueCities = [...new Set(data.map((h) => h.city))].sort();
          setCities(uniqueCities);
        })
        .catch((err) => {
          console.error("Failed to fetch cities", err);
          setCities([]);
        })
        .finally(() => setLoadingCities(false));
    }
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setLoadingHospitals(true);
    fetch(`http://localhost:9090/hospitals?city=${encodeURIComponent(city)}`)
      .then((res) => res.json())
      .then((data) => {
        setHospitals(data);
        setDialogOpen(true);
      })
      .catch((err) => {
        console.error("Failed to fetch hospitals", err);
        setHospitals([]);
      })
      .finally(() => setLoadingHospitals(false));
  };

  return (
    <>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <LocalHospitalIcon color="error" sx={{ mr: 2 }} />
          <Typography fontWeight="bold">Hospital Locator</Typography>
        </AccordionSummary>
        <AccordionDetails>
          
          {loadingCities ? (
            <Typography>Loading cities...</Typography>
          ) : (
            <List>
              {cities.map((city, index) => (
                <React.Fragment key={city}>
                  <ListItemButton onClick={() => handleCityClick(city)}>
                    <ListItemText primary={city} />
                  </ListItemButton>
                  {index < cities.length - 1 && (
                    <Divider variant="middle" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Dialog to show hospitals in selected city */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Hospitals in {selectedCity}</DialogTitle>
        <DialogContent dividers>
          {loadingHospitals ? (
            <Typography>Loading hospitals...</Typography>
          ) : hospitals.length === 0 ? (
            <Typography>No hospitals found in {selectedCity}.</Typography>
          ) : (
            <Grid container spacing={2}>
              {hospitals.map(({ id, hospital_name, address, contact }) => (
                <Grid item xs={12} sm={6} md={4} key={id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {hospital_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Contact: {contact}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
