import React , { useState , useEffect } from 'react'
import Cookies from 'js-cookie'
import './App.css'
import Coursepage from './components/Coursepage'
import LoginPage from './components/Loginpage'
import Button from './components/Button'
import Card from './components/Card'

function App() {
  
  const [loginState , setLoginState] = useState(false)
 
 
  const loginStateHandler = (status) => {

    setLoginState(status) ; 
  
    Cookies.set('loginState', status, { expires: 7 });
  }
  useEffect(() => {
    const storedLoginState = Cookies.get('loginState');
    if (storedLoginState === 'true') {
      setLoginState(true);
    }
  }, []);
  return (
    
   !loginState?( <div className='md:flex sm:grid sm:grid-rows-2 h-screen'>
    <div className='w-full bg-gradient-to-r from-white via-blue-100 to-white hover:from-white hover:via-green-200 hover:to-white transition-all duration-300 flex justify-center items-center'>
        <h1 className='font-extrabold text-3xl'>Your <br></br>Attendance<br></br> Tracker</h1>
    </div>

    <div className='w-1/2 grid grid-cols-5 items-center'> 
    <div className='col-span-1'></div>
    <div className='col-span-3'> <LoginPage setStatus = {loginStateHandler}/></div>
    <div className='col-span-1'></div>
       
      
    </div>
</div>):(
  <div>
   <Coursepage setStatus = {loginStateHandler}/>
  </div>
)


  )
}

export default App
