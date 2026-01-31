import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';



import image1 from '../assets/bg1.jpg'
import image2 from '../assets/bg2.jpg'
import image3 from '../assets/bg3.jpg'
import './login.css';
const backgrounds = [
image1, image2, image3

];

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async(e) => {
    e.preventDefault();



   
  // try {
  //   const response = await fetch('http://localhost:5000/signin', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email, password })
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     alert('Login successful!');
  //     console.log(data.token); 
  //   } else {
  //     alert(data.message || 'Login failed!');
  //   }
  // } catch (error) {
  //   console.error('Login error:', error);
  //   alert('Server error, please try again later.');
  // }
  try{
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password}),
    credentials: "include",
    }); 
  const res = await fetch("http://localhost:5000/profile", {
  credentials: "include"
});
    const data = await response.json();
    console.log(data);
    if(response.ok && data.token){
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.name || data.email);
    
        navigate('/');
    }
    else{
        alert(data.message || 'Login failed. Please check your credentials.');
     
            console.error('Login error:', error);
    alert(`Server error: ${error.message || error}`);
    }

  }
  catch(error){
    console.error('Login error:', error);
    alert('Server error, please try again later.');
  }
  };

  return (
    <div className="login-container"
        style={{
        backgroundImage: `url(${backgrounds[bgIndex]})`,

        transition: 'background-image 1s ease-in-out',
      }}>
      <form className="glass-card" onSubmit={handleLogin}>
        <h2 className="title">Login</h2>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="example@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Sign In</button>
        <p className="signup-text">Don’t have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default LoginPage;
