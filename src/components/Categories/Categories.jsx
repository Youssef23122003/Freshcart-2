import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader/Loader'
import { Helmet } from 'react-helmet'



export default function Categories() {
    const [count, setcount] = useState(0)
    let [categoryProd , setcategoryProd]=useState([])
    
    async function getCategories(){ 
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let {data,isLoading,isError,error} = useQuery({queryKey:'getCategories',queryFn:getCategories,select:
      (data)=>{return data.data.data}})
      console.log(data);
      

    useEffect(()=>{
      
    } , [])
    if(isLoading){
      return <Loader/>
    }

    if(isError){
      return error
      
    }
  return <>
    <div className="application">
  <Helmet>  
      <title>Freshcart Catgegories</title>
  </Helmet>
 </div>
<div className="">
      <div className='flex flex-wrap'>
      <div className="container mx-auto px-4 py-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {data.map((prod) => (
      <div
        key={prod.name}
        className="border rounded-md shadow-md hover:shadow-green-500 transition-all"
      >
        <img
          src={prod.image}
          className="w-full h-72 rounded-t-md object-cover object-center"
          alt={prod.name}
        />
        <div className="py-3">
          <h3 className="text-center text-green-500 text-lg md:text-xl lg:text-3xl font-semibold">
            {prod.name}
          </h3>
        </div>
      </div>
    ))}
  </div>
</div>
      </div>
</div>

  </>
}
