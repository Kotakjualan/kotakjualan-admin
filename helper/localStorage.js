export const setToken = (token) => {
  if(token == null) return false;
  if(typeof window === "undefined") return false;
  localStorage.setItem("tokenKotakjualan.com", token) 
  return true
}
 
export const getToken = () => {
  if(typeof window === "undefined") return null;
  return localStorage.getItem("tokenKotakjualan.com")
}

export const setDataUser = (data) => {
  if(data == null) return false;
  if(typeof window === "undefined") return false;
  localStorage.setItem("dataUserHalalpay", JSON.stringify(data)) 
  return true
}
 
export const getDataUser = () => {
  if(typeof window === "undefined") return null;
  return localStorage.getItem("dataUserHalalpay")
}
 
export const clearLocalStorage = () => {
  if(typeof window === "undefined");
  localStorage?.clear()
}