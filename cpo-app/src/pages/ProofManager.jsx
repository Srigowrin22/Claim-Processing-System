import React, { useState } from 'react';
import {
  Box, Card, CardContent, CardActions, Typography, Button, Grid, TextField,
  IconButton, Dialog, DialogTitle, DialogContent, DialogActions, InputLabel,
  Snackbar, Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

// Your initial data and fields (same as before)
const initialProofs = [
  {
    proof_id: 1,
    blood_test: '',
    admission_note: '',
    prescription: '',
    xray_report: '',
    insurance_form: '',
    discharge_summary: '',
    other: '',
    last_updated: '2025-07-01',
  },
];

const proofFields = [
  { key: 'blood_test', label: 'Blood Test' },
  { key: 'admission_note', label: 'Admission Note' },
  { key: 'prescription', label: 'Prescription' },
  { key: 'xray_report', label: 'X-Ray Report' },
  { key: 'insurance_form', label: 'Insurance Form' },
  { key: 'discharge_summary', label: 'Discharge Summary' },
  { key: 'other', label: 'Other' },
];

export default function ProofManager() {
  const [proofs, setProofs] = useState(initialProofs);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [validationComment, setValidationComment] = useState('');
  const [validationStatus, setValidationStatus] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditData(prev => ({ ...prev, [field]: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (proof) => {
    setEditData(proof);
    setValidationComment('');
    setValidationStatus('');
    setEditDialogOpen(true);
  };

  const handleSave = () => {
    setProofs(prev =>
      prev.map(p =>
        p.proof_id === editData.proof_id
          ? { ...editData, last_updated: new Date().toISOString().slice(0, 10) }
          : p
      )
    );

    // TODO: Send validationComment and validationStatus to backend API here

    setEditDialogOpen(false);
    setSnackbarOpen(true); // Show confirmation snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Proof Documents
      </Typography>

      <Grid container spacing={2}>
        {proofs.map((proof) => (
          <Grid item xs={12} sm={6} md={4} key={proof.proof_id}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">
                  Proof ID: {proof.proof_id}
                </Typography>
                {proofFields.map(field => (
                  <Box key={field.key} sx={{ my: 1 }}>
                    <Typography variant="body2">{field.label}:</Typography>
                    {proof[field.key] ? (
                      <img
                        src={proof[field.key]}
                        alt={field.label}
                        style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                      />
                    ) : (
                      <Typography variant="caption" color="text.secondary">No file</Typography>
                    )}
                  </Box>
                ))}
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Last Updated: {proof.last_updated}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton onClick={() => handleEdit(proof)} color="primary" aria-label="edit proof">
                  <EditIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Proof & Validation</DialogTitle>
        <DialogContent>
          {proofFields.map(field => (
            <Box key={field.key} sx={{ my: 2 }}>
              <InputLabel>{field.label}</InputLabel>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  component="label"
                  startIcon={<AddPhotoAlternateIcon />}
                  variant="outlined"
                  size="small"
                >
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={e => handleImageChange(e, field.key)}
                  />
                </Button>
                {editData[field.key] && (
                  <img
                    src={editData[field.key]}
                    alt={field.label}
                    style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }}
                  />
                )}
              </Box>
            </Box>
          ))}

          <TextField
            label="Validation Status (e.g. Validated, Approved)"
            fullWidth
            value={validationStatus}
            onChange={e => setValidationStatus(e.target.value)}
            sx={{ mt: 2 }}
          />

          <TextField
            label="Comments to CPO"
            fullWidth
            multiline
            minRows={2}
            value={validationComment}
            onChange={e => setValidationComment(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save & Send</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Validation details sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
