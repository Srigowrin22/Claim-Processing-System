
import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import Brightness5 from "@mui/icons-material/Brightness5";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import Paid from '@mui/icons-material/Paid';
import  Storage  from '@mui/icons-material/Storage';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import DashBoardPages from '../pages/DashBoardPages';
import IntegrationPage from '../pages/IntegrationPage';
import Cashless from '../pages/Cashless';
import SalesReportPage from '../pages/CashlessStatsPage';
import CashlessStatsPage from '../pages/CashlessStatsPage';
import TrafficReportPage from '../pages/ReimbursementStatsPage';
import Handshake from "@mui/icons-material/Handshake";
//  import { Box } from "@mui/material";
import ReimbursementReportPage from '../pages/ReimbursementStatsPage';
import Reimbursement from '../pages/Reimbursement';
import Covers from '../pages/Covers';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'cashless',
    title: 'Cashless',
    icon: <CreditCardOffIcon />,
  },
  {
    segment: 'reimbursement',
    title: 'Reimbursement',
    icon: <Paid />,
  },
   {
    segment: 'covers',
    title: 'Covers',
    icon: <Storage />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Stats',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'cashlessstats',
        title: 'CashlessStats',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'reimbursementstats',
        title: 'ReimbursementStats',
        icon: <DescriptionIcon />,
      },
    ],
  },
  // {
  //   segment: 'integrations',
  //   title: 'Integrations',
  //   icon: <LayersIcon />,
  // },
];

function DemoPageContent({ pathname }) {
  switch (pathname) {
    case '/dashboard':
      return <DashBoardPages />;
    case '/cashless':
      return <Cashless />;
    case '/reimbursement' :
      return <Reimbursement/>
    case '/covers' :
      return <Covers/>
    case '/reports/cashlessstats':
      return <CashlessStatsPage />;
    case '/reports/reimbursementstats':
      return <ReimbursementReportPage />;
    case '/integrations':
      return <IntegrationPage />;
    default:
      return (
        <Box sx={{ p: 4 }}>
          <Typography variant="h5">Page not found: {pathname}</Typography>
        </Box>
      );
  }
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

// const BrandLogo = () => (
//   <Box sx={{
//     display: 'inline-flex',
//     background: 'linear-gradient(135deg, #FF4500 30%, #FF8C00 90%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//     lineHeight: 0 // Ensures proper icon alignment
//   }}>
//     <Handshake fontSize="medium" />
//   </Box>
// );
const BrandLogo = () => (
  <Handshake sx={{ 
    color: "#FF6347", 
    fontSize: "24px"
  }} />
);

function DashboardLayoutBasic() {
  const router = useDemoRouter('/dashboard');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      branding={{title : "Claim Processing Officer",
        logo : <BrandLogo/>
      }}
      
    >
      
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}

export default DashboardLayoutBasic;
