import useSWR from 'swr'
import {NET} from '../helper/axios'


const fetcher = async (url) => {
  return await NET("GET",url,{},getToken())
}

export const getKategoriBisnisMerchant = async () => {
  const data = await NET("GET","/merchant/business_type")
  const resKategoriBisnisMerchant= []  
  data?.data?.data?.forEach((data)=>{
    resKategoriBisnisMerchant.push({value:data?.merchant_business_id,label:data?.title});
  }); 
  return resKategoriBisnisMerchant
}

export const getProvinsi = async () => {
  const data = await NET("GET","/merchant/provinces")
  const resProvinsi= []
  data?.data?.data?.forEach((data)=>{
    resProvinsi.push({value:data?.id,label:data?.name});
  }); 
  return resProvinsi
}

export const getCities = (id) => {  
  const {data, error} = useSWR("/merchant/cities/"+id, fetcher)
  const loadingCities = !data && !error
  const notFoundCities = (data?.data?.length === 0) || (data?.data == null)
  const resCities = []
  data?.data?.data?.forEach((data)=>{
    resCities.push({value:data?.id,label:data?.name});
  }); 
  return{
    resCities,
    loadingCities,
    notFoundCities
  }
}

export const getDistrict = (id) => {  
  const {data, error} = useSWR("/merchant/districts/"+id, fetcher)
  const loadingDis = !data && !error
  const notFoundDis = (data?.data?.length === 0) || (data?.data == null)
  const resDis= []
  data?.data?.data?.forEach((data)=>{
    resDis.push({value:data?.id,label:data?.name});
  }); 
  return{
    resDis,
    loadingDis,
    notFoundDis
  }
}