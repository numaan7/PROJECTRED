import React, { useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Typography, Link } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import MainApp from './components/MainApp';
import PWAInstallPrompt from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import { registerSW } from './utils/pwa';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f', // Red color for blood theme
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function App() {
  useEffect(() => {
    // Register service worker for PWA functionality
    registerSW();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AuthProvider>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              minHeight: '100vh' 
            }}
          >
            {/* Offline Indicator */}
            <OfflineIndicator />
            
            <Box sx={{ flexGrow: 1 }}>
              <MainApp />
            </Box>
            
            {/* Footer */}
            <Box 
              component="footer" 
              sx={{ 
                py: 2, 
                px: 3, 
                mt: 'auto',
                backgroundColor: 'primary.main',
                color: 'white',
                textAlign: 'center'
              }}
            >
              <Typography variant="body2">
                Made with ❤️ by{' '}
                <Link 
                  href="https://in.linkedin.com/in/mohammed-numaan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'white',
                    
                    textDecoration: 'underline',
                    '&:hover': {
                      textDecoration: 'none'
                    }
                  }}
                >
                  Mohammed Numaan
                </Link>
              </Typography>
            </Box>
            
            {/* PWA Install Prompt */}
            <PWAInstallPrompt />
          </Box>
        </AuthProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
