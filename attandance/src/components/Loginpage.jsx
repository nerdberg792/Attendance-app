import React, { useState } from 'react';
import Card from './Card';
import Cookies from 'js-cookie';
const LoginPage = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
  //login handler 
    async function handleLogin() {
      console.log('login clicked');
      const userData = {
        username: username,
        password: password,
      };
  
      const requestOptions = {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(userData) 
      };
  
      try {
        const response = await fetch('http://localhost:3001/login', requestOptions);
        const status = response.status ;

        const data = await response.json();

        console.log(data)
        const token = data.token ;
        console.log(data)
        
        const courseObjarr = data.array ;
        Cookies.set('courseObjarrcook', JSON.stringify(courseObjarr), { expires: 7 }) ;
        
        Cookies.set('token', token, { expires: 7 });
        if (status === 200) {
          props.setStatus(true);
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  //signup handler
    async function handleSignup() {
      const userData = {
        username: username,
        password: password,
      };
     
     
      const requestOptions = {
        method: 'POST',  
        headers: {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify(userData) 
      };
      
      try {
        const response = await fetch('http://localhost:3001/signup', requestOptions);
       
        const status = response.status ; 
        const data = await response.json();
        const token = data.token ;
        const courseObjarr = [] ; 
        Cookies.set('courseObjarrcook', JSON.stringify(courseObjarr), { expires: 7 }) ;
        Cookies.set('token', token, { expires: 7 });
      
        if (status === 201) {
        
          props.setStatus(true);
          
        }
      } catch (error) {
        console.error('Error during signup:', error);
      }
    }
  return (
   <div>
    <Card>
        <h1 className="text-2xl font-bold mb-3">Login</h1>
        <div className="mb-4">
            <label className="block mb-2">Username</label>
            <input
            type="text"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
            type="password"
            className="border border-gray-300 p-2 rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="text-red-500 mb-4">{errorMessage}</div>
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleLogin}
        >
            Login
        </button>
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 ml-5"
            onClick={handleSignup}
        >
            Signup
        </button>
    </Card>
   </div>
  );
};

export default LoginPage;
