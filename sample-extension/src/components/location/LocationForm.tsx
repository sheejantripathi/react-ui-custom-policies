import React, { useState } from 'react';
// import LocationInput from './LocationInput'; // Assuming you have a separate LocationInput component for map selection
import CustomMap from './LocationMap'; // Assuming you have a separate LocationMap component for map selection

function LocationRestrictionForm() {
  // State to store user inputs
  const [location, setLocation] = useState('');
  
  // Function to handle location input change
  const handleLocationChange = (newLocation: any) => {
    setLocation(newLocation);
  };

  

  // Function to handle form submission
//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     // Here, you can send the location and restrictionType data to your backend for processing.
//     // Your backend would then enforce the access restrictions based on this data.
//     // For simplicity, we'll just log the data here.
//     console.log('Location:', location);
//     console.log('Restriction Type:', restrictionType);
//   };

  return (
    <div>
      <h2>Define Access Restrictions Based on Location</h2>
      {/* <form onSubmit={handleSubmit}> */}
        <div>
          <label htmlFor="locationInput">Location:</label>
          <input
            type="text"
            id="locationInput"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            placeholder="Enter location (e.g., coordinates or region)"
          />
        </div>
        <div>
          <label>OR</label>
        </div>
        <div>
          <label>Select an Area on the Map:</label>
          <div style={{ width: '100%', height: '400px' }}>
          <CustomMap />
          </div>      
        </div>
        {/* <div>
          <label>Restriction Type:</label>
          <select value={restrictionType} onChange={handleRestrictionTypeChange}>
            <option value="allow">Allow Access</option>
            <option value="deny">Deny Access</option>
          </select>
        </div> */}
      {/* </form> */}
    </div>
  );
}

export default LocationRestrictionForm;
