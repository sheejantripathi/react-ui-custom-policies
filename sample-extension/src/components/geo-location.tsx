import React, { useState } from "react";

interface GeolocationRangeInputProps {
  onSave: (range: GeolocationRange) => any;
}

interface GeolocationRange {
  minLatitude: string;
  maxLatitude: string;
  minLongitude: string;
  maxLongitude: string;
}

function GeolocationRangeInput({ onSave }: GeolocationRangeInputProps) {
  const [range, setRange] = useState<GeolocationRange>({
    minLatitude: "",
    maxLatitude: "",
    minLongitude: "",
    maxLongitude: "",
  });

  const handleSave = () => {
    // Validate the input before saving
    if (isValidRange(range)) {
      onSave(range);
      setRange({
        minLatitude: "",
        maxLatitude: "",
        minLongitude: "",
        maxLongitude: "",
      });
    } else {
      alert("Invalid geolocation range. Please check your inputs.");
    }
  };

  const isValidRange = (range: GeolocationRange): boolean => {
    // Add your validation logic here
    // For example, ensure that the min values are less than max values
    return (
      parseFloat(range.minLatitude) < parseFloat(range.maxLatitude) &&
      parseFloat(range.minLongitude) < parseFloat(range.maxLongitude)
    );
  };

  return (
    <div>
      <div>
        <label>Min Latitude: </label>
        <input
          type="text"
          value={range.minLatitude}
          onChange={(e) => setRange({ ...range, minLatitude: e.target.value })}
        />
      </div>
      <div>
        <label>Max Latitude: </label>
        <input
          type="text"
          value={range.maxLatitude}
          onChange={(e) => setRange({ ...range, maxLatitude: e.target.value })}
        />
      </div>
      <div>
        <label>Min Longitude: </label>
        <input
          type="text"
          value={range.minLongitude}
          onChange={(e) => setRange({ ...range, minLongitude: e.target.value })}
        />
      </div>
      <div>
        <label>Max Longitude: </label>
        <input
          type="text"
          value={range.maxLongitude}
          onChange={(e) => setRange({ ...range, maxLongitude: e.target.value })}
        />
      </div>
      <button onClick={handleSave}>Save Range</button>
    </div>
  );
}

export default GeolocationRangeInput;
