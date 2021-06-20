import loadable from '@loadable/component'
import {useRouter} from 'next/router'
import { useRef, useState } from "react"
// import { sendNewProdukMerchant } from '../../api';
import {alertError, alertSuccess, alertWarning} from '../../helper/sweetalert'

const Sidebar = loadable(()=>import("../../components/Sidebar-Component"))

export default function AddProduk(){

  const {push} = useRouter()

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [stok, setStok] = useState("");
  
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const refImage = useRef(null)

  const [isClick, setIsClick] = useState(false);

  const atClickUploadHandler = () => refImage.current?.click();
  
  const atChangeImage = (e) => {  
    const fileStrem = e.target?.files[0];   
    setImage(fileStrem);
    const reader = new FileReader(); 
    reader.onloadend = () => {
      setImagePreview(reader?.result);
    }           
    reader.readAsDataURL(fileStrem);  
  }

  const handlerClick = async () => {

    if(isClick) return
    
    setIsClick(true)

    if(name?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi Form Input Nama terlebih dahulu")
      setIsClick(false)
      return
    } 
    else if(desc?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi Form Input Deskripsi terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(price?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi Form Input Harga terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(stok?.length === 0){
      await alertWarning("Oppps", "Mohon lengkapi Form Input Stok terlebih dahulu")
      setIsClick(false)
      return
    }
    else if(parseInt(stok)<1){
      await alertWarning("Oppps", "Mohon maaf minimal stok adalah 1 item")
      setIsClick(false)
      return
    }
    else if(parseInt(price)<1){
      await alertWarning("Oppps", "Mohon maaf minimal price adalah Rp.1")
      setIsClick(false)
      return
    }
    else if(image == null || image == ""){
      await alertWarning("Oppps", "Mohon Upload Image Produk terlebih dahulu")
      setIsClick(false)
      return
    }

  
    // const res = await sendNewProdukMerchant(name, desc, price, image, stok)

    // if(!res?.status){
    //   await alertError("Terjadi Kesalahan", res?.data?.message)
    //   setIsClick(false)
    //   return
    // }

    // await alertSuccess("Berhasil", "Selamat Produk kamu berhasil tersimpan!")

    // push("/produk")

    setIsClick(false)
    return

  }

  return(
    <Sidebar title="Tambah Produk - Halalpedia Express" description="Page ini akan memberikan kamu akses untuk menambahkan barang">      
      <div className="w-full bg-white px-4 py-7 rounded mb-10">
        <p className="text-2xl text-gray-800 font-semibold">Tambah Produk</p>
        <p className="text-sm text-gray-600 mb-7">Page ini akan memberikan kamu akses untuk menambahkan produk</p>

        <p className="text-sm text-gray-800 mb-1">Nama Produk</p>
        <input value={name} onChange={(e)=>setName(e?.target?.value)} type="text" className="ring-offset-0 p-2 w-full rounded border border-gray-300 text-sm text-gray-800 " />

        <p className="text-sm text-gray-800 mb-1 mt-4">Deskripsi</p>
        <textarea value={desc} onChange={(e)=>setDesc(e?.target?.value)} className="w-full border border-gray-300 text-gray-800 text-sm rounded p-2" rows="5"></textarea>

        <p className="text-sm text-gray-800 mb-1 mt-4">Harga</p>
        <input value={price} onChange={(e)=>setPrice(e?.target?.value)} type="number" className="ring-offset-0 p-2 w-full rounded border border-gray-300 text-sm text-gray-800 " />

        <p className="text-sm text-gray-800 mb-1 mt-4">Stok</p>
        <input value={stok} onChange={(e)=>setStok(e?.target?.value)} type="number" className="ring-offset-0 p-2 w-full rounded border border-gray-300 text-sm text-gray-800 " />

        <div className="mt-4 flex items-center">
            <label className="block text-sm font-medium text-gray-700">
              Upload Foto Produk
            </label>
          
            <button onClick={atClickUploadHandler}  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
              Pilih Foto
            </button>
            <input  onChange={atChangeImage} accept="image/*" ref={refImage} type="file" hidden/>
          </div>

          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            {imagePreview?
              <img height={270} width={270} src={imagePreview} />   
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
        
        <div className="flex justify-end">
          <button onClick={handlerClick} className="bg-green-500 mt-5 text-sm px-4 hover:bg-green-400 py-2 rounded text-white font-semibold">
            {(!isClick)?"Simpan Produk Baru":"Loading.."}
          </button>
        </div>

      </div>


    </Sidebar>
  )
}