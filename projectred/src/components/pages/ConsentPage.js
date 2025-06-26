import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Alert,
  Divider,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
} from '@mui/material';
import { Security, Info, HealthAndSafety } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const ConsentPage = () => {
  const { updateUserData, userData } = useAuth();
  const [consents, setConsents] = useState({
    dataUsage: false,
    privacy: false,
    guidelines: false,
    publicProfile: false,
  });
  const [loading, setLoading] = useState(false);

  const handleConsentChange = (event) => {
    setConsents({
      ...consents,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = async () => {
    if (!consents.dataUsage || !consents.privacy || !consents.guidelines) {
      return;
    }

    try {
      setLoading(true);
      await updateUserData({
        consentGiven: true,
        isPublic: consents.publicProfile,
        consentDetails: {
          dataUsage: consents.dataUsage,
          privacy: consents.privacy,
          guidelines: consents.guidelines,
          publicProfile: consents.publicProfile,
          consentDate: new Date(),
        },
      });
    } catch (error) {
      console.error('Error updating consent:', error);
    } finally {
      setLoading(false);
    }
  };

  const allRequiredConsentsGiven = consents.dataUsage && consents.privacy && consents.guidelines;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box textAlign="center" mb={4}>
          <Security color="primary" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h4" gutterBottom color="primary">
            Privacy and Consent
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your privacy and safety are our top priorities
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            Welcome, <strong>{userData?.name}</strong>! Before you can use ProjectRed, 
            please review and agree to our privacy and data usage policies.
          </Typography>
        </Alert>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <Info color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                How We Protect Your Information
              </Typography>
            </Box>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="Secure Data Storage"
                  secondary="Your personal information is encrypted and stored securely in compliance with data protection standards"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Limited Data Sharing"
                  secondary="We act as an intermediary - your contact details are never publicly displayed without explicit consent"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Purpose Limitation"
                  secondary="Your data is used exclusively for blood donation coordination and emergency medical purposes"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Right to Control"
                  secondary="You can update your privacy preferences, modify your information, or delete your account at any time"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box display="flex" alignItems="center" mb={2}>
              <HealthAndSafety color="primary" sx={{ mr: 1 }} />
              <Typography variant="h6" color="primary">
                Medical Guidelines Compliance
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              ProjectRed follows guidelines established by:
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText 
                  primary="National Blood Transfusion Council (NBTC)"
                  secondary="Ensuring safe blood collection and transfusion practices"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="National AIDS Control Organisation (NACO)"
                  secondary="Following protocols for donor screening and blood safety"
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Required Consents
        </Typography>

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={consents.dataUsage}
                onChange={handleConsentChange}
                name="dataUsage"
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I consent to the collection and use of my personal information for blood donation coordination purposes only
              </Typography>
            }
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={consents.privacy}
                onChange={handleConsentChange}
                name="privacy"
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I understand that my data will be kept secure and that I can update my privacy preferences at any time
              </Typography>
            }
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={consents.guidelines}
                onChange={handleConsentChange}
                name="guidelines"
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I acknowledge that I will follow NBTC and NACO guidelines regarding blood donation eligibility and safety
              </Typography>
            }
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Optional Consent
        </Typography>

        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={consents.publicProfile}
                onChange={handleConsentChange}
                name="publicProfile"
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                I consent to making my profile visible to other users for blood donation requests 
                (only basic information like blood group, city, and availability status will be shown)
              </Typography>
            }
          />
          <Typography variant="caption" color="text.secondary" display="block" sx={{ ml: 4 }}>
            Note: Even with this consent, your phone number and email will never be publicly displayed. 
            Contact will be facilitated through the platform.
          </Typography>
        </Box>

        <Box textAlign="center">
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={!allRequiredConsentsGiven || loading}
            sx={{ minWidth: 200 }}
          >
            {loading ? 'Saving...' : 'Continue to Profile Setup'}
          </Button>
        </Box>

        {!allRequiredConsentsGiven && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            Please agree to all required consents to continue.
          </Alert>
        )}
      </Paper>
    </Container>
  );
};

export default ConsentPage;
