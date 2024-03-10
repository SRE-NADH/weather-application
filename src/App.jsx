import { useState,useEffect } from 'react'
import './App.css'
import WeatherToday from './Components/WeatherToday/WeatherToday'
import WeatherForcast from './Components/Forcast/WeatherForcast'

function App() {
  const [latitude,setLatitude] = useState(0);
  const [longitude,setLongitude] = useState(0);
  const [location,setLocation] = useState('');

   // function to find logitude and laltitude
   function getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.log(error);
        }
      );}}
     


      // get location on initial rendering
      useEffect(()=>{
        getLocation();
      },[]);


  return (
   <div className='main'>
    <WeatherToday latitude={latitude} longitude={longitude} location={location} setLocation={setLocation} />
    <WeatherForcast latitude={latitude} longitude={longitude} location={location} />
   </div>
  )
}

export default App
