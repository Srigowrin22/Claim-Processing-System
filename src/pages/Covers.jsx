import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialCovers = [
  { cover_id: 1, cover_name: 'Health Basic', cover_amount: 100000 },
  { cover_id: 2, cover_name: 'Premium Plus', cover_amount: 250000 },
  { cover_id: 3, cover_name: 'Family Pack', cover_amount: 500000 },
];

export default function Covers() {
  const [covers, setCovers] = useState(initialCovers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentCover, setCurrentCover] = useState({ cover_id: '', cover_name: '', cover_amount: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Open dialog for add or edit
  const handleOpenDialog = (cover = null) => {
    setEditMode(!!cover);
    setCurrentCover(
      cover
        ? { ...cover }
        : { cover_id: '', cover_name: '', cover_amount: '' }
    );
    setDialogOpen(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setCurrentCover({ cover_id: '', cover_name: '', cover_amount: '' });
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCover((prev) => ({
      ...prev,
      [name]: name === 'cover_amount' || name === 'cover_id' ? value.replace(/[^0-9.]/g, '') : value,
    }));
  };

  // Add or update cover
  const handleSave = () => {
    if (!currentCover.cover_name || !currentCover.cover_amount) {
      setSnackbar({ open: true, message: 'Please provide all details.', severity: 'error' });
      return;
    }
    if (editMode) {
      setCovers((prev) =>
        prev.map((c) =>
          c.cover_id === currentCover.cover_id
            ? { ...currentCover, cover_amount: parseFloat(currentCover.cover_amount) }
            : c
        )
      );
      setSnackbar({ open: true, message: 'Cover updated!', severity: 'success' });
    } else {
      // Generate next cover_id
      const nextId = covers.length ? Math.max(...covers.map((c) => c.cover_id)) + 1 : 1;
      setCovers((prev) => [
        ...prev,
        {
          cover_id: nextId,
          cover_name: currentCover.cover_name,
          cover_amount: parseFloat(currentCover.cover_amount),
        },
      ]);
      setSnackbar({ open: true, message: 'Cover added!', severity: 'success' });
    }
    handleCloseDialog();
  };

  // Delete cover
  const handleDelete = (cover_id) => {
    setCovers((prev) => prev.filter((c) => c.cover_id !== cover_id));
    setSnackbar({ open: true, message: 'Cover deleted!', severity: 'info' });
  };

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4">Covers</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Cover
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>cover_id</TableCell>
              <TableCell>cover_name</TableCell>
              <TableCell>cover_amount</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {covers.map((cover) => (
              <TableRow key={cover.cover_id}>
                <TableCell>{cover.cover_id}</TableCell>
                <TableCell>{cover.cover_name}</TableCell>
                <TableCell>₹{Number(cover.cover_amount).toLocaleString()}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleOpenDialog(cover)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(cover.cover_id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {covers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No covers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editMode ? 'Edit Cover' : 'Add Cover'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Cover Name"
            name="cover_name"
            value={currentCover.cover_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Cover Amount"
            name="cover_amount"
            value={currentCover.cover_amount}
            onChange={handleChange}
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
