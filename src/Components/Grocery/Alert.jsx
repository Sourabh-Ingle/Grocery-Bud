
import React,{useEffect} from 'react';
import './Grocery.css'

const Alert = ({mgs,type,removeAlert,list}) => {
   

    useEffect(() => {
        const timeout=setInterval(()=>{
            removeAlert();
        },5000)
        return()=>clearTimeout(timeout) ;
      
    }, [list])
   
    let typeofAlert = `alert-msg ${type}`
   
  return (
    <div className={typeofAlert}>{mgs}</div>
  )
}

export default Alert;