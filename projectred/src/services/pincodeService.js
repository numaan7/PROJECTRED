// Indian Pincode to City mapping service
// Using a comprehensive pincode database for Indian cities

const PINCODE_CITY_MAPPING = {
  // Major Cities - Sample data (in a real app, you'd have a complete database)
  // Delhi
  "110001": { city: "New Delhi", state: "Delhi" },
  "110002": { city: "New Delhi", state: "Delhi" },
  "110003": { city: "New Delhi", state: "Delhi" },
  "110004": { city: "New Delhi", state: "Delhi" },
  "110005": { city: "New Delhi", state: "Delhi" },
  "110006": { city: "New Delhi", state: "Delhi" },
  "110007": { city: "New Delhi", state: "Delhi" },
  "110008": { city: "New Delhi", state: "Delhi" },
  "110009": { city: "New Delhi", state: "Delhi" },
  "110010": { city: "New Delhi", state: "Delhi" },
  "110011": { city: "New Delhi", state: "Delhi" },
  "110012": { city: "New Delhi", state: "Delhi" },
  "110013": { city: "New Delhi", state: "Delhi" },
  "110014": { city: "New Delhi", state: "Delhi" },
  "110015": { city: "New Delhi", state: "Delhi" },
  "110016": { city: "New Delhi", state: "Delhi" },
  "110017": { city: "New Delhi", state: "Delhi" },
  "110018": { city: "New Delhi", state: "Delhi" },
  "110019": { city: "New Delhi", state: "Delhi" },
  "110020": { city: "New Delhi", state: "Delhi" },
  "110021": { city: "New Delhi", state: "Delhi" },
  "110022": { city: "New Delhi", state: "Delhi" },
  "110023": { city: "New Delhi", state: "Delhi" },
  "110024": { city: "New Delhi", state: "Delhi" },
  "110025": { city: "New Delhi", state: "Delhi" },
  "110026": { city: "New Delhi", state: "Delhi" },
  "110027": { city: "New Delhi", state: "Delhi" },
  "110028": { city: "New Delhi", state: "Delhi" },
  "110029": { city: "New Delhi", state: "Delhi" },
  "110030": { city: "New Delhi", state: "Delhi" },
  
  // Mumbai
  "400001": { city: "Mumbai", state: "Maharashtra" },
  "400002": { city: "Mumbai", state: "Maharashtra" },
  "400003": { city: "Mumbai", state: "Maharashtra" },
  "400004": { city: "Mumbai", state: "Maharashtra" },
  "400005": { city: "Mumbai", state: "Maharashtra" },
  "400006": { city: "Mumbai", state: "Maharashtra" },
  "400007": { city: "Mumbai", state: "Maharashtra" },
  "400008": { city: "Mumbai", state: "Maharashtra" },
  "400009": { city: "Mumbai", state: "Maharashtra" },
  "400010": { city: "Mumbai", state: "Maharashtra" },
  "400011": { city: "Mumbai", state: "Maharashtra" },
  "400012": { city: "Mumbai", state: "Maharashtra" },
  "400013": { city: "Mumbai", state: "Maharashtra" },
  "400014": { city: "Mumbai", state: "Maharashtra" },
  "400015": { city: "Mumbai", state: "Maharashtra" },
  "400016": { city: "Mumbai", state: "Maharashtra" },
  "400017": { city: "Mumbai", state: "Maharashtra" },
  "400018": { city: "Mumbai", state: "Maharashtra" },
  "400019": { city: "Mumbai", state: "Maharashtra" },
  "400020": { city: "Mumbai", state: "Maharashtra" },
  
  // Bangalore
  "560001": { city: "Bangalore", state: "Karnataka" },
  "560002": { city: "Bangalore", state: "Karnataka" },
  "560003": { city: "Bangalore", state: "Karnataka" },
  "560004": { city: "Bangalore", state: "Karnataka" },
  "560005": { city: "Bangalore", state: "Karnataka" },
  "560006": { city: "Bangalore", state: "Karnataka" },
  "560007": { city: "Bangalore", state: "Karnataka" },
  "560008": { city: "Bangalore", state: "Karnataka" },
  "560009": { city: "Bangalore", state: "Karnataka" },
  "560010": { city: "Bangalore", state: "Karnataka" },
  "560011": { city: "Bangalore", state: "Karnataka" },
  "560012": { city: "Bangalore", state: "Karnataka" },
  "560013": { city: "Bangalore", state: "Karnataka" },
  "560014": { city: "Bangalore", state: "Karnataka" },
  "560015": { city: "Bangalore", state: "Karnataka" },
  "560016": { city: "Bangalore", state: "Karnataka" },
  "560017": { city: "Bangalore", state: "Karnataka" },
  "560018": { city: "Bangalore", state: "Karnataka" },
  "560019": { city: "Bangalore", state: "Karnataka" },
  "560020": { city: "Bangalore", state: "Karnataka" },
  
  // Chennai
  "600001": { city: "Chennai", state: "Tamil Nadu" },
  "600002": { city: "Chennai", state: "Tamil Nadu" },
  "600003": { city: "Chennai", state: "Tamil Nadu" },
  "600004": { city: "Chennai", state: "Tamil Nadu" },
  "600005": { city: "Chennai", state: "Tamil Nadu" },
  "600006": { city: "Chennai", state: "Tamil Nadu" },
  "600007": { city: "Chennai", state: "Tamil Nadu" },
  "600008": { city: "Chennai", state: "Tamil Nadu" },
  "600009": { city: "Chennai", state: "Tamil Nadu" },
  "600010": { city: "Chennai", state: "Tamil Nadu" },
  
  // Kolkata
  "700001": { city: "Kolkata", state: "West Bengal" },
  "700002": { city: "Kolkata", state: "West Bengal" },
  "700003": { city: "Kolkata", state: "West Bengal" },
  "700004": { city: "Kolkata", state: "West Bengal" },
  "700005": { city: "Kolkata", state: "West Bengal" },
  "700006": { city: "Kolkata", state: "West Bengal" },
  "700007": { city: "Kolkata", state: "West Bengal" },
  "700008": { city: "Kolkata", state: "West Bengal" },
  "700009": { city: "Kolkata", state: "West Bengal" },
  "700010": { city: "Kolkata", state: "West Bengal" },
  
  // Hyderabad
  "500001": { city: "Hyderabad", state: "Telangana" },
  "500002": { city: "Hyderabad", state: "Telangana" },
  "500003": { city: "Hyderabad", state: "Telangana" },
  "500004": { city: "Hyderabad", state: "Telangana" },
  "500005": { city: "Hyderabad", state: "Telangana" },
  "500006": { city: "Hyderabad", state: "Telangana" },
  "500007": { city: "Hyderabad", state: "Telangana" },
  "500008": { city: "Hyderabad", state: "Telangana" },
  "500009": { city: "Hyderabad", state: "Telangana" },
  "500010": { city: "Hyderabad", state: "Telangana" },
  
  // Pune
  "411001": { city: "Pune", state: "Maharashtra" },
  "411002": { city: "Pune", state: "Maharashtra" },
  "411003": { city: "Pune", state: "Maharashtra" },
  "411004": { city: "Pune", state: "Maharashtra" },
  "411005": { city: "Pune", state: "Maharashtra" },
  "411006": { city: "Pune", state: "Maharashtra" },
  "411007": { city: "Pune", state: "Maharashtra" },
  "411008": { city: "Pune", state: "Maharashtra" },
  "411009": { city: "Pune", state: "Maharashtra" },
  "411010": { city: "Pune", state: "Maharashtra" },
  
  // Ahmedabad
  "380001": { city: "Ahmedabad", state: "Gujarat" },
  "380002": { city: "Ahmedabad", state: "Gujarat" },
  "380003": { city: "Ahmedabad", state: "Gujarat" },
  "380004": { city: "Ahmedabad", state: "Gujarat" },
  "380005": { city: "Ahmedabad", state: "Gujarat" },
  "380006": { city: "Ahmedabad", state: "Gujarat" },
  "380007": { city: "Ahmedabad", state: "Gujarat" },
  "380008": { city: "Ahmedabad", state: "Gujarat" },
  "380009": { city: "Ahmedabad", state: "Gujarat" },
  "380010": { city: "Ahmedabad", state: "Gujarat" },
  
  // Jaipur
  "302001": { city: "Jaipur", state: "Rajasthan" },
  "302002": { city: "Jaipur", state: "Rajasthan" },
  "302003": { city: "Jaipur", state: "Rajasthan" },
  "302004": { city: "Jaipur", state: "Rajasthan" },
  "302005": { city: "Jaipur", state: "Rajasthan" },
  "302006": { city: "Jaipur", state: "Rajasthan" },
  "302007": { city: "Jaipur", state: "Rajasthan" },
  "302008": { city: "Jaipur", state: "Rajasthan" },
  "302009": { city: "Jaipur", state: "Rajasthan" },
  "302010": { city: "Jaipur", state: "Rajasthan" },
  
  // Lucknow
  "226001": { city: "Lucknow", state: "Uttar Pradesh" },
  "226002": { city: "Lucknow", state: "Uttar Pradesh" },
  "226003": { city: "Lucknow", state: "Uttar Pradesh" },
  "226004": { city: "Lucknow", state: "Uttar Pradesh" },
  "226005": { city: "Lucknow", state: "Uttar Pradesh" },
  "226006": { city: "Lucknow", state: "Uttar Pradesh" },
  "226007": { city: "Lucknow", state: "Uttar Pradesh" },
  "226008": { city: "Lucknow", state: "Uttar Pradesh" },
  "226009": { city: "Lucknow", state: "Uttar Pradesh" },
  "226010": { city: "Lucknow", state: "Uttar Pradesh" },
};

// Popular Indian cities for the dropdown
export const POPULAR_CITIES = [
  "New Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata", "Hyderabad", 
  "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", 
  "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", 
  "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", 
  "Kalyan-Dombivli", "Vasai-Virar", "Varanasi", "Srinagar", "Dhanbad", "Jodhpur", 
  "Amritsar", "Raipur", "Allahabad", "Coimbatore", "Jabalpur", "Gwalior", 
  "Vijayawada", "Madurai", "Gurgaon", "Navi Mumbai", "Aurangabad", "Solapur", 
  "Ranchi", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Warangal", 
  "Mira-Bhayandar", "Thiruvananthapuram", "Bhiwandi", "Saharanpur", "Guntur", 
  "Amravati", "Bikaner", "Noida", "Jamshedpur", "Bhilai Nagar", "Cuttack", 
  "Firozabad", "Kochi", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", 
  "Nanded", "Kolhapur", "Ajmer", "Gulbarga", "Jamnagar", "Ujjain", "Loni", 
  "Siliguri", "Jhansi", "Ulhasnagar", "Jammu", "Sangli-Miraj & Kupwad", 
  "Mangalore", "Erode", "Belgaum", "Ambattur", "Tirunelveli", "Malegaon", 
  "Gaya", "Jalgaon", "Udaipur", "Maheshtala"
].sort();

/**
 * Get city and state information from pincode
 * @param {string} pincode - 6 digit pincode
 * @returns {object|null} - {city, state} or null if not found
 */
export const getCityFromPincode = async (pincode) => {
  // First check local mapping
  if (PINCODE_CITY_MAPPING[pincode]) {
    return PINCODE_CITY_MAPPING[pincode];
  }
  
  // If not found in local mapping, try to use a free API
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    
    if (data && data[0] && data[0].Status === "Success" && data[0].PostOffice.length > 0) {
      const postOffice = data[0].PostOffice[0];
      return {
        city: postOffice.District,
        state: postOffice.State
      };
    }
  } catch (error) {
    console.log('API call failed, using local mapping only:', error);
  }
  
  return null;
};

/**
 * Validate pincode format
 * @param {string} pincode 
 * @returns {boolean}
 */
export const isValidPincode = (pincode) => {
  return /^\d{6}$/.test(pincode);
};

/**
 * Search cities by partial name
 * @param {string} searchTerm 
 * @returns {array} - Array of matching city names
 */
export const searchCities = (searchTerm) => {
  if (!searchTerm) return POPULAR_CITIES.slice(0, 20);
  
  const term = searchTerm.toLowerCase();
  return POPULAR_CITIES.filter(city => 
    city.toLowerCase().includes(term)
  ).slice(0, 20);
};
