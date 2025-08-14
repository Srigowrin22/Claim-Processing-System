import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PeopleIcon from '@mui/icons-material/People';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SettingsIcon from '@mui/icons-material/Settings';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import HospitalLocator from './HospitalLocator';
import MyProfile from './MyProfile';
import SettingsPage from './SettingsPage';

// --- Status Tracker Helper ---
const STATUS_STEPS = [
    'Raised',
    'Validating',
    'Medical Validator Visiting Hospital',
    'Approval Pending',
    'Paid',
];
const STATUS_MAP = {
    Raised: 0,
    Validating: 1,
    'Approved by Medical validator': 2,
    'Medical Validator Visiting Hospital': 2,
    'Approved by CPO': 3,
    Forwarded: 3,
    'Approval Pending': 3,
    Approved: 4,
    Paid: 4,
    Rejected: -1,
};

function getStepForStatus(status) {
    // Map the claim status to the tracker step
    switch (status) {
        case 'Raised':
            return 0;
        case 'Validating':
            return 1;
        case 'Approved by Medical validator':
        case 'Medical Validator Visiting Hospital':
            return 2;
        case 'Approved by CPO':
        case 'Forwarded':
        case 'Approval Pending':
            return 3;
        case 'Approved':
        case 'Paid':
            return 4;
        case 'Rejected':
            return -1;
        default:
            return 0;
    }
}

function StatusTracker({ status }) {
    const rejectedStep = status === 'Rejected' ? 3 : -1; // Assume rejection after Approval Pending
    const activeStep = status === 'Approved' || status === 'Paid'
        ? 4
        : getStepForStatus(status);

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                {STATUS_STEPS.map((label, index) => {
                    let color = 'default';
                    let variant = 'outlined';
                    let disabled = false;

                    if (status === 'Rejected') {
                        if (index < rejectedStep) {
                            color = 'success';
                            variant = 'filled';
                        } else if (index === rejectedStep) {
                            color = 'error';
                            variant = 'filled';
                        } else {
                            color = 'default';
                            variant = 'outlined';
                            disabled = true;
                        }
                    } else if (status === 'Approved' || status === 'Paid') {
                        color = index <= activeStep ? 'success' : 'default';
                        variant = index <= activeStep ? 'filled' : 'outlined';
                    } else {
                        color = index < activeStep ? 'success' : (index === activeStep ? 'primary' : 'default');
                        variant = index <= activeStep ? 'filled' : 'outlined';
                    }

                    return (
                        <React.Fragment key={label}>
                            <Chip
                                label={label}
                                color={color}
                                variant={variant}
                                disabled={disabled}
                                sx={{
                                    fontWeight: index === activeStep ? 'bold' : 'normal',
                                    opacity: disabled ? 0.5 : 1,
                                }}
                            />
                            {index < STATUS_STEPS.length - 1 && (
                                <Divider orientation="vertical" flexItem />
                            )}
                        </React.Fragment>
                    );
                })}
            </Stack>
            {status === 'Rejected' && (
                <Typography color="error" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    This claim was rejected after Approval Pending.
                </Typography>
            )}
            {status === 'Approved' && (
                <Typography color="success.main" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    This claim has been paid.
                </Typography>
            )}
        </Box>
    );
}

function getClaimTypeLabel(claim) {
    return claim.hospital_id ? 'Cashless' : 'Reimbursement';
}
function getFriendlyStatusLabel(status) {
    const mapping = {
        Raised: 'Raised',
        Validating: 'Validating',
        'Approved by Medical validator': 'Medical Validator Visiting Hospital',
        'Medical Validator Visiting Hospital': 'Medical Validator Visiting Hospital',
        'Approved by CPO': 'Approval Pending',
        Forwarded: 'Approval Pending',
        'Approval Pending': 'Approval Pending',
        Approved: 'Paid',
        Paid: 'Paid',
        Rejected: 'Rejected',
    };
    return mapping[status] || status;
}

export default function More({ customer }) {
    const navigate = useNavigate();
    const [showContact, setShowContact] = React.useState(true);
    const [claims, setClaims] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Fetch approved & rejected claims for this customer
    React.useEffect(() => {
        async function fetchClaims() {
            setLoading(true);
            try {
                const res = await fetch('http://localhost:9090/claims');
                const data = await res.json();
                // Filter: only this customer and status Approved or Rejected
                const filtered = data.filter(
                    c => String(c.customer_id) === String(customer.id) &&
                        (c.status === "Approved" || c.status === "Rejected")
                );
                setClaims(filtered);
            } catch (e) {
                setClaims([]);
            } finally {
                setLoading(false);
            }
        }
        if (customer?.id) fetchClaims();
    }, [customer]);

    // Logout handler
    const handleLogout = () => {
        sessionStorage.removeItem("policyholder");
        navigate("/PolicyHolderLogin", { replace: true });
    };

    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                More
            </Typography>

            {/* My Profile Accordion */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <AccountCircleIcon color="primary" sx={{ mr: 2 }} />
                    <Typography fontWeight="bold">My Profile</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MyProfile customer={customer} />
                </AccordionDetails>
            </Accordion>

            {/* Nominee Details Accordion */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <PeopleIcon color="secondary" sx={{ mr: 2 }} />
                    <Typography fontWeight="bold">Nominee Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {customer && customer.nominee_name ? (
                        <Card sx={{ borderRadius: 3, boxShadow: 2, mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Nominee Information
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <AccountCircleIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography>{customer.nominee_name}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <CalendarMonthIcon color="warning" sx={{ mr: 1 }} />
                                    <Typography>DOB: {customer.nominee_dob}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <BadgeIcon color="info" sx={{ mr: 1 }} />
                                    <Typography>Relation: {customer.nominee_relation}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography color="error">
                            Nominee details not available.
                        </Typography>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* Service Request Archives Accordion */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <TrackChangesIcon color="success" sx={{ mr: 2 }} />
                    <Typography fontWeight="bold">Service Request Archives</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {loading ? (
                        <Stack alignItems="center" sx={{ py: 3 }}>
                            <CircularProgress />
                        </Stack>
                    ) : claims.length === 0 ? (
                        <Typography color="text.secondary">No approved or rejected claims found.</Typography>
                    ) : (
                        <Box>
                            {claims.map(claim => (
                                <Accordion key={claim.id} sx={{ mb: 2 }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                                            <Typography fontWeight="bold" sx={{ flex: 1 }}>
                                                Claim #{claim.id}
                                            </Typography>
                                            <Chip
                                                label={getFriendlyStatusLabel(claim.status)}
                                                color={
                                                    claim.status === 'Approved'
                                                        ? 'success'
                                                        : claim.status === 'Rejected'
                                                            ? 'error'
                                                            : 'warning'
                                                }
                                                size="small"
                                            />
                                        </Stack>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Card sx={{ borderLeft: `5px solid ${claim.hospital_id ? '#1976d2' : '#9c27b0'}`, borderRadius: 3, boxShadow: 4, mb: 2 }}>
                                            <CardContent>
                                                <Stack spacing={1}>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <Typography variant="h6" fontWeight="bold">Claim #{claim.id}</Typography>
                                                        <Chip
                                                            label={getClaimTypeLabel(claim)}
                                                            color={claim.hospital_id ? 'primary' : 'secondary'}
                                                            size="small"
                                                        />
                                                        <Chip
                                                            label={getFriendlyStatusLabel(claim.status)}
                                                            color={
                                                                claim.status === 'Approved'
                                                                    ? 'success'
                                                                    : claim.status === 'Rejected'
                                                                        ? 'error'
                                                                        : 'warning'
                                                            }
                                                            size="small"
                                                        />
                                                    </Stack>
                                                    <Divider sx={{ my: 1 }} />
                                                    <Typography variant="body2"><strong>Expected Amount:</strong> ₹{claim.expected_amount}</Typography>
                                                    <Typography variant="body2"><strong>Approved Amount:</strong> ₹{claim.approved_amount || '-'}</Typography>
                                                    <Typography variant="body2"><strong>Submitted Date:</strong> {claim.submitted_date}</Typography>
                                                    <Typography variant="body2"><strong>Feedback:</strong> {claim.feedback || '-'}</Typography>
                                                </Stack>
                                                <Divider sx={{ my: 2 }} />
                                                <StatusTracker status={claim.status} />
                                            </CardContent>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* Hospital Locator Accordion */}
            <Accordion>
                <HospitalLocator />
            </Accordion>
            {/* Settings Accordion */}
            <Accordion>
                {customer && <SettingsPage customerId={customer.id} />}
            </Accordion>
            {/* Contact Us Accordion */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <ContactSupportIcon color="warning" sx={{ mr: 2 }} />
                    <Typography fontWeight="bold">Contact Us</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {showContact && (
                        <Card sx={{ width: '100%', borderRadius: 3, boxShadow: 2, mb: 2 }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>
                                    Contact Us
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <LocationOnIcon color="primary" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        123 Sun Avenue, 4th Floor, Chennai, TN 600001
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <EmailIcon color="error" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        support@sunhealthinsurance.com
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <PhoneIcon color="success" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        +91 44 1234 5678, +91 98765 43210
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <LanguageIcon color="secondary" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        www.sunhealthinsurance.com
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                    <AccessTimeIcon color="warning" sx={{ mr: 1 }} />
                                    <Typography variant="body1">
                                        Mon–Sat: 9:00 AM – 6:00 PM
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', pb: 2, pr: 2 }}>
                                <Button variant="contained" color="primary">
                                    Contact Now
                                </Button>
                            </CardActions>
                        </Card>
                    )}
                </AccordionDetails>
            </Accordion>

            {/* Logout Accordion */}
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <LogoutIcon color="error" sx={{ mr: 2 }} />
                    <Typography fontWeight="bold" color="error">Logout</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ mb: 2 }}>
                        Click below to securely log out of your account.
                    </Typography>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{ fontWeight: "bold" }}
                        fullWidth
                    >
                        Logout
                    </Button>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
