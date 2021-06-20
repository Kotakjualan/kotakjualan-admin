import { useMemo } from "react"

export default function ToogleComponent({status, onClick}){

  const renderStyleCheckbox = useMemo(()=>{
    if(status){
      return "rignt-0"
    }
    else{
      return ""
    }
  },[status])

  const renderStyleLabel = useMemo(()=>{
    if(status){
      return "bg-green-400"
    }
    else{
      return "bg-gray-300"
    }
  },[status])

  return(    
    <>
      <div onClick={()=>onClick()} className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
        <input type="checkbox" name="toggle" id="toggle" className={`${renderStyleCheckbox} bg-white toggle-checkbox  absolute block w-6 h-6 rounded-full border-4 appearance-none cursor-pointer`}/>
        <label htmlFor="toggle" className={`${renderStyleLabel} toggle-label block overflow-hidden h-6 rounded-full cursor-pointer`}></label>
      </div>      
    </>
  )
}