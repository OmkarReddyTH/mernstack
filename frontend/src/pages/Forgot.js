import React, { useState } from 'react';
import axios from 'axios';

export default function Forgot(){
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post((process.env.REACT_APP_API_URL||'http://localhost:5000') + '/api/auth/forgot', { email });
      setMsg(res.data.message || 'OTP sent');
    }catch(err){
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Forgot password</h2>
      <form onSubmit={submit}>
        <input placeholder='Your email' value={email} onChange={e=>setEmail(e.target.value)} /><br/>
        <button>Request OTP</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
