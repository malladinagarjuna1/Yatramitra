import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Auth from "./lib/pages/auth/auth.jsx";
import Chat from "./lib/pages/chat/chat.jsx";
import Profile from "./lib/pages/profile/profile.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
<BrowserRouter>
<Routes>
      <Route path="/auth" element={<Auth />}/>
      <Route path ="/chat"  element ={<Chat/>}/>
      <Route path = "/profile" element ={<Profile />}/>
      <Route path ="*" element={<Navigate to="/auth" />}/>
  

      </Routes>
</BrowserRouter>

    
  );
  
};

export default App
