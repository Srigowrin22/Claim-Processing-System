// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { createTheme } from '@mui/material/styles';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
// import PaidIcon from '@mui/icons-material/Paid';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import DescriptionIcon from '@mui/icons-material/Description';
// import { AppProvider } from '@toolpad/core/AppProvider';
// import { DashboardLayout } from '@toolpad/core/DashboardLayout';
// import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
// import HandshakeIcon from '@mui/icons-material/Handshake';

// import WelcomeRegionalHead from './WelcomeRegionalHead';
// import DashboardStatsPage from './DashboardStatsPage';
// import CashlessPage from './CashlessPage';
// import ReimbursementPage from './ReimbursementPage';
// import CashlessStat from './CashlessStat';
// import ReimbursementStat from './ReimbursementStat';

// function StatsPage() {
//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h4" gutterBottom>
//                 Regional Stats & Analytics
//             </Typography>
//             <Typography>
//                 Visualize and analyze cashless and reimbursement performance statistics.
//             </Typography>
//         </Box>
//     );
// }

// function CashlessStatsPage() {
//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h5" gutterBottom>
//                 Cashless Stats
//             </Typography>
//             <Typography>
//                 Detailed analytics for cashless transactions and claims.
//             </Typography>
//         </Box>
//     );
// }

// function ReimbursementStatsPage() {
//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h5" gutterBottom>
//                 Reimbursement Stats
//             </Typography>
//             <Typography>
//                 Detailed analytics for reimbursement claims and settlements.
//             </Typography>
//         </Box>
//     );
// }

// // Sidebar navigation
// const NAVIGATION = [
//     { kind: 'header', title: 'Main Menu' },
//     { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
//     { segment: 'cashless', title: 'Cashless', icon: <CreditCardOffIcon /> },
//     { segment: 'reimbursement', title: 'Reimbursement', icon: <PaidIcon /> },
//     { kind: 'divider' },
//     { kind: 'header', title: 'Analytics' },
//     {
//         segment: 'stats',
//         title: 'Stats',
//         icon: <BarChartIcon />,
//         children: [
//             {
//                 segment: 'cashlessStats',
//                 title: 'Cashless Stats',
//                 icon: <DescriptionIcon />,
//             },
//             {
//                 segment: 'reimbursementStats',
//                 title: 'Reimbursement Stats',
//                 icon: <DescriptionIcon />,
//             },
//         ],
//     },
// ];

// const demoTheme = createTheme({
//     cssVariables: {
//         colorSchemeSelector: 'data-toolpad-color-scheme',
//     },
//     colorSchemes: { light: true, dark: true },
//     breakpoints: {
//         values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
//     },
// });

// const BrandLogo = () => (
//     <HandshakeIcon sx={{ color: "#FF6347", fontSize: "24px" }} />
// );

// // Content router, now receives user as a prop
// function DashboardContent({ pathname, user }) {
//     switch (pathname) {
//         case '/dashboard':
//             return <DashboardStatsPage />;
//         case '/cashless':
//             return <CashlessPage />;
//         case '/reimbursement':
//             return <ReimbursementPage />;
//         case '/stats':
//             return <StatsPage />;
//         case '/stats/cashlessStats':
//             return <CashlessStat />;
//         case '/stats/reimbursementStats':
//             return <ReimbursementStat />;
//         default:
//             return <WelcomeRegionalHead user={user} />;
//     }
// }

// DashboardContent.propTypes = {
//     pathname: PropTypes.string.isRequired,
//     user: PropTypes.object, // user is now a prop
// };

// function RegionalHeadDashboard(props) {
//     const { window } = props;
//     const router = useDemoRouter('/RHDashboard');
//     const demoWindow = window !== undefined ? window() : undefined;

//     // --- Hardcoded user id here ---
//     const userId = 101;

//     // --- State for users and roles ---
//     const [users, setUsers] = React.useState([]);
//     const [roles, setRoles] = React.useState([]);
//     const [loading, setLoading] = React.useState(true);

//     // --- Fetch users and roles from JSON server ---
//     React.useEffect(() => {
//         async function fetchData() {
//             setLoading(true);
//             try {
//                 const [usersRes, rolesRes] = await Promise.all([
//                     fetch('http://localhost:9090/users'),
//                     fetch('http://localhost:9090/roles'),
//                 ]);
//                 const usersData = await usersRes.json();
//                 const rolesData = await rolesRes.json();
//                 setUsers(usersData);
//                 setRoles(rolesData);
//             } catch (error) {
//                 setUsers([]);
//                 setRoles([]);
//                 console.error('Failed to fetch data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//         fetchData();
//     }, []);

//     // --- Find the user object by userId ---
// const user = users.find(u => Number(u.id) === userId);

//     if (loading) {
//         return (
//             <Box sx={{ py: 4, textAlign: 'center' }}>
//                 <Typography>Loading...</Typography>
//             </Box>
//         );
//     }

//     return (
//         <DemoProvider window={demoWindow}>
//             <AppProvider
//                 navigation={NAVIGATION}
//                 router={router}
//                 theme={demoTheme}
//                 window={demoWindow}
//                 branding={{
//                     title: 'Regional Head',
//                     logo: <BrandLogo />
//                 }}
//             >
//                 <DashboardLayout>
//                     {/* Pass user as a prop */}
//                     <DashboardContent pathname={router.pathname} user={user} />
//                 </DashboardLayout>
//             </AppProvider>
//         </DemoProvider>
//     );
// }

// RegionalHeadDashboard.propTypes = {
//     window: PropTypes.func,
// };

// export default RegionalHeadDashboard;


import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import PaidIcon from '@mui/icons-material/Paid';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import HandshakeIcon from '@mui/icons-material/Handshake';

import WelcomeRegionalHead from './WelcomeRegionalHead';
import DashboardStatsPage from './DashboardStatsPage';
import CashlessPage from './CashlessPage';
import ReimbursementPage from './ReimbursementPage';
import CashlessStat from './CashlessStat';
import ReimbursementStat from './ReimbursementStat';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

function StatsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Regional Stats & Analytics
      </Typography>
      <Typography>
        Visualize and analyze cashless and reimbursement performance statistics.
      </Typography>
    </Box>
  );
}

function CashlessStatsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Cashless Stats
      </Typography>
      <Typography>
        Detailed analytics for cashless transactions and claims.
      </Typography>
    </Box>
  );
}

function ReimbursementStatsPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Reimbursement Stats
      </Typography>
      <Typography>
        Detailed analytics for reimbursement claims and settlements.
      </Typography>
    </Box>
  );
}

// Sidebar navigation
const NAVIGATION = [
  { kind: 'header', title: 'Main Menu' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { segment: 'cashless', title: 'Cashless', icon: <CreditCardOffIcon /> },
  { segment: 'reimbursement', title: 'Reimbursement', icon: <PaidIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Analytics' },
  {
    segment: 'stats',
    title: 'Stats',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'cashlessStats',
        title: 'Cashless Stats',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'reimbursementStats',
        title: 'Reimbursement Stats',
        icon: <DescriptionIcon />,
      },
    ],
  },
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
  <HandshakeIcon sx={{ color: "#FF6347", fontSize: "24px" }} />
);

function stringAvatar(name) {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) return names[0][0].toUpperCase();
  return `${names[0][0]}${names[1][0]}`.toUpperCase();
}

// Content router, now receives user as a prop
function DashboardContent({ pathname, user }) {
  switch (pathname) {
    case '/dashboard':
      return <DashboardStatsPage />;
    case '/cashless':
      return <CashlessPage />;
    case '/reimbursement':
      return <ReimbursementPage />;
    case '/stats':
      return <StatsPage />;
    case '/stats/cashlessStats':
      return <CashlessStat />;
    case '/stats/reimbursementStats':
      return <ReimbursementStat />;
    default:
      return <WelcomeRegionalHead user={user} />;
  }
}

DashboardContent.propTypes = {
  pathname: PropTypes.string.isRequired,
  user: PropTypes.object,
};

function RegionalHeadDashboard(props) {
  const { window } = props;
  const router = useDemoRouter('/RHDashboard');
  const demoWindow = window !== undefined ? window() : undefined;

  // Hardcoded user id here
  const userId = 101;

  // State for users and roles
  const [users, setUsers] = React.useState([]);
  const [roles, setRoles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch users and roles from JSON server
  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const [usersRes, rolesRes] = await Promise.all([
          fetch('http://localhost:9090/users'),
          fetch('http://localhost:9090/roles'),
        ]);
        const usersData = await usersRes.json();
        const rolesData = await rolesRes.json();
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        setUsers([]);
        setRoles([]);
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Find the user object by userId
  const user = users.find(u => Number(u.id) === userId);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
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
          title: 'Regional Head',
          logo: <BrandLogo />
        }}
      >
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
          <DashboardLayout>
            {/* Pass user as a prop */}
            <DashboardContent pathname={router.pathname} user={user} />
          </DashboardLayout>

          {/* Logout avatar fixed bottom left */}
          <Box
            sx={{
              position: 'fixed',
              left: 0,
              bottom: 0,
              width: 80,
              height: 80,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1301,
            }}
          >
            <Tooltip
              title={
                <Box sx={{ p: 1, minWidth: 180 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar
                      src={user?.avatar}
                      sx={{ width: 40, height: 40, mr: 1, bgcolor: "#00BCD4" }}
                    >
                      {!user?.avatar && stringAvatar(user?.name)}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">{user?.name}</Typography>
                      <Typography variant="caption" color="text.secondary">
                        {user?.email}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Button
                    startIcon={<LogoutIcon />}
                    color="error"
                    fullWidth
                    onClick={handleLogout}
                    size="small"
                    variant="outlined"
                  >
                    Logout
                  </Button>
                </Box>
              }
              placement="right"
              arrow
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 2,
                  }
                }
              }}
            >
              <IconButton size="large">
                <Avatar
                  src={user?.avatar}
                  sx={{ bgcolor: "#00BCD4", width: 32, height: 32, fontSize: 22 }}
                >
                  {!user?.avatar && stringAvatar(user?.name)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AppProvider>
    </DemoProvider>
  );
}

RegionalHeadDashboard.propTypes = {
  window: PropTypes.func,
};

export default RegionalHeadDashboard;
