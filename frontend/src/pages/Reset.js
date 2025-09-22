import React, { useState } from 'react';
import axios from 'axios';

export default function Reset(){
  const [data, setData] = useState({ email:'', code:'', newPassword:'' });
  const [msg, setMsg] = useState('');
  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post((process.env.REACT_APP_API_URL||'http://localhost:5000') + '/api/auth/reset', data);
      setMsg(res.data.message || 'Password reset');
    }catch(err){
      setMsg(err.response?.data?.message || 'Error');
    }
  };
  return (
    <div style={{padding:20}}>
      <h2>Reset password (use OTP)</h2>
      <form onSubmit={submit}>
        <input placeholder='Email' value={data.email} onChange={e=>setData({...data, email:e.target.value})} /><br/>
        <input placeholder='OTP code' value={data.code} onChange={e=>setData({...data, code:e.target.value})} /><br/>
        <input placeholder='New password' type='password' value={data.newPassword} onChange={e=>setData({...data, newPassword:e.target.value})} /><br/>
        <button>Reset</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
