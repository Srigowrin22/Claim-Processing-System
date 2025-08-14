import React, { useState, useEffect, useRef } from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Divider,
    Box,
    TextField,
    Button,
    CircularProgress
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function MyProfile({ customer, onUpdate }) {
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState(customer || null); // local profile state
    const [form, setForm] = useState({
        id: "",
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        customer_address: "",
        customer_dob: "",
        customer_aadhaar: "",
    });
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    // For auto-refresh interval
    const intervalRef = useRef(null);

    // Initialize profile and form with customer data on mount or when customer changes
    useEffect(() => {
        if (customer) {
            setProfile(customer);
            setForm({
                id: customer.id || "",
                customer_name: customer.customer_name || "",
                customer_email: customer.customer_email || "",
                customer_phone: customer.customer_phone || "",
                customer_address: customer.customer_address || "",
                customer_dob: customer.customer_dob || "",
                customer_aadhaar: customer.customer_aadhaar || "",
            });
        }
    }, [customer]);

    // Auto-refresh profile every 2 seconds (unless in edit mode)
    useEffect(() => {
        if (!profile || editMode) return;

        let isMounted = true;

        async function fetchProfile() {
            setRefreshing(true);
            try {
                const res = await fetch(`http://localhost:9090/customers/${profile.id}`);
                if (!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                if (isMounted) {
                    setProfile(data);
                    setForm({
                        id: data.id || "",
                        customer_name: data.customer_name || "",
                        customer_email: data.customer_email || "",
                        customer_phone: data.customer_phone || "",
                        customer_address: data.customer_address || "",
                        customer_dob: data.customer_dob || "",
                        customer_aadhaar: data.customer_aadhaar || "",
                    });
                    if (onUpdate) onUpdate(data);
                }
            } catch (err) {
                // Optionally set error
            } finally {
                if (isMounted) setRefreshing(false);
            }
        }

        fetchProfile();
        intervalRef.current = setInterval(fetchProfile, 2000);

        return () => {
            isMounted = false;
            clearInterval(intervalRef.current);
        };
    }, [profile, editMode, onUpdate]);

    // Stop auto-refresh when entering edit mode
    useEffect(() => {
        if (editMode && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    }, [editMode]);

    // Handle input change
    const handleChange = (field) => (e) => {
        setForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    // Validation example: phone number 10 digits starting with 6-9
    const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);

    // Save updated profile
    const handleSave = () => {
        setError("");
        if (form.customer_phone && !validatePhone(form.customer_phone)) {
            setError("Phone must start with 6-9 and be exactly 10 digits");
            return;
        }
        setLoading(true);

        // Prepare updated customer object
        const updatedCustomer = {
            ...profile,
            customer_name: form.customer_name,
            customer_email: form.customer_email,
            customer_phone: form.customer_phone,
            customer_address: form.customer_address,
            customer_dob: form.customer_dob,
            // Aadhaar, id, is readonly, so no change here
        };

        fetch(`http://localhost:9090/customers/${profile.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCustomer),
        })
            .then((res) => {
                if (!res.ok) throw new Error(`Failed to update profile: ${res.statusText}`);
                return res.json();
            })
            .then((data) => {
                setLoading(false);
                setEditMode(false);
                setProfile(data);
                setForm({
                    id: data.id || "",
                    customer_name: data.customer_name || "",
                    customer_email: data.customer_email || "",
                    customer_phone: data.customer_phone || "",
                    customer_address: data.customer_address || "",
                    customer_dob: data.customer_dob || "",
                    customer_aadhaar: data.customer_aadhaar || "",
                });
                if (onUpdate) onUpdate(data);
            })
            .catch((err) => {
                setLoading(false);
                setError(err.message || "Error updating profile");
            });
    };

    // Cancel editing and reset form
    const handleCancel = () => {
        setEditMode(false);
        // Reset form to current profile data
        if (profile) {
            setForm({
                id: profile.id || "",
                customer_name: profile.customer_name || "",
                customer_email: profile.customer_email || "",
                customer_phone: profile.customer_phone || "",
                customer_address: profile.customer_address || "",
                customer_dob: profile.customer_dob || "",
                customer_aadhaar: profile.customer_aadhaar || "",
            });
        }
        setError("");
    };

    if (!profile) {
        return <Typography color="error">Customer details not available.</Typography>;
    }

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 2, position: "relative" }}>
            <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Customer Details
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {!editMode ? (
                    <>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                            <BadgeIcon color="info" sx={{ mr: 1 }} />
                            <Typography>Customer ID: {profile.id}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                            <AccountCircleIcon color="primary" sx={{ mr: 1 }} />
                            <Typography>{profile.customer_name}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                            <EmailIcon color="error" sx={{ mr: 1 }} />
                            <Typography>{profile.customer_email}</Typography>
                        </Box>
                        {profile.customer_phone && (
                            <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                                <PhoneIcon color="success" sx={{ mr: 1 }} />
                                <Typography>{profile.customer_phone}</Typography>
                            </Box>
                        )}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                            <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                            <Typography>{profile.customer_address}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                            <CalendarMonthIcon color="warning" sx={{ mr: 1 }} />
                            <Typography>DOB: {profile.customer_dob}</Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                            <BadgeIcon color="secondary" sx={{ mr: 1 }} />
                            <Typography>Aadhaar: {profile.customer_aadhaar}</Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <TextField
                            label="ID"
                            value={form.id}
                            fullWidth
                            margin="normal"
                            InputProps={{ readOnly: true }}
                        />
                        <TextField
                            label="Name"
                            value={form.customer_name}
                            onChange={handleChange("customer_name")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={form.customer_email}
                            onChange={handleChange("customer_email")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone"
                            value={form.customer_phone}
                            onChange={handleChange("customer_phone")}
                            fullWidth
                            margin="normal"
                            inputProps={{ maxLength: 10 }}
                            helperText="10 digits, starts with 6-9"
                        />
                        <TextField
                            label="Address"
                            value={form.customer_address}
                            onChange={handleChange("customer_address")}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Date of Birth"
                            type="date"
                            value={form.customer_dob}
                            onChange={handleChange("customer_dob")}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            label="Aadhaar"
                            value={form.customer_aadhaar}
                            fullWidth
                            margin="normal"
                            InputProps={{ readOnly: true }}
                        />
                        {error && (
                            <Typography color="error" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                    </>
                )}
            </CardContent>

            <CardActions sx={{ justifyContent: "flex-end", pb: 2, pr: 2 }}>
                {!editMode ? (
                    <>
                        <Button variant="contained" onClick={() => setEditMode(true)}>
                            Update Profile
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="contained" onClick={handleSave} disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button variant="outlined" onClick={handleCancel} disabled={loading}>
                            Cancel
                        </Button>
                    </>
                )}
            </CardActions>
        </Card>
    );
}
