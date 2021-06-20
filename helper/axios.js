import axios from 'axios'

export const base = " https://ibank.halalpay.id:5901/api"

const logoutEvent = () => {  
  
}

export const NET = async (tipe, url, data, token, pin, isMultipart, isStream) => {
  
  tipe = (tipe||"GET")
  url = (url||"")
  data = (data||{})
  token = (token||"")
  pin = (pin||"")
  isMultipart = (isMultipart||false)
  isStream = (isStream||false)

  let objectResponse = {
    status : true,
    data : {}
  }

  try {
    const res = await axios({
      method : tipe,      
      url : (base+url),      
      data,
      responseType : (isStream)?"stream":"json",
      headers : {
        'Content-Type' : (isMultipart)?"multipart/form-data":"application/json",
        'Authorization-pin' : pin,
        'Authorization' : `Bearer ${token}`,        
      }      
    }) 
    objectResponse.status = true
    objectResponse.data = res?.data     
  } 
  
  catch (error) {    

    if(/401/ig.test(error)){
      logoutEvent();    
    }
    objectResponse.status = false
    objectResponse.data = error?.response?.data    
  }

  return objectResponse

}