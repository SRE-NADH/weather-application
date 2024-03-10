import { useState } from "react";


function useLocalStorageWithExpiry(key,initialValue){
const [value,setValue] = useState(getValue);

function getValue(){
    const now = new Date().getTime();
    const item = localStorage.getItem(key);
    if(item){
        const data = JSON.parse(item);
        if(data.expiry<now){
            localStorage.removeItem(key);
        }
        else{
            return data.value;
        }
    }
    return initialValue;
}


const setLocalStorageValue = (newValue)=>{
    setValue(newValue);
    localStorage.setItem(key,JSON.stringify({
        value:newValue,
        expiry:new Date().getTime()+(60*1000)
    }))
}

return [value,setLocalStorageValue];

}

export default useLocalStorageWithExpiry;