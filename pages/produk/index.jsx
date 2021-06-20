import loadable from '@loadable/component'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {FiSearch} from 'react-icons/fi'

const Sidebar = loadable(()=>import("../../components/Sidebar-Component"))
const TableComponent = loadable(()=>import("../../components/Produk/TableProduk-Component"))

export default function Produk(){

  const {push} = useRouter()

  const [isAllProdukFilter, setIsAllProdukFilter] = useState(true);  
  const [search, setSearch] = useState("");

  const [searchFix, setSearchFix] = useState("");

  const handlerSearch = () => {    
    setSearchFix(searc)
  }

  const handlerEnter = (e) => {
    if(e?.keyCode === 13){
      setSearchFix(search)
    }
  }

  useEffect(()=>{
    if(search?.length === 0){
      setSearchFix("")
    }
  },[search])

  return(
    <Sidebar title="Produk - Halalpedia Express" description="Page ini akan menampilkan produk yang merchant miliki berserta seluruh aksesnya">
      <p className="text-lg font-thin text-gray-800 pl-2">Informasi untuk Seller</p>
      <p className="text-sm text-gray-500 pl-2">Mohon maaf untuk para seller, website ini dalam masa pengembangan</p>
      
      <div className="bg-white rounded-lg shadow-md p-5 mt-7">
        
        <div className="flex justify-between">
          <p className="text-lg pt-1 font-semibold text-gray-800">Daftar Produk</p>
          <button onClick={()=>push("/produk/add")} className="text-white font-semibold bg-green-500 py-2 px-4 rounded text-sm">+ Tambah Produk</button>
        </div>

        <div className="flex flex-wrap mt-7">
          <div className="space-x-4 w-full border-b border-gray-200 py-2">
            <button onClick={()=>setIsAllProdukFilter(true)} className={`${(isAllProdukFilter)?"text-green-400 border-b-2 outline-none border-green-400":"text-gray-400"} py-2 font-semibold px-4`}>
              Semua Produk
            </button>
            <button onClick={()=>setIsAllProdukFilter(false)} className={`${(!isAllProdukFilter)?"text-green-400 border-b-2 outline-none border-green-400":"text-gray-400"} font-semibold py-2 px-4`}>
              Aktif
            </button>
          </div>
        </div>

        <div className="flex flex-wrap mt-4 w-full">
          <div className="flex justify-between flex-wrap w-full">
            <div className="flex-1">
              <input onChange={(e)=>setSearch(e?.target?.value)} value={search} onKeyUp={handlerEnter} type="text" className="border outline-none focus:ring-1 focus:ring-green-500 w-full text-sm border-gray-200 py-2 px-2 rounded-l" placeholder="Cari nama Produk atau SKU" />            
            </div>
            <button onClick={handlerSearch} className="bg-gray-100 border border-gray-200 py-1 px-2 rounded-r hover:bg-green-500 hover:border-transparent  hover:text-white">
              <FiSearch size={22}></FiSearch>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap mt-2 w-full">
          <TableComponent search={searchFix} status={!isAllProdukFilter}></TableComponent>
        </div>

      </div>
    </Sidebar>
  )
}