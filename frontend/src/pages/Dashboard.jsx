// pages/Dashboard.jsx
import { Box } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Box flex={1} p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Dashboard;
