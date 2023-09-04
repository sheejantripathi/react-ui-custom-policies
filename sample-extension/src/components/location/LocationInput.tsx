import React, { useState } from 'react';

interface LocationInputProps {
  onLocationChange: (location: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationChange }) => {
  const [location, setLocation] = useState('');

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleLocationSubmit = () => {
    onLocationChange(location);
  };

  return (
    <div>
      <input type="text" value={location} onChange={handleLocationChange} placeholder="Enter location" />
      <button onClick={handleLocationSubmit}>Submit</button>
    </div>
  );
};

export default LocationInput;
