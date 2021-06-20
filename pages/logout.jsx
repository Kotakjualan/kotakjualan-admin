import loadable from '@loadable/component'
import { useRouter } from 'next/router';

import React,  {useEffect } from 'react';
import { clearLocalStorage } from '../helper/localStorage';
import { authStore } from '../store/auth-store'

const Head = loadable(()=>import("next/head"))

export default function Logout(){  

  const {confirmLogout} = authStore()

  const router = useRouter()

  useEffect(()=>{        
    if(typeof window === "undefined") return;                    
    clearLocalStorage()        
    confirmLogout()      
    router.replace("/")    
  },[]);

  return(
    <Head>
      <title>{"Logout - Halalpedia Express"}</title>
      <meta name="description" content={"Page ini adalah gerbang masuk Hal;alpedia Express Web"} />
      <link rel="icon" href="/logo.webp"/>
    </Head>    
  );
}