import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Alert,
  Divider,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Avatar,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Person, Phone, LocationOn, Bloodtype } from '@mui/icons-material';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Timestamp } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { getCityFromPincode, isValidPincode, POPULAR_CITIES } from '../../services/pincodeService';

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

const ProfilePage = ({ isInitialSetup = false }) => {
  const { user, userData, updateUserData } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    pincode: '',
    bloodGroup: '',
    dateOfBirth: null,
    weight: '',
    lastDonation: null,
    medicalConditions: '',
    emergencyContact: '',
    isPublic: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [cityOptions, setCityOptions] = useState(POPULAR_CITIES);

  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        phone: userData.phone || '',
        city: userData.city || '',
        state: userData.state || '',
        pincode: userData.pincode || '',
        bloodGroup: userData.bloodGroup || '',
        dateOfBirth: userData.dateOfBirth ? 
          (userData.dateOfBirth.seconds ? new Date(userData.dateOfBirth.seconds * 1000) : new Date(userData.dateOfBirth)) 
          : null,
        weight: userData.weight || '',
        lastDonation: userData.lastDonation ? 
          (userData.lastDonation.seconds ? new Date(userData.lastDonation.seconds * 1000) : new Date(userData.lastDonation)) 
          : null,
        medicalConditions: userData.medicalConditions || '',
        emergencyContact: userData.emergencyContact || '',
        isPublic: userData.isPublic || false,
      });
    }
  }, [userData]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Handle pincode change to auto-fill city
    if (name === 'pincode' && isValidPincode(value)) {
      handlePincodeChange(value);
    }
  };

  const handlePincodeChange = async (pincode) => {
    if (!isValidPincode(pincode)) return;
    
    try {
      setPincodeLoading(true);
      const result = await getCityFromPincode(pincode);
      
      if (result) {
        setFormData(prev => ({
          ...prev,
          city: result.city,
          state: result.state
        }));
        setSuccess(`Auto-filled: ${result.city}, ${result.state}`);
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      console.error('Error fetching city from pincode:', error);
    } finally {
      setPincodeLoading(false);
    }
  };

  const handleSwitchChange = (event) => {
    setFormData(prev => ({
      ...prev,
      [event.target.name]: event.target.checked
    }));
  };

  const handleDateChange = (name) => (date) => {
    setFormData(prev => ({
      ...prev,
      [name]: date
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.phone) return 'Phone number is required';
    if (!formData.city.trim()) return 'City is required';
    if (!formData.state) return 'State is required';
    if (!formData.pincode.trim()) return 'Pincode is required';
    if (!formData.bloodGroup) return 'Blood group is required';
    if (!isValidPincode(formData.pincode)) {
      return 'Please enter a valid 6-digit pincode';
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Prepare data for Firestore - convert dates to Timestamps
      const updateData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth ? Timestamp.fromDate(new Date(formData.dateOfBirth)) : null,
        lastDonation: formData.lastDonation ? Timestamp.fromDate(new Date(formData.lastDonation)) : null,
        eligibleToDonate: calculateEligibility(formData.lastDonation, formData.weight),
      };

      await updateUserData(updateData);
      setSuccess('Profile updated successfully!');
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateEligibility = (lastDonation, weight) => {
    // Basic eligibility check - donor must wait 3 months between donations
    // and weigh at least 50kg
    if (weight && parseFloat(weight) < 50) return false;
    
    if (lastDonation) {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      return new Date(lastDonation) <= threeMonthsAgo;
    }
    
    return true; // Eligible if no previous donation recorded
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            src={user?.photoURL}
            sx={{ width: 80, height: 80, mr: 3 }}
          >
            <Person />
          </Avatar>
          <Box>
            <Typography variant="h4" gutterBottom>
              {isInitialSetup ? 'Complete Your Profile' : 'Profile Settings'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isInitialSetup 
                ? 'Please provide your information to help connect with blood recipients'
                : 'Update your information and privacy preferences'
              }
            </Typography>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  <Person sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Blood Group</InputLabel>
                  <Select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleInputChange}
                    label="Blood Group"
                  >
                    {BLOOD_GROUPS.map((group) => (
                      <MenuItem key={group} value={group}>
                        {group}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                  onChange={handleDateChange('dateOfBirth')}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                  maxDate={dayjs()}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleInputChange}
                  variant="outlined"
                  helperText="Minimum 50kg required for donation"
                />
              </Grid>

              {/* Contact Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  <Phone sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Contact Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Phone Number *
                  </Typography>
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="IN"
                    value={formData.phone}
                    onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                    style={{
                      width: '100%',
                      height: '56px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      padding: '0 14px',
                      fontSize: '16px'
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Contact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  variant="outlined"
                  helperText="Alternative contact number"
                />
              </Grid>

              {/* Location Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  <LocationOn sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Location Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  options={cityOptions}
                  value={formData.city}
                  onChange={(event, newValue) => {
                    setFormData(prev => ({
                      ...prev,
                      city: newValue || ''
                    }));
                  }}
                  onInputChange={(event, newInputValue) => {
                    // Filter cities based on input
                    const filtered = POPULAR_CITIES.filter(city =>
                      city.toLowerCase().includes(newInputValue.toLowerCase())
                    );
                    setCityOptions(filtered.slice(0, 20));
                  }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="City"
                      required
                      variant="outlined"
                      helperText="Type to search or select from popular cities"
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>State</InputLabel>
                  <Select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    label="State"
                  >
                    {INDIAN_STATES.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  inputProps={{ maxLength: 6 }}
                  helperText="Enter 6-digit pincode to auto-fill city and state"
                  InputProps={{
                    endAdornment: pincodeLoading ? (
                      <CircularProgress size={20} />
                    ) : null
                  }}
                />
              </Grid>

              {/* Medical Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  <Bloodtype sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Medical Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Last Donation Date"
                  value={formData.lastDonation ? dayjs(formData.lastDonation) : null}
                  onChange={handleDateChange('lastDonation')}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                  maxDate={dayjs()}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Medical Conditions"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  helperText="Please mention any medical conditions, allergies, or medications (optional)"
                />
              </Grid>

              {/* Privacy Settings */}
              <Grid item xs={12}>
                <Card variant="outlined" sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Privacy Settings
                    </Typography>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.isPublic}
                          onChange={handleSwitchChange}
                          name="isPublic"
                          color="primary"
                        />
                      }
                      label="Make my profile visible to other users"
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      When enabled, other users can see your blood group, city, and availability status. 
                      Your contact information will never be publicly displayed.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" sx={{ mt: 3 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ minWidth: 200 }}
                  >
                    {loading ? 'Saving...' : (isInitialSetup ? 'Complete Setup' : 'Update Profile')}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
