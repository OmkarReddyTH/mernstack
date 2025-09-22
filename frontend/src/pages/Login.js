import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ emailOrPhone:'', password:'' });
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post((process.env.REACT_APP_API_URL||'http://localhost:5000') + '/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      nav('/protected');
    }catch(err){
      setError(err.response?.data?.message || 'Error');
    }
  };

  const socialGoogle = ()=>{
    window.location.href = (process.env.REACT_APP_API_URL||'http://localhost:5000') + '/api/auth/google';
  };
  const socialLinkedIn = ()=>{
    window.location.href = (process.env.REACT_APP_API_URL||'http://localhost:5000') + '/api/auth/linkedin';
  };

  return (
    <div style={{padding:20}}>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input placeholder='Email or Phone' value={form.emailOrPhone} onChange={e=>setForm({...form, emailOrPhone:e.target.value})} /><br/>
        <input placeholder='Password' type='password' value={form.password} onChange={e=>setForm({...form, password:e.target.value})} /><br/>
        <button>Login</button>
      </form>
      <button onClick={socialGoogle}>Login with Google</button>
      <button onClick={socialLinkedIn}>Login with LinkedIn</button>
      {error && <p style={{color:'red'}}>{error}</p>}
      <p><a href="/forgot">Forgot password?</a></p>
    </div>
  );
}
