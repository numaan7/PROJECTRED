import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  VolunteerActivism,
  People,
  Security,
  Phone,
  LocationOn,
  Bloodtype,
  Info,
  Person,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const HomePage = () => {
  const { user, userData } = useAuth();
  const [stats, setStats] = useState({
    totalDonors: 0,
    publicDonors: 0,
    yourBloodGroupDonors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Get total donors count
        const totalQuery = query(collection(db, 'users'));
        const totalSnapshot = await getDocs(totalQuery);
        
        // Get public donors count
        const publicQuery = query(
          collection(db, 'users'),
          where('isPublic', '==', true)
        );
        const publicSnapshot = await getDocs(publicQuery);
        
        // Get donors with same blood group
        let sameBloodGroupCount = 0;
        if (userData?.bloodGroup) {
          const bloodGroupQuery = query(
            collection(db, 'users'),
            where('bloodGroup', '==', userData.bloodGroup),
            where('isPublic', '==', true)
          );
          const bloodGroupSnapshot = await getDocs(bloodGroupQuery);
          sameBloodGroupCount = bloodGroupSnapshot.size;
        }

        setStats({
          totalDonors: totalSnapshot.size,
          publicDonors: publicSnapshot.size,
          yourBloodGroupDonors: sameBloodGroupCount,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userData?.bloodGroup]);

  const canDonateBloodGroups = (userBloodGroup) => {
    const compatibility = {
      'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      'O+': ['O+', 'A+', 'B+', 'AB+'],
      'A-': ['A-', 'A+', 'AB-', 'AB+'],
      'A+': ['A+', 'AB+'],
      'B-': ['B-', 'B+', 'AB-', 'AB+'],
      'B+': ['B+', 'AB+'],
      'AB-': ['AB-', 'AB+'],
      'AB+': ['AB+'],
    };
    return compatibility[userBloodGroup] || [];
  };

  const canReceiveFromBloodGroups = (userBloodGroup) => {
    const compatibility = {
      'O-': ['O-'],
      'O+': ['O-', 'O+'],
      'A-': ['O-', 'A-'],
      'A+': ['O-', 'O+', 'A-', 'A+'],
      'B-': ['O-', 'B-'],
      'B+': ['O-', 'O+', 'B-', 'B+'],
      'AB-': ['O-', 'A-', 'B-', 'AB-'],
      'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    };
    return compatibility[userBloodGroup] || [];
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Welcome back, {userData?.name || user?.displayName}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your contribution to saving lives makes a difference. Here's your dashboard overview.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <People color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    {loading ? '...' : stats.totalDonors}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Registered Donors
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <VolunteerActivism color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    {loading ? '...' : stats.publicDonors}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Available Public Donors
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <Bloodtype color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4" color="primary">
                    {loading ? '...' : stats.yourBloodGroupDonors}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {userData?.bloodGroup} Donors Available
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Profile Status */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Profile Status
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Person color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Name" 
                    secondary={userData?.name || 'Not set'}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Phone" 
                    secondary={userData?.phone || 'Not set'}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Location" 
                    secondary={
                      userData?.city && userData?.state 
                        ? `${userData.city}, ${userData.state}` 
                        : 'Not set'
                    }
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Bloodtype color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Blood Group" 
                    secondary={
                      <Box display="flex" alignItems="center">
                        {userData?.bloodGroup ? (
                          <Chip 
                            label={userData.bloodGroup} 
                            color="primary" 
                            size="small"
                          />
                        ) : (
                          'Not set'
                        )}
                      </Box>
                    }
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Privacy Setting" 
                    secondary={
                      userData?.isPublic 
                        ? 'Public Profile (Visible to others)'
                        : 'Private Profile (Not visible to others)'
                    }
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Blood Compatibility Info */}
        <Grid item xs={12} md={6}>
          {userData?.bloodGroup && (
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Blood Compatibility Information
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    You can donate to:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {canDonateBloodGroups(userData.bloodGroup).map((bg) => (
                      <Chip key={bg} label={bg} color="success" size="small" />
                    ))}
                  </Box>
                </Box>
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    You can receive from:
                  </Typography>
                  <Box display="flex" flexWrap="wrap" gap={1}>
                    {canReceiveFromBloodGroups(userData.bloodGroup).map((bg) => (
                      <Chip key={bg} label={bg} color="info" size="small" />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Important Guidelines */}
      <Paper sx={{ p: 3, mt: 3,mb:3, backgroundColor: '#fff3e0' }}>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Info color="warning" sx={{ mr: 1 }} />
          <Typography variant="h6" color="warning.dark">
            Important Blood Donation Guidelines
          </Typography>
        </Box>
        <Typography variant="body2" paragraph>
          • You must be 18-65 years old and weigh at least 50kg to donate blood
        </Typography>
        <Typography variant="body2" paragraph>
          • Wait at least 3-4 months between whole blood donations
        </Typography>
        <Typography variant="body2" paragraph>
          • Avoid alcohol 24 hours before donation and get adequate rest
        </Typography>
        <Typography variant="body2" paragraph>
          • Always donate at licensed blood banks following NBTC guidelines
        </Typography>
        <Typography variant="body2">
          • Consult with medical professionals before donating if you have any health conditions
        </Typography>
      </Paper>
    </Container>
  );
};

export default HomePage;
