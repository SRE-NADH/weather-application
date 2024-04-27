import React, { useEffect, useState } from 'react';
import './style.css'
import { CiLocationOn } from "react-icons/ci";
import Loader from '../Loader/Loader';
import { weatherObj,findWeather,getDateAndTime } from '../../utils/utils';
import { FaSearch } from "react-icons/fa";



const WeatherToday = ({latitude,longitude,location,setLocation}) => {
const [Weatherdata,setWeatherData] = useState(null);
const [loading,setLoading] = useState(false);
const [val,setValue] = useState(''); // control search value for setiing location

// let apikey = '170c2ece549fea3609a4076df2c9fb0a';
// useEffect(()=>{
// const fetchNewData = async()=>{
//  try{
//    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`);
//    let data = await res.json();
//    console.log(data);
//  }
//  catch(error){
//   console.log(error)
//  }
// }  
// fetchNewData();
// },[]);

// triger fetch api when clicking enter
useEffect(() => {
  const handleKeyPress = (event) => {
    // check the enterd key 
    if (event.key === 'Enter') {
      if(val){
        // which trigger the api call to fetch weather data
        setLocation(val);
      } 
    }
  };

  document.addEventListener('keydown', handleKeyPress);
  // Clean up event listener when component unmounts
  return () => {
    document.removeEventListener('keydown', handleKeyPress);
  };
}, [val]); 

function handleValue(e){
  setValue(e.target.value);
  console.log(val);
}

  // fetch realtime data using laltitude and longitude or using location
 async function fetchReltimeWeather(location){
   if(Weatherdata!==null && !location) return;// controlling unwanted call
   setLoading(true);
    try{
      let response=null;
      if(location) response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU`);
      else response = await fetch(`https://api.tomorrow.io/v4/weather/realtime?location=${latitude},${longitude}&apikey=2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU`);
   let data = await response.json();
   console.log(data);
   if(data.code){
    setWeatherData(null);
    window.alert('try again later');
   }
   else{
    setWeatherData(data);
    setLoading(false);
   }
    }
    catch(error){
       window.alert(error.message);
    }
  }

  // only trigger when location changes
  useEffect(()=>{
    if(location) fetchReltimeWeather(location);
  },[location])
 
  // get realtime data in current place
  useEffect(()=>{
     if(longitude || latitude) fetchReltimeWeather();
  },[longitude,latitude])


  // hanndle onclick on search button
  function handleSearch(){
   if(val){
    setLocation(val);
   }
  }



  return (
    <div className='weather-today'>
      <div className='search' ><CiLocationOn/><input type='text' onChange={handleValue} /> <button id='search-button' onClick={handleSearch} ><FaSearch/></button> </div>
      
      {(loading || Weatherdata===null) ?<Loader/>:<>
       <p id='loc'>{Weatherdata.location.name}</p>
       <p id='date'>{getDateAndTime(Weatherdata.data.time)}</p>
       <div className='sunny-icon'>
       <img src={weatherObj[findWeather(Weatherdata.data.values.weatherCode)]} width={100}></img>
       <p>{findWeather(Weatherdata.data.values.weatherCode)}</p>
     </div>
      <p id='temparature-logo'>{Weatherdata.data.values.temperature}°C</p>
      <div className='weather-data'>
      <div><p>Humidity</p><p>{Weatherdata.data.values.humidity}</p></div>
      <div><p>Pressure</p><p>{Weatherdata.data.values.pressureSurfaceLevel}</p></div>
      <div><p>U V index</p><p>{Weatherdata.data.values.uvIndex}</p></div>
      <div><p>Wind speed</p><p>{Weatherdata.data.values.windSpeed}</p></div>
      <div><p>Wind direction</p><p>{Weatherdata.data.values.windDirection}</p></div>
      <div><p>Visibility</p><p>{Weatherdata.data.values.visibility}</p></div>
    </div>
      </>}
    </div>
  )
}

export default WeatherToday