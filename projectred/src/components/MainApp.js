import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  CircularProgress,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Chip,
} from '@mui/material';
import {
  AccountCircle,
  Logout,
  Settings,
  Search,
  Home,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import LoginPage from './auth/LoginPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import DonorSearchPage from './pages/DonorSearchPage';
import ConsentPage from './pages/ConsentPage';

const MainApp = () => {
  const { user, userData, loading, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState(() => {
    // Check for PWA shortcut action
    const shortcutAction = localStorage.getItem('pwa_shortcut_action');
    if (shortcutAction) {
      localStorage.removeItem('pwa_shortcut_action');
      return shortcutAction === 'search' ? 'search' : shortcutAction === 'profile' ? 'profile' : 'home';
    }
    return 'home';
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  // Check if user needs to complete profile or give consent
  if (userData && (!userData.phone || !userData.city || !userData.state || !userData.pincode || !userData.bloodGroup)) {
    return <ProfilePage isInitialSetup={true} />;
  }

  if (userData && !userData.consentGiven) {
    return <ConsentPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'profile':
        return <ProfilePage />;
      case 'search':
        return <DonorSearchPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          {/* Logo and Title */}
          <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
            <img 
              src="/logo192.png" 
              alt="ProjectRed Logo" 
              style={{ 
                height: '40px', 
                width: '40px', 
                marginRight: '12px',
                borderRadius: '8px'
              }} 
            />
            <Typography variant="h6" component="div">
             
            </Typography>
          </Box>
          
          {/* Navigation Buttons */}
          <Button
            color="inherit"
            startIcon={<Home />}
            onClick={() => navigateTo('home')}
            sx={{ mr: 1 }}
          >
            Home
          </Button>
          
          <Button
            color="inherit"
            startIcon={<Search />}
            onClick={() => navigateTo('search')}
            sx={{ mr: 1 }}
          >
            Find Donors
          </Button>

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            {userData?.bloodGroup && (
              <Chip
                label={userData.bloodGroup}
                color="secondary"
                size="small"
                sx={{ mr: 2, fontWeight: 'bold' }}
              />
            )}
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
            >
              {user.photoURL ? (
                <Avatar src={user.photoURL} sx={{ width: 32, height: 32 }} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { handleMenuClose(); navigateTo('profile'); }}>
                <Settings sx={{ mr: 1 }} /> Profile Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        {renderPage()}
      </Container>
    </Box>
  );
};

export default MainApp;
