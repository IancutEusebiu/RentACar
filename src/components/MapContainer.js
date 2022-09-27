import React from 'react'
import { GoogleMap,Marker, useJsApiLoader} from '@react-google-maps/api';
import '../style/Map.css';

function MapContainer() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBrPdbaW-Q6lJbLNjFiiv6GotgYYHT9l5Y"
  })

  return (
    <div className='map'> 
      {isLoaded ? (
      <GoogleMap
        mapContainerStyle={{width:"80%", height:"80%"}}
        center={{
          lat:45.75452590895437,
          lng:21.22581150972198
          
        }}
        zoom={15} 
      >
        <Marker position={{ lat: 45.75452590895437, lng: 21.22581150972198 }} label="Here"> </Marker>
      </GoogleMap>
  ) : <></>}
    </div>
  )
}

export default MapContainer
 
 