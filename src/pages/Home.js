import React from 'react'
import '../style/Home.css';
import poster from '../img/home.jpg';
import MapContainer from '../components/MapContainer';


 


function Home() {
 
  return (
    <div className='home'>
      <div className='poster'>
        <img src={poster} alt="poster"></img>
      </div>
      <div className='about'>
        <p>Fast & easy car rental services</p>
      </div>
      <div>
        
       
      </div>
      <div className='map'>
      <MapContainer />
      </div>
    </div>
  )
}

export default Home

 


