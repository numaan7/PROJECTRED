import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  IconButton
} from '@mui/material';
import {
  WifiOff as OfflineIcon,
  Wifi as OnlineIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { setupNetworkListeners, getNetworkStatus } from '../utils/pwa';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);
  const [showOnlineMessage, setShowOnlineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
      setShowOnlineMessage(true);
      console.log('App is online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
      setShowOnlineMessage(false);
      console.log('App is offline');
    };

    // Set initial state
    setIsOnline(navigator.onLine);

    // Setup listeners
    const cleanup = setupNetworkListeners(handleOnline, handleOffline);

    return cleanup;
  }, []);

  const handleRefresh = () => {
    if (isOnline) {
      window.location.reload();
    }
  };

  const handleCloseOnlineMessage = () => {
    setShowOnlineMessage(false);
  };

  return (
    <>
      {/* Offline Persistent Banner */}
      {!isOnline && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: 'warning.main',
            color: 'warning.contrastText',
            py: 1,
            px: 2,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1
          }}
        >
          <OfflineIcon fontSize="small" />
          <Typography variant="body2" fontWeight="medium">
            You're offline. Some features may not be available.
          </Typography>
          <IconButton
            size="small"
            onClick={handleRefresh}
            sx={{ color: 'inherit', ml: 1 }}
            disabled={!isOnline}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Online Message Snackbar */}
      <Snackbar
        open={showOnlineMessage}
        autoHideDuration={4000}
        onClose={handleCloseOnlineMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseOnlineMessage}
          severity="success"
          icon={<OnlineIcon />}
          sx={{ width: '100%' }}
        >
          You're back online! All features are now available.
        </Alert>
      </Snackbar>
    </>
  );
};

export default OfflineIndicator;
