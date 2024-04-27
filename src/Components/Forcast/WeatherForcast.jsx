import React, { useEffect, useState } from 'react';
import sunnyImage from '../../assets/sunny_979585.png';
import './style.css';
import Loader from '../Loader/Loader';
import { weatherObj,findWeather,getDateAndTime } from '../../utils/utils';


const WeatherForcast = ({latitude,longitude,location}) => {
 const [loading,setLoading] = useState(false);
 const [forcastData,setForcastData] = useState([]);// control forcast data
 const [error,setError] = useState('');
 
 // keep track of index for display daily data
 const [index,setIndex] = useState(0);


  useEffect(()=>{
    if(location) fetchForcastData(location);
  },[location])

 //function to fetch forcast data 
 async function fetchForcastData(location){
  if(forcastData.length>0 && !location) return;
  setLoading(true);
  
  try{
    let response=null;
   if(location)  response  = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${location}&timesteps=1d&apikey=2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU`);
   else  response  = await fetch(`https://api.tomorrow.io/v4/weather/forecast?location=${latitude},${longitude}&timesteps=1d&apikey=2aj7QwO7BAn76KjXQ6V8Ww5QMcPefSJU`);

    
    let data = await response.json();
    if(!data.code){
      setLoading(false);
      let tmpData = data.timelines.daily;
      tmpData.splice(0,1)
      setForcastData(tmpData);
    }
    else{
      setError('failed to fetch forcast data');
    }
  }
  catch(error){
    console.log(error)
  }
  


 }

 // trigger api call initialy
 useEffect(()=>{
    if(latitude || longitude) fetchForcastData();
 },[latitude,longitude]);


 if(loading){
  return(
    <div className='loader-container'>
      <div>{error}</div>
      <Loader/>
    </div>
  )
 }

  return (
    <div className='weather-forcast'>
      <h1>Forcast Report</h1>
      <div className='daily-forcasts-container'>

        {forcastData.length>0 && forcastData.map((item,ind)=>(
             <div key={ind} onClick={()=>{setIndex(ind)}}  className={ind===index?'forcast-grid xex':'forcast-grid'}>
             <p id='date'>{getDateAndTime(item.time)}</p>
               <div className='tmp-div'>
                <p>{item.values.temperatureApparentAvg}°C</p>
                <div><img src={weatherObj[findWeather(item.values.weatherCodeMin)]} width={30} />
                <p id='type' >{findWeather(item.values.weatherCodeMin)}</p>
                </div>        
               </div>
           </div>
        ))}

      </div>
  {forcastData.length>0 && <div className='daily-data-container'>
    <h2>{getDateAndTime(forcastData[index].time)}</h2>
     <div className='daily-data' >
      <div className='flex-data'>
        <div>
           <p>Temparature</p>
           <p>{forcastData[index].values.temperatureApparentAvg}</p>
         </div>
         <div>
           <p>Humidity</p>
           <p>{forcastData[index].values.humidityAvg}</p>
         </div>
         <div>
           <p>Visibility</p>
           <p>{forcastData[index].values.visibilityAvg}</p>
         </div>
         <div>
           <p>Wind Speed</p>
           <p>{forcastData[index].values.windSpeedAvg}</p>
         </div>
         <div>
           <p>Pressure</p>
           <p>{forcastData[index].values.pressureSurfaceLevelAvg}</p>
         </div>
       </div>

      <div className='image-container'>
         <p>{findWeather(forcastData[index].values.weatherCodeMin)}</p>
         <img src={weatherObj[findWeather(forcastData[index].values.weatherCodeMin)]} width={100}/>
      </div>

     </div>
   </div>}
   
    </div>
  )
}

export default WeatherForcast;