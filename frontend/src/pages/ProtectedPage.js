import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function ProtectedPage(){
  const [msg, setMsg] = useState('');
  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get((process.env.REACT_APP_API_URL||'http://localhost:5000') + '/api/protected', { headers: { Authorization: 'Bearer ' + token } })
      .then(r=> setMsg(JSON.stringify(r.data)))
      .catch(e=> setMsg('Not authorized'));
  },[]);
  return <div style={{padding:20}}><h2>Protected</h2><pre>{msg}</pre></div>;
}
