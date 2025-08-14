import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Rating,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SettingsIcon from "@mui/icons-material/Settings";
import LockIcon from "@mui/icons-material/Lock";
import GavelIcon from "@mui/icons-material/Gavel";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import StarRateIcon from "@mui/icons-material/StarRate";
import InfoIcon from "@mui/icons-material/Info";
import PasswordIcon from "@mui/icons-material/Password";

export default function SettingsPage({ customerId }) {
  // PIN state
  const [pinAccordionExpanded, setPinAccordionExpanded] = useState(false);
  const [showPinCard, setShowPinCard] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [pinLoading, setPinLoading] = useState(false);

  // Password state
  const [passwordAccordionExpanded, setPasswordAccordionExpanded] = useState(false);
  const [showPasswordCard, setShowPasswordCard] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Rating state
  const [ratingValue, setRatingValue] = useState(0);

  // --- Change PIN logic ---
  const handleUpdatePin = async () => {
    setPinError("");
    if (newPin.length < 4) {
      setPinError("PIN must be at least 4 digits");
      return;
    }
    if (newPin !== confirmPin) {
      setPinError("PIN and Confirm PIN must match");
      return;
    }
    setPinLoading(true);
    try {
      const res = await fetch(`http://localhost:9090/customers/${customerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_pin: newPin }),
      });
      if (!res.ok) throw new Error("Failed to update PIN");
      alert("PIN updated successfully!");
      setShowPinCard(false);
      setNewPin("");
      setConfirmPin("");
    } catch (err) {
      setPinError(err.message);
    } finally {
      setPinLoading(false);
    }
  };

  const handleCancelPin = () => {
    setShowPinCard(false);
    setNewPin("");
    setConfirmPin("");
    setPinError("");
  };

  // --- Change Password logic ---
  const handleUpdatePassword = async () => {
    setPasswordError("");
    if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Password and Confirm Password must match");
      return;
    }
    setPasswordLoading(true);
    try {
      const res = await fetch(`http://localhost:9090/customers/${customerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_password: newPassword }),
      });
      if (!res.ok) throw new Error("Failed to update password");
      alert("Password updated successfully!");
      setShowPasswordCard(false);
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordError(err.message);
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancelPassword = () => {
    setShowPasswordCard(false);
    setNewPassword("");
    setConfirmPassword("");
    setPasswordError("");
  };

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <SettingsIcon color="secondary" sx={{ mr: 2 }} />
        <Typography fontWeight="bold">Settings</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/* 2) Change Password */}
        <Accordion
          expanded={passwordAccordionExpanded}
          onChange={() => {
            setPasswordAccordionExpanded(!passwordAccordionExpanded);
            setShowPasswordCard(false);
            setPasswordError("");
          }}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <PasswordIcon color="primary" sx={{ mr: 1 }} />
            <Typography fontWeight="medium">Change Password</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {!showPasswordCard ? (
              <Button
                variant="outlined"
                onClick={() => setShowPasswordCard(true)}
                sx={{ mt: 1 }}
              >
                Change Password
              </Button>
            ) : (
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <TextField
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 32 }}
                    autoFocus
                  />
                  <TextField
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    inputProps={{ maxLength: 32 }}
                  />
                  {passwordError && (
                    <Typography color="error" sx={{ mt: 1 }}>
                      {passwordError}
                    </Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end", px: 2, pb: 2 }}>
                  <Button onClick={handleCancelPassword} disabled={passwordLoading}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleUpdatePassword}
                    disabled={passwordLoading}
                  >
                    {passwordLoading ? "Updating..." : "Update"}
                  </Button>
                </CardActions>
              </Card>
            )}
          </AccordionDetails>
        </Accordion>

        {/* 3) Terms and Conditions */}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <GavelIcon color="action" sx={{ mr: 1 }} />
            <Typography fontWeight="medium">Terms and Conditions</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {/* Replace with your real terms */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* 4) Privacy Policy */}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <PrivacyTipIcon color="action" sx={{ mr: 1 }} />
            <Typography fontWeight="medium">Privacy Policy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {/* Replace with your real privacy policy */}
              Your privacy is important to us. We do not share your data with third parties.
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* 5) Rate Our App */}
        <Accordion sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <StarRateIcon color="warning" sx={{ mr: 1 }} />
            <Typography fontWeight="medium">Rate Our App</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Rating
                name="app-rating"
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
                precision={1}
                icon={<StarRateIcon fontSize="inherit" />}
                emptyIcon={<StarRateIcon fontSize="inherit" color="disabled" />}
              />
              <Typography>{ratingValue ? `${ratingValue} Stars` : "No rating yet"}</Typography>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* 6) About */}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <InfoIcon color="info" sx={{ mr: 1 }} />
            <Typography fontWeight="medium">About</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
              {/* Replace with your company info */}
              Our company is dedicated to providing the best insurance services with 24/7 customer support.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </AccordionDetails>
    </Accordion>
  );
}
