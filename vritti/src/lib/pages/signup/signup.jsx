import React, { useState } from 'react';
import './signup.css';


const SignupPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateofbirth:''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
   e.preventDefault();
   if(form.password!==form.confirmPassword){
    alert("passwords do not match!");
    return;
   }
   try{
    const response = await fetch('http://localhost:5000/signup',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            fullName:form.fullName,
            email: form.email,
            password: form.password,
            dateofbirth:form.dateofbirth
        })
    });
    if(response.ok){
        alert('signup successful');
    }
    else{
        alert('signup failed');
    }
   }catch(error)
   
    {
    console.error('Error:', error);
    alert('Something went wrong!');
  }
};

  return (
    <div className="signup-container">
      <form className="glass-card" onSubmit={handleSubmit}>
        <h2 className="title">Create Account</h2>

        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="John Doe"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="example@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
       <div className="input-group">
  <label>Date of Birth</label>
  <input
    type="date"
    name="dateofbirth"
    value={form.dateofbirth}
    onChange={handleChange}
    required
  />
</div>


        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="signup-button">Sign Up</button>
        <p className="login-link">
          Already have an account? <a href="localhost:5173/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
