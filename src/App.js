
import './App.css';
import {useEffect, useState} from 'react';

function App() {
  let [city,setcity] =useState('')
  let [wdetail,setwdetail] =useState()
  let [isloading,setisloading] =useState(false)
  let getData=(event)=>{
    setisloading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=203101d87b9249fa477ef8c2215ccd7e&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      console.log(finalRes)
      if(finalRes.cod=="404"){
        setwdetail(undefined)
      }
      else{
        setwdetail(finalRes)
      }
      setisloading(false)
    })

    event.preventDefault()
    setcity('')
  }
  useEffect(()=>{
     console.log("welcome")
  },[])
  return (
    <div className='container mx-auto ' >
 <div className='w-[100%] h-[100vh] bg-[#4aacb1] '>
      <div className='max-w-[1320px] mx-auto'>
        <h1 className='text-[40px] font-bold py-[50px] text-white ml-[30px]'>Simple weather App</h1>
        <form onSubmit={getData}> 
          <input type='text' value={city} onChange={(e)=>setcity(e.target.value)} className='w-[300px] h-[40px] pl-3 ml-[30px]' placeholder='City Name'/> 
          <button className='bg-[#1d4a6b] text-white font-bold p-[8px_20px] ml-[6px]'>Submit</button> 
        </form>


        <div className='w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] relative'>

          <img src="/loading.webp" width={100}  className={ `absolute left-[40%] ${ isloading ? '' : 'hidden'} `} />

          {wdetail!==undefined
          ?
          <>
          <h3 className='font-bold text-[30px]'>{wdetail.name}  <span className='bg-[yellow]'>{wdetail.sys.country}</span></h3>
          <h2 className='font-bold text-[40px]'>{wdetail.main.temp}</h2>
          <img src={`http://openweathermap.org/img/w/${wdetail.weather[0].icon}.png`} />
          <p>
            {wdetail.weather[0].description}
          </p>
          </>
          :
          "Not Data"
          }


        </div>

      </div>
    </div>
    </div>
   
  );
}

export default App;
