
import loadable from '@loadable/component'
// import { getDetailProfileMerchant } from "../../api"

const Sidebar = loadable(()=>import("../../components/Sidebar-Component"))
const Image = loadable(()=>import("../../components/ImageLazy-Component"))
const Loading = loadable(()=>import("../../components/Loading-Component"))
const NotFound = loadable(()=>import("../../components/NotFound-Component"))
const Link = loadable(()=>import("next/link"))

const loadingDetailProfile = false
const notFoundDetailProfile = true

export default function Profile(){

  // const {resDetailProfile, loadingDetailProfile, notFoundDetailProfile} = getDetailProfileMerchant()

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
        <div className="w-full bg-white rounded md:py-7 px-8 mb-20">
          <div className="flex justify-center">
            <Image alt="Image Profile" src={resDetailProfile?.merchant_logo} width={175} height={175} className="rounded-full border cursor-pointer border-green-300"></Image>
          </div>
          <div className="mt-4 mb-6 flex justify-end">
            <Link href="/profile/edit">
              <p className="text-blue-400 hover:text-blue-500 cursor-pointer">Edit Profile</p>
            </Link>
          </div>
          <div className="mt-4">
            <p className="text-gray-800 mb-1  text-sm">Nama Merchant</p>
            <input value={resDetailProfile?.merchant_name} readOnly type="text" className="w-full border border-gray-300 rounded px-2 py-2 text-sm text-gray-900" />
          </div>          
          <div className="mt-4">
            <p className="text-gray-800 mb-1  text-sm">Provinsi</p>
            <input value={resDetailProfile?.province} readOnly type="text" className="w-full border border-gray-300 rounded px-2 py-2 text-sm text-gray-900" />
          </div>
          <div className="mt-4">
            <p className="text-gray-800 mb-1  text-sm">Kota / Kabupaten</p>
            <input value={resDetailProfile?.city} readOnly type="text" className="w-full border border-gray-300 rounded px-2 py-2 text-sm text-gray-900" />
          </div>
          <div className="mt-4">
            <p className="text-gray-800 mb-1  text-sm">Kecamatan</p>
            <input value={resDetailProfile?.district} readOnly type="text" className="w-full border border-gray-300 rounded px-2 py-2 text-sm text-gray-900" />
          </div>          
        </div>
      </Sidebar>
    )
  }

}