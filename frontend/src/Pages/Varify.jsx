import {useParams, useSearchParams} from "react-router-dom"
import { ShopContext } from "./Context/shopContext";
import React, { useContext, useEffect, useState } from "react";
import LoadPage from "./loadPage"
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const verify = ()=>{
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const { url,token } = useContext(ShopContext);
  const redirect = useNavigate()
  const VarifyPayment = async ()=>{
    try {
      const response = await axios.post(`${url}/api/order/verify`, { success,orderId }, {
        headers: {
          token,
        },
      });
      if(response.data.success){
        toast.success("Payment Confirmed")
        redirect("/myorder")
      }
      else{
        toast.error("Payment Failed")
        redirect("/")
      }
      console.log("Add to cart response:", response.data); 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    VarifyPayment()
  }, [])
  return (
    <section className="flex justify-center items-center flex-col gap-4">
      <h1 className="font-bold text-blue-600 text-2xl mt-20">loading ...</h1>
      <LoadPage/>
      
    </section>

  ) 
  
}


export default verify;
  