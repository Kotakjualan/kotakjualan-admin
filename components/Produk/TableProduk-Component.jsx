import loadable from '@loadable/component'
// import { deleteProdukMerchant, getAllProduk, changeEnabledProduckMerchant} from "../../api"
import { convertToRp } from '../../helper/convert'

import {RiDeleteBin2Line, RiPencilLine} from 'react-icons/ri'
import { alertError, alertQuestion, alertSuccess } from '../../helper/sweetalert'
import { useRouter } from 'next/router'

const Loading = loadable(()=>import("../Loading-Component"))
const NotFound = loadable(()=>import("../NotFound-Component"))
const Image = loadable(()=>import("../ImageLazy-Component"))
const Toogle = loadable(()=>import("../Toogle/ToogleComponent"))

const notFoundAllProduk = true
const loadingAllProduk = false

export default function TableComponent({search,status}){

  const {push} = useRouter()

  search = (search||"")
  status = (status||"")  

  // const {resAllProduk, loadingAllProduk, notFoundAllProduk, mutateAllProduk} = getAllProduk("", search, (!status?"":status) )

  const handlerChangeEnabled = async (id) => {

    const resQuestion = await alertQuestion("Confirmation", "Kamu yakin ingin merubah status produk ini?", "Yaa, Ubah Sekarang", "Cancel")

    if(!resQuestion){
      return
    }

    // const res = await changeEnabledProduckMerchant(id)

    // if(!res?.status){
    //   await alertError("Terjadi Kesalahan", res?.data?.message)
    //   return
    // }

    // mutateAllProduk()
    await alertSuccess("Berhasil", "Selamat kamu berhasil menghapus produk ini")
    return

  }

  const handlerDeteleProduk = async (id) => {
    
    const resQuestion = await alertQuestion("Confirmation", "Kamu yakin ingin menghapus produk ini?", "Yes, Hapus Sekarang", "Cancel")

    if(!resQuestion){
      return
    }

    // const res = await deleteProdukMerchant(id)

    // if(!res?.status){
    //   await alertError("Terjadi Kesalahan", res?.data?.message)
    //   return
    // }

    // mutateAllProduk()
    await alertSuccess("Berhasil", "Selamat kamu berhasil menghapus produk ini")
    return

  }

  const handlerUpdate = (id) => {
    // push({
    //   pathname:"/produk/[id]",
    //   query:{
    //     id:id
    //   }
    // })
  }

  if(loadingAllProduk){
    return(
      <Loading></Loading>
    )
  }
  else if(notFoundAllProduk){
    return(
      <NotFound></NotFound>
    )
  }
  else{
    return(
      <div className='md:flex-row w-full mb-10'>
        <div className="md:hidden block">  

          <table className="table-auto w-full">
            <tbody>
            {resAllProduk?.map((item, index) => ( 
              <div className='border rounded-lg mt-5 w-full' key={index}>

                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">NO</td>
                  <td className="border-b-2 border-gray-100 py-5">{index+1}</td>
                </tr>
                    
                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">FOTO</td>
                  <td className="border-b-2 border-gray-100 py-5">
                    <Image className="rounded" alt="Product Image" height={75} width={75} src={item?.product_image}></Image>
                  </td>
                </tr>

                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">NAMA PRODUK</td>
                  <td className="border-b-2 border-gray-100 py-5">{item?.product_title}</td>
                </tr>

                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">HARGA</td>
                  <td className="border-b-2 border-gray-100 py-5">{convertToRp(item?.product_price)}</td>
                </tr>
                
                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">STOK</td>
                  <td className="border-b-2 border-gray-100 py-5">{item?.available_stock}</td>
                </tr>
                
                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">STATUS</td>
                  <td className="border-b-2 border-gray-100 py-5">
                    <Toogle onClick={()=>handlerChangeEnabled(item?.id)} status={item?.enabled}></Toogle>
                  </td>
                </tr>                              

                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">UPDATE</td>
                  <td className="border-b-2 border-gray-100 py-5">
                    <button onClick={()=>handlerUpdate(item?.id)} className="text-yellow-500"><RiPencilLine size={27}></RiPencilLine></button>
                  </td>
                </tr>                              

                <tr className="flex justify-between px-5">
                  <td className=" border-b-2 border-gray-100 py-5">DELETE</td>
                  <td className="border-b-2 border-gray-100 py-5">
                    <button onClick={()=>handlerDeteleProduk(item?.id)} className="text-red-400"><RiDeleteBin2Line size={27}></RiDeleteBin2Line></button>
                  </td>
                </tr>                              
                                       
              </div>
            ))}                           
            </tbody>
          </table>
        </div>
        
        <div className='md:block hidden'>
          <table className="table-auto w-full ">
            <thead>   
              <tr className="text-left">
                <th className="border-b-2 border-t-2 border-gray-200 py-5">NO</th>                
                <th className="border-b-2 border-t-2 border-gray-200 py-5">FOTO</th> 
                <th className="border-b-2 border-t-2 border-gray-200 py-5">NAMA PRODUK</th>                
                <th className="border-b-2 border-t-2 border-gray-200 py-5">HARGA</th>                               
                <th className="border-b-2 border-t-2 border-gray-200 py-5">STOK</th>   
                <th className="border-b-2 border-t-2 border-gray-200 py-5">STATUS</th>                               
                <th className="border-b-2 border-t-2 border-gray-200 py-5">ACTION</th>
              </tr>     
            </thead>
            <tbody>
              {resAllProduk != null? 
                resAllProduk?.map((item, index) => ( 
                  <tr className="text-left" key={index}>
                    <td className="py-4">{index+1}</td>
                    <td className="py-4"><Image className="rounded" alt="Product Image" height={75} width={75} src={item?.product_image}></Image></td>
                    <td className="py-4">{item?.product_title}</td>                  
                    <td className="py-4">{convertToRp(item?.product_price)}</td>
                    <td className="py-4">{item?.available_stock}</td>
                    <td className="py-4">
                      <Toogle onClick={()=>handlerChangeEnabled(item?.id)} status={item?.enabled}></Toogle>                      
                    </td>                       
                    <td className="py-4">
                      <button onClick={()=>handlerUpdate(item?.id)} className="text-yellow-500 mr-2"><RiPencilLine size={27}></RiPencilLine></button>
                      <button onClick={()=>handlerDeteleProduk(item?.id)} className="text-red-400"><RiDeleteBin2Line size={27}></RiDeleteBin2Line></button>                      
                    </td>
                  </tr>            
                ))
              : <NotFound></NotFound>     
              } 
            </tbody>
          </table>
        </div>

      </div>
    )
  }

}