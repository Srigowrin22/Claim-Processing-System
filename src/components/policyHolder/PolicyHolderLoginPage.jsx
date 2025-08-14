import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";

const BG_IMAGE =
  "https://us.123rf.com/450wm/jirsak/jirsak1601/jirsak160100005/50995634-insurance-concept-insurance-agent-and-insurance-company-customers-wide-banner-composition-with.jpg";

export default function PolicyHolderLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    if (!email) return "Email is required";
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email))
      return "Enter a valid email address";
    if (!password) return "Password is required";
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("http://localhost:9090/customers");
      if (!res.ok) throw new Error("Failed to fetch customers");
      const customers = await res.json();
      const customer = customers.find(
        (c) =>
          c.customer_email.toLowerCase() === email.toLowerCase() &&
          c.customer_password === password
      );
      if (!customer) {
        setError("Invalid email or password");
        setLoading(false);
        return;
      }
      sessionStorage.setItem("policyholder", JSON.stringify(customer));
      navigate("/PolicyHolderDashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${BG_IMAGE})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "flex-start" },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Overlay for soft darkening */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.32)",
          zIndex: 1,
        }}
      />
      {/* Login card container */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: { xs: "100vw", sm: "80vw", md: "45vw", lg: "36vw" },
          minHeight: { xs: "100vh", md: "auto" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pl: { xs: 0, md: 8, lg: 12 },
          pr: { xs: 0, md: 2 },
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 420,
            py: { xs: 3, sm: 5 },
            px: { xs: 2, sm: 4 },
            boxShadow: 8,
            borderRadius: 5,
            bgcolor: "rgba(255,255,255,0.97)",
            backdropFilter: "blur(6px)",
            mx: { xs: 2, md: 0 },
          }}
        >
          <CardContent sx={{ p: 0 }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "primary.main",
                textAlign: "left",
                mb: 2,
                letterSpacing: 1.5,
              }}
            >
              Policy Holder Login
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                mb: 3,
                color: "text.secondary",
                fontWeight: 400,
                textAlign: "left",
              }}
            >
              Welcome back! Please login to continue.
            </Typography>
            <form onSubmit={handleLogin} autoComplete="off">
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                autoFocus
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type={showPwd ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPwd((show) => !show)}
                        edge="end"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 1.5 }}
              />
              {error && (
                <Alert severity="error" sx={{ mt: 2, mb: 1.5 }}>
                  {error}
                </Alert>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 2,
                  fontWeight: "bold",
                  fontSize: "1.08rem",
                  py: 1.2,
                  borderRadius: 2,
                  boxShadow: 2,
                  letterSpacing: 1,
                }}
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={20} sx={{ color: "#fff" }} />
                  ) : null
                }
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
