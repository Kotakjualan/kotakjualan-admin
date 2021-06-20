import React, {useState} from 'react';
import loadable from '@loadable/component'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {setToken, setDataUser, getTokenFirebase} from '../helper/localStorage'
import { alertError, alertSuccess } from '../helper/sweetalert';
import { authStore } from '../store/auth-store';

const Header = loadable(()=>import("../components/Head-Component"));

export default function LoginPage(){  

  const {confirmLogin} = authStore()  
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isClick, setIsClick] = useState(false);  

  const handlerClickLogin = async () => {
    // if(isClick) return
    // setIsClick(true)
    // const res = await loginHandler(email, password, getTokenFirebase())
    // if(!res?.status){
    //   await alertError("Terjadi Kesalahan", res?.data.message)
    //   setIsClick(false)
    //   return
    // }
    // confirmLogin()
    // setToken(res?.data?.data.token)
    // setDataUser(res?.data?.data)    
    // await alertSuccess("Berhasil Login", "Selamat, kamu berhasil login!")
    // setIsClick(false)
    // router.push("/home")
    // return
  }

  return(
    <React.Fragment>
      <Header title="Login Page" description="Halalpay"></Header>
      <div className="flex flex-col">        
        <div className="flex justify-center min-w-full px-4">
          {/* //box class  */}
          <div className="w-full my-12 md:w-1/2 lg:rounded-md lg:shadow-lg lg:w-1/3">
            <div className="md:mt-10 mb-12 flex justify-center cursor-pointer">
              <Link href="/home" passHref>
                <div className="flex content-center px-5 cursor-pointer">            
                  <p className="text-3xl text-gray-800 pt-1">
                    Kotakjualan
                    <span className="font-thin ml-2 text-green-500">.com</span>
                  </p>          
                </div>
              </Link>
            </div>  
            <div className="flex justify-between items-center md:px-7 px-2 mb-10">
              <span className="text-2xl font-semibold text-gray-700 cursor-pointer">Masuk</span>              
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Email</span>
              <input type="email" value={email} placeholder="Your email" onChange={(e)=>setEmail(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-black-400 hover:border-black-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic">Example : joni@gadaisyariah.com</span>
            </div>
            <div className="my-5 md:px-7 px-2 flex flex-col">
              <span className="font-semibold text-sm text-gray-500 mb-2">Password</span>
              <input type="password" value={password} placeholder="Your password" onChange={(e)=>setPassword(e.target.value)} className="p-3 pr-0 border-gray-300 border-opacity-60 border-2 rounded text-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-black-400 hover:border-black-400"></input>
              <span className="text-xs text-gray-400 mt-1 italic"></span>
            </div>
            <div className="mt-7 md:px-7 px-2 flex flex-col pb-10">              
              <button onClick={handlerClickLogin} className="bg-black text-white font-bold py-3 cursor-pointer rounded-md hover:bg-black-400">
                {(isClick)?"Loading..":"Masuk"}
              </button>
            </div>                        
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}