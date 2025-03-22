import React, { useContext, useEffect, useState } from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { CounterContext } from '../../context/CounterContext'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import { WishlistContext } from '../../context/WishlistContext'
import { Helmet } from 'react-helmet'


export default function RecentProducts() {
let [RedHeart,setHeart] = useState(false)
 let {addToWishlist} = useContext(WishlistContext)
 let {addToCart}= useContext(CartContext)
 let [Products,setProducts] = useState([])
 let [searchProducts,setSearchProducts] = useState([])
const [wishlistState, setWishlistState] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlistState')) || {};
  });


  function getProducts() {
    return axios('https://ecommerce.routemisr.com/api/v1/products')   
}


 async function getProducts() {
    let resp = await axios('https://ecommerce.routemisr.com/api/v1/products')
    console.log(resp.data.data)
    setProducts(resp.data.data)    
    setSearchProducts(resp.data.data)
}
useEffect(()=>{getProducts()},[])


async function addProducrToCart(id){
let {data}=  await addToCart(id)

console.log(data);
if(data.status=='success'){
toast.success(data.message , {
  position: "top-right",
  
})

}
else{
toast.error(data.message , {
  position: "top-right",
  
})
}
}

async function addToFav(id) {
  let { data } = await addToWishlist(id);
  setWishlistState((prevState) => ({
    ...prevState,
    [id]: !prevState[id], 
  }));
  console.log(data);
  if (data.status === 'success') {
    toast.success(data.message, { position: "top-right" });
  } else {
    toast.error(data.message, { position: "top-right" });
  }
}


function searchProductsFn(e) {
console.log(e.target.value);

if (e.target.value == "") {
  setSearchProducts(Products)
} else {
  let myProds = [...Products];
  let filterProducts = myProds.filter((prod) => {
      return prod.title.toLowerCase().includes(e.target.value);
  });
  setSearchProducts(filterProducts);

}
}

 useEffect(() => {
    localStorage.setItem('wishlistState', JSON.stringify(wishlistState));
  }, [wishlistState]);

return (
<>
{searchProducts.length >0 ?<div className="flex flex-wrap py-4">
 <input onChange={(e)=>{searchProductsFn(e)}} type="text" id="first_name" className="bg-gray-50 border mt-5 w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
{searchProducts?.map((prod)=>{return <div key={prod.id} className='w-full md:w-1/2 lg:w-1/4'>
    <div  className=" product px-6 py-10 group  ">
  <Link  to={`/productDetails/${prod.id}/${prod.category.name}`}>
    <img src={prod.imageCover} className='w-full' alt="" />
    <span className='text-green-700 font-light'>{prod.category.name}</span>
    <h3 className='text-xl font-normal'>{prod.title.split(' ').slice(0,2).join(' ')}</h3>
    <div className="flex justify-between">
      <span>{prod.price}  EGP</span>
      <span>{prod.ratingsAverage}<i className="fas fa-star text-yellow-300"></i></span>
    </div>
  </Link>
  <div className='flex items-center gap-2'>
  <button  onClick={()=>{addProducrToCart(prod._id)}}   className='btn opacity-0 group-hover:opacity-100  transition-all'>Add To Cart</button>
      <i class="fa-solid text-red-700 fa-heart text-3xl" onClick={()=>{addToFav(prod._id)}}  
      ></i>
  </div>
  
  </div>
  </div> })}

</div>:<Spinner/>}


</>)
}
