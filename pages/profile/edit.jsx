import loadable from '@loadable/component'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { getCities, getDistrict, getKategoriBisnisMerchant, getProvinsi } from '../../api'
import { alertError, alertSuccess, alertWarning } from '../../helper/sweetalert'

const Sidebar = loadable(()=>import("../../components/Sidebar-Component"))
const Select = loadable(()=>import("react-select"))
const Loading = loadable(()=>import("../../components/Loading-Component"))
const NotFound = loadable(()=>import("../../components/NotFound-Component"))

export async function getStaticProps() {
  const resKategoriBisnis = await getKategoriBisnisMerchant()  
  const resProvinsi= await getProvinsi()  
  return {
    props: {
      kategoriProps : resKategoriBisnis,
      provinsiProps : resProvinsi
    },
  }
}


const loadingDetailProfile = false

const notFoundDetailProfile = true

export default function EditProfile({provinsiProps, kategoriProps}){  

  const {push} = useRouter()

  // const {resDetailProfile, loadingDetailProfile, notFoundDetailProfile} = getDetailProfileMerchant()

  const [name, setName] = useState("");
  const [tipeBisnis, setTipeBisnis] = useState("");
  const [kategori, setKategori] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [cities, setCities] = useState("");
  const [district, setDistrict] = useState("");    

  const [lng, setlng] = useState("");
  const [lat, setlat] = useState("");

  const [image, setImage] = useState(null);
  const [imageAddress, setImageAddress] = useState("");

  const inputFileRef = useRef(null)

  const [isClick, setIsClick] = useState(false);

  const {resCities} = getCities((provinsi?.value == null)?"":provinsi?.value)
  const {resDis} = getDistrict((cities?.value == null)?"":cities?.value)  

  const atClickUploadHandler = () => inputFileRef.current?.click();  
  
  const atChangeImage = (e) => {  
    const fileStrem = e.target?.files[0];   
    setImage(fileStrem);
    const reader = new FileReader(); 
    reader.onloadend = () => {
      setImageAddress(reader?.result);
    }           
    reader.readAsDataURL(fileStrem);  
  }

  // useEffect(()=>{
  //   if(resDetailProfile == null) return
  //   setName(resDetailProfile?.merchant_name) 
  //   setImageAddress(resDetailProfile?.merchant_logo)  
  // },[resDetailProfile])

  const handlerUpdate = async () => {

    if(isClick) return

    setIsClick(true)

    if(name?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Name terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(tipeBisnis?.value?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Tipe Bisnis terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(kategori?.value?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Kategori terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(provinsi?.label?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Provinsi terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(cities?.label?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Kota terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(district?.label?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Kecamatan terlebih dahulu")
      setIsClick(false)
      return
    }    
    else if(lng?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Lnt terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(lat?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi form input Lat terlebih dahulu")
      setIsClick(false)
      return
    }
    
    // const res = await updateProfileMerchant(name, tipeBisnis?.value, kategori?.value, provinsi?.label, cities?.label, district?.label, image, lat, lng)
    // if(!res?.status){
    //   await alertError("Terjadi Kesalahan", res?.data?.message)
    //   setIsClick(false)
    //   return
    // }
    
    await alertSuccess("Berhasil", "Selamat kamu berhasil update profile!")
    setIsClick(false)
    // push("/profile")
    return

  }

  if(loadingDetailProfile){
    return(
      <Sidebar title={"Profile - Halalpedia Express"} description={"Page ini akan menampilkan detail profile merchant"}>        
        <Loading></Loading>
      </Sidebar>  
    )
  }
  else if(notFoundDetailProfile){
    return(
      <Sidebar title={"Profile - Halalpedia Express"} description={"Page ini akan menampilkan detail profile merchant"}>        
        <NotFound></NotFound>
      </Sidebar>  
    )
  }
  else{
  return( 
    <Sidebar title={"Profile - Halalpedia Express"} description={"Page ini akan menampilkan detail profile merchant"}>        
      <div className="w-full bg-white rounded py-7 px-8 mb-20">        
        <p className="text-2xl text-gray-800 font-semibold">Edit Profile</p>
        <p className="text-sm text-gray-600 mb-7">Page ini akan memberikan kamu akses untuk mengubah profile</p>
        <div className="mt-4">
          <p className="text-gray-800 mb-1  text-sm">Nama Merchant</p>
          <input value={name} onChange={(e)=>setName(e?.target?.value)} type="text" className="w-full border border-gray-300 rounded px-2 py-2 text-sm text-gray-900" />
        </div>                
        <div className="mt-4">
          <p className="text-gray-800 mb-1  text-sm">Provinsi</p>
          <Select defaultInputValue={resDetailProfile?.province} options={provinsiProps} onChange={e=>setProvinsi(e)} value={provinsi}></Select>
        </div>        
        <div className="mt-4">
          <p className="text-gray-800 mb-1  text-sm">Kota / Kabupaten</p>
          <Select defaultInputValue={resDetailProfile?.city} options={resCities} onChange={e=>setCities(e)} value={cities}></Select>
        </div>        
        <div className="mt-4">
          <p className="text-gray-800 mb-1  text-sm">Kecamatan</p>
          <Select defaultInputValue={resDetailProfile?.district} options={resDis} onChange={e=>setDistrict(e)} value={district}></Select>
        </div>        
        
        <div className="mt-4 flex items-center">
          <label className="block text-sm font-medium text-gray-700">
            Upload Foto Produk
          </label>
        
          <button onClick={atClickUploadHandler}  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
            Pilih Foto
          </button>
          <input  onChange={atChangeImage} accept="image/*" ref={inputFileRef} type="file" hidden/>
        </div>

        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          {imageAddress?
            <img height={270} width={270} src={imageAddress} />   
          :                    
            <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          
            <p className="text-xs text-gray-500">
              PNG or JPG up to 10MB
            </p>
          </div>}
        </div>        
        <div className="mt-10 flex justify-end" >
          <button onClick={handlerUpdate} className="bg-green-400 rounded px-4 py-3 text-white font-semibold hover:bg-green-500 text-sm">
            {(!isClick)?"Edit Profile":"Loading..."}            
          </button>
        </div>
      </div>
    </Sidebar>
  )
  }
}