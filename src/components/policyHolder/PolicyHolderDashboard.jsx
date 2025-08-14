import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import PolicyIcon from '@mui/icons-material/Policy';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useNavigate } from "react-router-dom";

import PolicyCard from './PolicyCard';
import WelcomePolicyPage from './WelcomePolicypage';
import Home from './Home';
import More from './More';
import ClaimsPage from './ClaimsPage';

const NAVIGATION = [
    { kind: 'header', title: 'Main Menu' },
    { segment: 'home', title: 'Home', icon: <HomeIcon /> },
    { segment: 'my-policy', title: 'My Policy', icon: <PolicyIcon /> },
    { segment: 'claims', title: 'Claims', icon: <AssignmentIcon /> },
    { segment: 'more', title: 'More', icon: <MoreHorizIcon /> },
];

const demoTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
    },
});

const BrandLogo = () => (
    <HandshakeIcon sx={{
        color: "#FF6347",
        fontSize: "24px"
    }} />
);

function MyPoliciesPage({ customerPolicies, customerId }) {
    if (!customerPolicies || customerPolicies.length === 0) {
        return (
            <Box sx={{ p: 4 }}>
                <Typography variant="h6">No policies found.</Typography>
            </Box>
        );
    }
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
                My Policies
            </Typography>
            <Grid container spacing={3}>
                {customerPolicies.map(({ policy, cover }) => (
                    <Grid item xs={12} sm={6} md={4} key={policy.policy_id}>
                        <PolicyCard
                            policy={policy}
                            cover={cover}
                            customerId={customerId}
                            onAction={() => alert(`Details for policy: ${policy.policy_name}`)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

MyPoliciesPage.propTypes = {
    customerPolicies: PropTypes.array.isRequired,
    customerId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

function DashboardContent({ pathname, customer, customerPolicies }) {
    switch (pathname) {
        case '/home':
            return <Home customer={customer} />;
        case '/my-policy':
            return <MyPoliciesPage customerPolicies={customerPolicies} customerId={customer.id} />;
        case '/claims':
            return <ClaimsPage customerId={customer.id} />;
        case '/more':
            return <More customer={customer} />;
        case '/policyholder':
            return <WelcomePolicyPage />;
        default:
            return <WelcomePolicyPage />;
    }
}

DashboardContent.propTypes = {
    pathname: PropTypes.string.isRequired,
    customer: PropTypes.object.isRequired,
    customerPolicies: PropTypes.array.isRequired,
};

function PolicyHolderDashboard(props) {
    const { window } = props;
    const router = useDemoRouter('/PolicyHolderDashboard');
    const demoWindow = window !== undefined ? window() : undefined;
    const navigate = useNavigate();

    const [customer, setCustomer] = React.useState(null);
    const [customerPolicies, setCustomerPolicies] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const stored = sessionStorage.getItem("policyholder");
        if (!stored) {
            navigate("/policyholder-login");
            return;
        }
        const cust = JSON.parse(stored);
        async function fetchData() {
            setLoading(true);
            try {
                const [policiesRes, coversRes] = await Promise.all([
                    fetch('http://localhost:9090/policies'),
                    fetch('http://localhost:9090/covers'),
                ]);
                const [policiesData, coversData] = await Promise.all([
                    policiesRes.json(),
                    coversRes.json(),
                ]);
                const custPolicies = (cust.policies || []).map(({ policy_id, cover_id }) => ({
                    policy: policiesData.find((p) => p.policy_id === policy_id),
                    cover: coversData.find((c) => c.cover_id === cover_id),
                }));
                setCustomer(cust);
                setCustomerPolicies(custPolicies);
            } catch (error) {
                setCustomer(null);
                setCustomerPolicies([]);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [navigate]);

    if (loading) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    if (!customer) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>Customer not found.</Typography>
            </Box>
        );
    }

    return (
        <DemoProvider window={demoWindow}>
            <AppProvider
                navigation={NAVIGATION}
                router={router}
                theme={demoTheme}
                window={demoWindow}
                branding={{
                    title: 'Policy Holder',
                    logo: <BrandLogo />
                }}
            >
                <DashboardLayout>
                    <DashboardContent
                        pathname={router.pathname}
                        customer={customer}
                        customerPolicies={customerPolicies}
                    />
                </DashboardLayout>
            </AppProvider>
        </DemoProvider>
    );
}

PolicyHolderDashboard.propTypes = {
    window: PropTypes.func,
};

export default PolicyHolderDashboard;
