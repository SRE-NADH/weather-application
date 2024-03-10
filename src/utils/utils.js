
import SunnyImage from '../assets/sunny_979585.png';
import cloudyImage from '../assets/weather_11356931.png';
import FogImage from '../assets/fog.png';
import RainImage from '../assets/rain.png';
import SnowImage from '../assets/snow.png';
import MixedImage from '../assets/mixed.png';
import FreezingRainImage from '../assets/freezingrain.png';
import IcePallette from '../assets/icepalette.png';
import Thunder from '../assets/storm.png'




// function to find type of weather according to weather code
function findWeather(code){
    switch(code){
      case 1000:
      case 1100: 
        return 'Clear';
      case 1102: 
      case 1101:
      case 1001:
        return 'Cloudy';
       case 2100:
       case 2000: 
         return 'Fog';
       case 4000:
       case 4001:
       case 4200:
       case 4201:
         return 'Rain';
      case 5000:
      case 5001:
      case 5100:
      case 5101:
        return 'Snow';
      case 6000:
      case 6001:
      case 6200:
      case 6201:
        return 'Freezing Rain'
      case 7000:
      case 7101:
      case 7102:
        return 'IcePellets';
     case 8000:
        return 'ThunderStorm' 
     default:
        return 'Mixed weather'
    }
  }

  // an obj which contain type of weather and appropriate image as key value pairs
  let weatherObj = {
     'Clear': SunnyImage,
     'Cloudy': cloudyImage,
     'Fog' : FogImage,
     'Rain' : RainImage,
     'Snow' : SnowImage,
     'Freezing Rain': FreezingRainImage,
     'IcePellet': IcePallette,
     'ThunderStorm' : Thunder,
     'Mixed weather':MixedImage
  }
  
  // convert to date
  function getDateAndTime(time){
    let date = new Date(time);
    return date.toDateString();
  }

  export {
    findWeather,
    weatherObj,
    getDateAndTime
  }