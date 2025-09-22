import React, { useState } from 'react';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

export default function Signup(){
  const [form, setForm] = useState({ fullName:'', email:'', password:'', phone:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const valid = () => {
    if(!form.fullName) return false;
    if(!validator.isEmail(form.email)) return false;
    if(!validator.isStrongPassword(form.password, { minLength:8, minSymbols:0 })) return false;
    if(!form.phone) return false;
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if(!valid()){ setError('Please check inputs'); return; }
    setLoading(true);
    try{
      const res = await axios.post((process.env.REACT_APP_API_URL||'http://localhost:5000') + '/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      nav('/protected');
    }catch(err){
      setError(err.response?.data?.message || 'Error');
    }finally{ setLoading(false); }
  };

  return (
    <div style={{padding:20}}>
      <h2>Signup</h2>
      <form onSubmit={submit}>
        <input placeholder='Full name' value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} /><br/>
        <input placeholder='Email' value={form.email} onChange={e=>setForm({...form, email:e.target.value})} /><br/>
        <input placeholder='Password' type='password' value={form.password} onChange={e=>setForm({...form, password:e.target.value})} /><br/>
        <input placeholder='Phone' value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} /><br/>
        <button disabled={!valid() || loading}>{loading? 'Signing...' : 'Sign up'}</button>
      </form>
      {error && <p style={{color:'red'}}>{error}</p>}
      <p>Or <a href="/login">Login</a></p>
    </div>
  );
}
