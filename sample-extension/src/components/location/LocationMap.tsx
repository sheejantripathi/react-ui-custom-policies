import * as React from 'react';
import Map from 'react-map-gl';

function CustomMap() {
  const [viewState, setViewState] = React.useState({
    longitude: -100,
    latitude: 40,
    zoom: 5
  });

  return <Map
  mapboxAccessToken="pk.eyJ1Ijoic2hlZWphbnRyaXBhdGhpIiwiYSI6ImNsbHhtdG00NjAzbnMza24xbDJveXYxczMifQ.gU8v3Dn8wO3FZXasBioA-g"
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    mapStyle="mapbox://styles/mapbox/outdoors-v12"
  />;
}

export default CustomMap;