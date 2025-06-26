import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import {
  Google as GoogleIcon,
  Security,
  VolunteerActivism,
  Group,
  LocalHospital,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const LoginPage = () => {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      await signInWithGoogle();
    } catch (error) {
      setError('Failed to sign in. Please try again.');
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        minHeight="80vh"
        justifyContent="center"
      >
        {/* Header */}
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          color="primary"
          fontWeight="bold"
          textAlign="center"
        >
          ProjectRed
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          gutterBottom
          textAlign="center"
          sx={{ mb: 4 }}
        >
          Connecting Blood Donors to Save Lives
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={4}
          width="100%"
          maxWidth="1000px"
        >
          {/* Login Card */}
          <Paper elevation={3} sx={{ p: 4, flex: 1, maxWidth: 400 }}>
            <Typography variant="h5" gutterBottom textAlign="center">
              Join Our Community
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
              Sign in with Google to get started
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={loading}
              sx={{ mb: 3 }}
            >
              {loading ? 'Signing in...' : 'Sign in with Google'}
            </Button>

            <Divider sx={{ my: 2 }} />

            <Typography variant="caption" color="text.secondary" textAlign="center" display="block">
              By signing in, you agree to our privacy policy and terms of service.
              Your data is protected and will only be used for blood donation coordination.
            </Typography>
          </Paper>

          {/* Features Card */}
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary">
                Why Join ProjectRed?
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <VolunteerActivism color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Save Lives"
                    secondary="Connect with people who need your blood type in emergencies"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Privacy Protected"
                    secondary="Your information is secure and shared only with your consent"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Group color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Community Driven"
                    secondary="Join a network of verified blood donors in your area"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocalHospital color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Guidelines Compliant"
                    secondary="Following NBTC and NACO standards for safe blood donation"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Box>

        {/* Important Notice */}
        <Alert severity="info" sx={{ mt: 4, maxWidth: 800 }}>
          <Typography variant="body2">
            <strong>Important:</strong> This platform follows guidelines from the National Blood Transfusion Council (NBTC) 
            and National AIDS Control Organisation (NACO). We prioritize donor safety and recipient well-being. 
            Please ensure you meet the eligibility criteria before registering as a donor.
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
};

export default LoginPage;
