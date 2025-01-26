import axios from 'axios';
import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';



export default function Brands() {

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }
 let {data,isError,isLoading,isFetched,error} = useQuery({
  queryKey:'getBrands',
  queryFn:getBrands,
  select:(data)=>{return data.data.data},
 })
 console.log(data);
 

if(isLoading){
  return <Loader/>
}
if(isError){
  return error
}

  return (
    <>
     <div className="application">
  <Helmet>  
      <title>Freshcart Brands</title>
  </Helmet>
 </div>
 <h1 className='text-center text-green-400 py-4 text-4xl'>All Brands</h1>
 <div className="container mx-auto px-4 py-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {data?.map((brand) => (
      <div
        key={brand.name}
        className="rounded-md border text-center hover:shadow-green-400 shadow-md transition-all p-4"
      >
        <img
          src={brand.image}
          className="w-full h-40 object-cover rounded-md mb-3"
          alt={brand.name}
        />
        <h6 className="text-lg font-semibold">{brand.name}</h6>
      </div>
    ))}
  </div>
</div>

    </>
  )
}
