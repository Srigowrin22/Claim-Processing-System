import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Box, Typography, Grid, Card, CardContent, CardActions, Button, Stack, Divider, Chip, Dialog, DialogTitle, DialogContent, DialogActions, Stepper, Step, StepLabel, CircularProgress, IconButton, Tooltip
} from '@mui/material';
import {
    Visibility as VisibilityIcon,
    TrackChanges as TrackChangesIcon,
    Cancel as CancelIcon,
    ThumbDown as ThumbDownIcon,
    ThumbUp as ThumbUpIcon,
    Edit as EditIcon,
    Download as DownloadIcon,
    Preview as PreviewIcon,
} from '@mui/icons-material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RaiseClaimPage from './RaiseClaimPage';
import { Viewer } from '@react-pdf-viewer/core';

const STATUS_STEPS = [
    'Raised',
    'Validating',
    'Medical Validator Visiting Hospital',
    'Approval Pending',
    'Paid',
];
const STATUS_ICONS = {
    Raised: <ThumbUpIcon sx={{ color: '#1976d2' }} />,
    Validating: <TrackChangesIcon sx={{ color: '#1976d2' }} />,
    'Medical Validator Visiting Hospital': <VisibilityIcon sx={{ color: '#1976d2' }} />,
    'Approval Pending': <TrackChangesIcon sx={{ color: '#1976d2' }} />,
    Paid: <ThumbUpIcon sx={{ color: '#1976d2' }} />,
};
const STATUS_MAP = {
    Raised: 0,
    Validating: 1,
    'Approved by Medical validator': 2,
    'Approved by CPO': 3,
    Forwarded: 3,
    Approved: 4,
    Rejected: -1,
};

function isPdf(url) {
    return typeof url === "string" && url.toLowerCase().includes('application/pdf');
}

function StatusTracker({ status }) {
    const activeStep = STATUS_MAP[status] ?? 0;
    const isRejected = status === 'Rejected';
    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>Status Tracker</Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
                {STATUS_STEPS.map((label, index) => (
                    <Step key={label} completed={index < activeStep} error={isRejected && index === activeStep}>
                        <StepLabel
                            icon={index <= activeStep ? STATUS_ICONS[label] : <ThumbDownIcon sx={{ color: 'black' }} />}
                            sx={{
                                '& .MuiStepLabel-label': {
                                    color: index <= activeStep ? '#1976d2' : 'black',
                                    fontWeight: index === activeStep ? 'bold' : 'normal',
                                },
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            {isRejected && (
                <Typography color="error" sx={{ mt: 2, fontWeight: 'bold', textAlign: 'center' }}>
                    This claim has been rejected.
                </Typography>
            )}
        </Box>
    );
}

function DocumentPreviewDialog({ open, docUrl, docType, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Document Preview</DialogTitle>
            <DialogContent dividers sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
                {docUrl ? (
                    isPdf(docUrl) ? (
                        <div style={{ width: 600, height: 800 }}>
                            <Viewer fileUrl={docUrl} />
                        </div>
                    ) : (
                        <img src={docUrl} alt={docType} style={{ maxWidth: 600, maxHeight: 800, borderRadius: 8 }} />
                    )
                ) : (
                    <Typography>No document found.</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">Close</Button>
            </DialogActions>
        </Dialog>
    );
}

function ClaimDocumentDialog({ open, claim, document, onClose, onPreview }) {
    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Claim #{claim?.id} - Documents</DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
                {claim && (
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>Claim Details</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2"><strong>Claim ID:</strong> {claim.id}</Typography>
                                <Typography variant="body2"><strong>Customer ID:</strong> {claim.customer_id}</Typography>
                                <Typography variant="body2"><strong>Hospital ID:</strong> {claim.hospital_id || '-'}</Typography>
                                <Typography variant="body2"><strong>Expected Amount:</strong> ₹{claim.expected_amount}</Typography>
                                <Typography variant="body2"><strong>Approved Amount:</strong> ₹{claim.approved_amount || '-'}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2"><strong>Status:</strong> {claim.status}</Typography>
                                <Typography variant="body2"><strong>Submitted:</strong> {claim.submitted_date}</Typography>
                                <Typography variant="body2"><strong>Last Updated:</strong> {claim.last_updated_date || '-'}</Typography>
                            </Grid>
                        </Grid>
                        <Divider sx={{ my: 3 }} />
                    </Box>
                )}
                {document ? (
                    <Box>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                            Uploaded Documents
                        </Typography>
                        <Grid container spacing={3}>
                            {Object.entries(document).map(([key, val]) =>
                                key !== "id" && key !== "verified_by" && key !== "claim_id" && key !== "last_updated" && val ? (
                                    <Grid item xs={12} sm={6} md={4} key={key}>
                                        <Card
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                minHeight: 140,
                                                borderRadius: 2,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                boxShadow: 1,
                                                backgroundColor: '#fafafa',
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight="bold"
                                                gutterBottom
                                                sx={{ textTransform: 'capitalize' }}
                                            >
                                                {key.replace(/_/g, ' ')}
                                            </Typography>
                                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                                <Tooltip title="Preview">
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => onPreview(val, key)}
                                                    >
                                                        <PreviewIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Download">
                                                    <IconButton
                                                        color="secondary"
                                                        component="a"
                                                        href={val}
                                                        download={key + (isPdf(val) ? ".pdf" : ".jpg")}
                                                    >
                                                        <DownloadIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Card>
                                    </Grid>
                                ) : null
                            )}
                        </Grid>
                    </Box>
                ) : (
                    <Typography>No documents found.</Typography>
                )}
            </DialogContent>
            <DialogActions sx={{ pr: 3, pb: 2 }}>
                <Button onClick={onClose} variant="outlined" color="error" startIcon={<CancelIcon />}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default function ClaimsPage({ customerId }) {
    const [claims, setClaims] = React.useState([]);
    const [documents, setDocuments] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const [viewDocClaimId, setViewDocClaimId] = React.useState(null);
    const [statusClaimId, setStatusClaimId] = React.useState(null);
    const [openRaiseClaim, setOpenRaiseClaim] = React.useState(false);
    const [editClaim, setEditClaim] = React.useState(null);
    const [editDoc, setEditDoc] = React.useState(null);

    // For preview dialog
    const [previewDocUrl, setPreviewDocUrl] = React.useState(null);
    const [previewDocType, setPreviewDocType] = React.useState('');

    // Fetch claims & documents, auto-refresh every 2 sec
    const fetchData = React.useCallback(async () => {
        setRefreshing(true);
        try {
            const [claimsRes, docsRes] = await Promise.all([
                fetch('http://localhost:9090/claims'),
                fetch('http://localhost:9090/documents'),
            ]);
            const claimsData = await claimsRes.json();
            const docsData = await docsRes.json();

            // Exclude both Approved and Rejected claims
            const filteredClaims = claimsData.filter(
                c =>
                    Number(c.customer_id) === Number(customerId) &&
                    c.status !== 'Approved' &&
                    c.status !== 'Rejected'
            );
            setClaims(filteredClaims);

            // Map documents by doc_id (not claim_id!)
            const docMap = {};
            docsData.forEach(doc => {
                docMap[doc.id] = doc;
            });
            setDocuments(docMap);
        } catch (error) {
            setClaims([]);
            setDocuments({});
            console.error('Failed to fetch claims or documents:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [customerId]);


    React.useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 2000);
        return () => clearInterval(interval);
    }, [fetchData]);

    function getClaimTypeLabel(claim) {
        return claim.hospital_id ? 'Cashless' : 'Reimbursement';
    }
    function getFriendlyStatusLabel(status) {
        const mapping = {
            Raised: 'Raised',
            Validating: 'Validating',
            'Approved by Medical validator': 'Medical Validator Visiting Hospital',
            'Approved by CPO': 'Approval Pending',
            Forwarded: 'Approval Pending',
            Approved: 'Paid',
            Rejected: 'Rejected',
        };
        return mapping[status] || status;
    }

    const currentClaimForDoc = viewDocClaimId ? claims.find(c => c.id === viewDocClaimId) : null;
    const currentDoc = currentClaimForDoc ? documents[currentClaimForDoc.doc_id] : null;
    const currentClaimForStatus = statusClaimId ? claims.find(c => c.id === statusClaimId) : null;

    const handleOpenRaiseClaim = (claim = null) => {
        setEditClaim(claim);
        setEditDoc(claim ? documents[claim.doc_id] : null);
        setOpenRaiseClaim(true);
    };

    const handleCloseRaiseClaim = (didUpdate = false) => {
        setOpenRaiseClaim(false);
        setEditClaim(null);
        setEditDoc(null);
        if (didUpdate) fetchData();
    };

    // Preview handlers
    function handlePreview(docUrl, docType) {
        setPreviewDocUrl(docUrl);
        setPreviewDocType(docType);
    }
    function handleClosePreview() {
        setPreviewDocUrl(null);
        setPreviewDocType('');
    }

    return (
        <Box sx={{ p: 4 }}>
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ flex: 1 }}>
                    Claims Raised
                </Typography>
            </Stack>
            {loading ? (
                <Typography sx={{ mt: 4, textAlign: 'center' }}>Loading claims...</Typography>
            ) : claims.length === 0 ? (
                <Typography sx={{ mt: 4, textAlign: 'center' }}>No claims found.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {claims.map(claim => (
                        <Grid item xs={12} md={6} key={claim.id}>
                            <Card sx={{ borderLeft: `5px solid ${claim.hospital_id ? '#1976d2' : '#9c27b0'}`, borderRadius: 3, boxShadow: 4 }}>
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
                                                    claim.status === 'Approved' ? 'success' :
                                                        claim.status === 'Rejected' ? 'error' :
                                                            'warning'
                                                }
                                                size="small"
                                            />
                                        </Stack>
                                        <Divider sx={{ my: 1 }} />
                                        <Typography variant="body2"><strong>Expected Amount:</strong> ₹{claim.expected_amount}</Typography>
                                        <Typography variant="body2"><strong>Approved Amount:</strong> ₹{claim.approved_amount || '-'}</Typography>
                                        <Typography variant="body2"><strong>Submitted Date:</strong> {claim.submitted_date}</Typography>
                                        <Typography variant="body2"><strong>Query:</strong> {claim.feedback}</Typography>

                                    </Stack>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        variant="outlined"
                                        startIcon={<VisibilityIcon />}
                                        onClick={() => setViewDocClaimId(claim.id)}
                                        color="primary"
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<TrackChangesIcon />}
                                        onClick={() => setStatusClaimId(claim.id)}
                                        color="secondary"
                                    >
                                        Status
                                    </Button>
                                    {claim.status === 'Raised' && (
                                        <Button
                                            variant="outlined"
                                            startIcon={<EditIcon />}
                                            color="info"
                                            onClick={() => handleOpenRaiseClaim(claim)}
                                        >
                                            Edit
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
            <ClaimDocumentDialog
                open={Boolean(viewDocClaimId)}
                claim={currentClaimForDoc}
                document={currentDoc}
                onClose={() => setViewDocClaimId(null)}
                onPreview={handlePreview}
            />
            <Dialog open={Boolean(statusClaimId)} onClose={() => setStatusClaimId(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Claim Status</DialogTitle>
                <DialogContent dividers>
                    {currentClaimForStatus ? (
                        <StatusTracker status={currentClaimForStatus.status} />
                    ) : (
                        <Typography>No status info available.</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setStatusClaimId(null)} variant="outlined" color="error">Close</Button>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircleIcon />}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    borderRadius: '50px',
                    px: 4,
                    py: 1.5,
                    boxShadow: 4,
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    zIndex: 1300,
                }}
                onClick={() => handleOpenRaiseClaim()}
            >
                Raise Claim
            </Button>
            <Dialog
                open={openRaiseClaim}
                onClose={() => handleCloseRaiseClaim()}
                maxWidth="md"
                fullWidth
            >
                <RaiseClaimPage
                    customerId={customerId}
                    claim={editClaim}
                    document={editDoc}
                    onClose={handleCloseRaiseClaim}
                />
            </Dialog>
            {/* Preview Dialog */}
            <DocumentPreviewDialog
                open={Boolean(previewDocUrl)}
                docUrl={previewDocUrl}
                docType={previewDocType}
                onClose={handleClosePreview}
            />
        </Box>
    );
}

ClaimsPage.propTypes = {
    customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};
