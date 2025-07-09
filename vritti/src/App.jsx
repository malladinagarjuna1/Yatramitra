import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./lib/pages/auth/auth.jsx";
import Chat from "./lib/pages/chat/chat.jsx";
import Profile from "./lib/pages/profile/profile.jsx";
import  ForgotPassword from "./lib/pages/forgotpassword.jsx";
import axios from 'axios' 


function App() {
  const [count, setCount] = useState(0)
const buyfunction = async () =>{
  let response = await axios.post('https://localhost:5000/payment');
  if(response && response.status === 200){
    window.location.href= response.data.url;
    console.log(response.data);
    
  }
}
  return (
    <>

<button onClick={ buyfunction }>
book tickets
</button>
</>
    
    )
  
};

export default App;
