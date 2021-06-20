import create from 'zustand'

export const authStore = create((set)=>({
  isLoginStore : false,  
  confirmLogin : () => set(() => ({isLoginStore:true})),
  confirmLogout : () => set(() => ({isLoginStore:false}))
}))