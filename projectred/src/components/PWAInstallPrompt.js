import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import {
  GetApp as InstallIcon,
  Close as CloseIcon,
  PhoneAndroid,
  Computer
} from '@mui/icons-material';
import { PWAInstaller } from '../utils/pwa';

const PWAInstallPrompt = () => {
  const [installer] = useState(new PWAInstaller());
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    setIsStandalone(installer.isStandalone());
    
    // Check install availability periodically
    const checkInstallAvailability = () => {
      setShowInstallButton(installer.isInstallAvailable() && !installer.isStandalone());
    };

    checkInstallAvailability();
    const interval = setInterval(checkInstallAvailability, 1000);

    // Listen for install prompt
    const handleBeforeInstallPrompt = () => {
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      setShowInstallButton(false);
      setShowInstallDialog(false);
      setShowSuccessMessage(true);
      setIsStandalone(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [installer]);

  const handleInstallClick = () => {
    setShowInstallDialog(true);
  };

  const handleInstall = async () => {
    const result = await installer.promptInstall();
    if (result) {
      setShowInstallDialog(false);
      setShowSuccessMessage(true);
    }
  };

  const handleCloseDialog = () => {
    setShowInstallDialog(false);
  };

  if (isStandalone || !showInstallButton) {
    return null;
  }

  return (
    <>
      {/* Install Button */}
      <Button
        variant="contained"
        color="secondary"
        startIcon={<InstallIcon />}
        onClick={handleInstallClick}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
          borderRadius: '25px',
          px: 3,
          py: 1.5,
          boxShadow: 3,
          '&:hover': {
            boxShadow: 6,
          }
        }}
      >
        Install App
      </Button>

      {/* Install Dialog */}
      <Dialog
        open={showInstallDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 }
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Install Project RED</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box textAlign="center" py={2}>
            <Box mb={3}>
              <img 
                src="/PROJECTRED/logo192.png" 
                alt="Project RED Logo" 
                style={{ width: 80, height: 80, borderRadius: 16 }}
              />
            </Box>
            
            <Typography variant="h6" gutterBottom color="primary">
              Install Project RED on your device
            </Typography>
            
            <Typography variant="body1" color="text.secondary" paragraph>
              Get quick access to blood donor search and save lives with our Progressive Web App.
            </Typography>

            <Box display="flex" justifyContent="center" gap={4} mt={3} mb={2}>
              <Box textAlign="center">
                <PhoneAndroid sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="body2">Works on Mobile</Typography>
              </Box>
              <Box textAlign="center">
                <Computer sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                <Typography variant="body2">Works on Desktop</Typography>
              </Box>
            </Box>

            <Box sx={{ backgroundColor: 'grey.50', p: 2, borderRadius: 2, mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                ✓ Offline access to your profile<br/>
                ✓ Fast loading and native app feel<br/>
                ✓ Push notifications for urgent requests<br/>
                ✓ No app store needed
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseDialog} color="inherit">
            Maybe Later
          </Button>
          <Button 
            onClick={handleInstall} 
            variant="contained" 
            startIcon={<InstallIcon />}
            sx={{ borderRadius: 2 }}
          >
            Install Now
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Message */}
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={6000}
        onClose={() => setShowSuccessMessage(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSuccessMessage(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          Project RED has been installed successfully! You can now access it from your home screen.
        </Alert>
      </Snackbar>
    </>
  );
};

export default PWAInstallPrompt;
