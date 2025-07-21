import React, { useState } from 'react';
import './login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    const response = await fetch('http://localhost:5000/signin', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    const data = await response.json();
    if(response.ok){
      alert('Login successfull');
    }
    else{
      alert(data.message|| 'login failed');
    }

  }
  catch(error){
    console.error('Login error:', error);
    alert('Server error, please try again later.');
  }
  };

  return (
    <div className="login-container">
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
        <p className="signup-text">Don’t have an account? <a href="localhost:5173/signup">Sign Up</a></p>
      </form>
    </div>
  );
};

export default LoginPage;
