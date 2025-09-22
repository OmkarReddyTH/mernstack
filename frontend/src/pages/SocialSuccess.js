import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function SocialSuccess(){
  const [params] = useSearchParams();
  const nav = useNavigate();
  useEffect(()=>{
    const token = params.get('token');
    if(token){
      localStorage.setItem('token', token);
      nav('/protected');
    }
  },[params, nav]);
  return <div>Logging you in...</div>;
}
