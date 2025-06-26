import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Alert,
  CircularProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  Search,
  LocationOn,
  Phone,
  Person,
  Bloodtype,
  FilterList,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebase/config';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const DonorSearchPage = () => {
  const { userData } = useAuth();
  const [filters, setFilters] = useState({
    bloodGroup: '',
    state: '',
    city: '',
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleFilterChange = (field) => (event) => {
    setFilters(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const searchDonors = async () => {
    setLoading(true);
    setHasSearched(true);
    
    try {
      let q = query(
        collection(db, 'users'),
        where('isPublic', '==', true)
      );

      // Add filters
      if (filters.bloodGroup) {
        q = query(q, where('bloodGroup', '==', filters.bloodGroup));
      }
      if (filters.state) {
        q = query(q, where('state', '==', filters.state));
      }
      if (filters.city) {
        q = query(q, where('city', '==', filters.city));
      }

      const querySnapshot = await getDocs(q);
      const donors = [];
      
      querySnapshot.forEach((doc) => {
        const donorData = doc.data();
        // Don't include current user in results
        if (doc.id !== userData?.uid) {
          donors.push({
            id: doc.id,
            ...donorData
          });
        }
      });

      setSearchResults(donors);
    } catch (error) {
      console.error('Error searching donors:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      bloodGroup: '',
      state: '',
      city: '',
    });
    setSearchResults([]);
    setHasSearched(false);
  };

  const getCompatibleBloodGroups = (userBloodGroup) => {
    const compatibility = {
      'O+': ['O+', 'O-'],
      'O-': ['O-'],
      'A+': ['A+', 'A-', 'O+', 'O-'],
      'A-': ['A-', 'O-'],
      'B+': ['B+', 'B-', 'O+', 'O-'],
      'B-': ['B-', 'O-'],
      'AB+': ['AB+', 'AB-', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-'],
      'AB-': ['AB-', 'A-', 'B-', 'O-'],
    };
    return compatibility[userBloodGroup] || [];
  };

  const suggestedBloodGroups = userData?.bloodGroup 
    ? getCompatibleBloodGroups(userData.bloodGroup)
    : [];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary">
          Find Blood Donors
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search for blood donors in your area. All results show only donors who have consented to share their information publicly.
        </Typography>
      </Box>

      {/* Privacy Notice */}
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>Privacy Protection:</strong> Only donors who have explicitly agreed to share their contact information publicly will appear in search results. Contact details are protected and you should use this platform responsibly.
        </Typography>
      </Alert>

      {/* Suggested Blood Groups */}
      {suggestedBloodGroups.length > 0 && (
        <Paper sx={{ p: 2, mb: 3, backgroundColor: '#e8f5e8' }}>
          <Typography variant="subtitle1" gutterBottom>
            Compatible blood groups for {userData?.bloodGroup}:
          </Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {suggestedBloodGroups.map((bg) => (
              <Chip 
                key={bg} 
                label={bg} 
                color="success" 
                size="small"
                onClick={() => setFilters(prev => ({ ...prev, bloodGroup: bg }))}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Box>
        </Paper>
      )}

      {/* Search Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <FilterList color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Search Filters</Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>Blood Group</InputLabel>
                <Select
                  value={filters.bloodGroup}
                  onChange={handleFilterChange('bloodGroup')}
                  label="Blood Group"
                >
                  <MenuItem value="">All Blood Groups</MenuItem>
                  {BLOOD_GROUPS.map((bg) => (
                    <MenuItem key={bg} value={bg}>
                      {bg}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  value={filters.state}
                  onChange={handleFilterChange('state')}
                  label="State"
                >
                  <MenuItem value="">All States</MenuItem>
                  {INDIAN_STATES.map((state) => (
                    <MenuItem key={state} value={state}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="City"
                value={filters.city}
                onChange={handleFilterChange('city')}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Search />}
              onClick={searchDonors}
              disabled={loading}
            >
              {loading ? 'Searching...' : 'Search Donors'}
            </Button>
            <Button
              variant="outlined"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Search Results */}
      {loading && (
        <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {hasSearched && !loading && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Search Results ({searchResults.length} donors found)
            </Typography>
            
            {searchResults.length === 0 ? (
              <Alert severity="warning">
                No donors found matching your criteria. Try adjusting your filters or searching in nearby areas.
              </Alert>
            ) : (
              <List>
                {searchResults.map((donor) => (
                  <React.Fragment key={donor.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar src={donor.photoURL}>
                          {donor.name?.charAt(0) || <Person />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" alignItems="center" gap={1}>
                            <Typography variant="h6">
                              {donor.name || 'Anonymous Donor'}
                            </Typography>
                            <Chip 
                              label={donor.bloodGroup} 
                              color="primary" 
                              size="small"
                              icon={<Bloodtype />}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Box display="flex" alignItems="center" sx={{ mb: 0.5 }}>
                              <LocationOn fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {donor.city}, {donor.state} - {donor.pincode}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                              <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {donor.phone}
                              </Typography>
                            </Box>
                            {donor.lastDonation && (
                              <Typography variant="caption" color="text.secondary">
                                Last donation: {new Date(donor.lastDonation.toDate()).toLocaleDateString()}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItem>
                    {searchResults.indexOf(donor) < searchResults.length - 1 && (
                      <Box sx={{ mx: 2 }}>
                        <Box sx={{ height: 1, backgroundColor: 'divider' }} />
                      </Box>
                    )}
                  </React.Fragment>
                ))}
              </List>
            )}
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <Paper sx={{ p: 3, mt: 3, backgroundColor: '#fff3e0' }}>
        <Typography variant="h6" gutterBottom color="warning.dark">
          Important Guidelines
        </Typography>
        <Typography variant="body2" paragraph>
          • Always verify donor information and contact them through proper channels
        </Typography>
        <Typography variant="body2" paragraph>
          • Encourage donations only at licensed blood banks following NBTC guidelines
        </Typography>
        <Typography variant="body2" paragraph>
          • Respect donor privacy and use contact information responsibly
        </Typography>
        <Typography variant="body2">
          • In emergency situations, contact nearby hospitals and blood banks directly
        </Typography>
      </Paper>
    </Container>
  );
};

export default DonorSearchPage;
