import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from "react-helmet";
import { CartContext } from '../../context/CartContext';
import { WishlistContext } from '../../context/WishlistContext';
import Spinner from '../Spinner/Spinner';

export default function Products() {
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [searchProducts, setSearchProducts] = useState([]);
  const [wishlistState, setWishlistState] = useState(() => {
    return JSON.parse(localStorage.getItem('wishlistState')) || {};
  });

  async function getProducts() {
    let resp = await axios('https://ecommerce.routemisr.com/api/v1/products');
    setProducts(resp.data.data);
    setSearchProducts(resp.data.data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('wishlistState', JSON.stringify(wishlistState));
  }, [wishlistState]);

  async function addProductToCart(id) {
    let { data } = await addToCart(id);
    if (data.status === 'success') {
      toast.success(data.message, { position: "top-right" });
    } else {
      toast.error(data.message, { position: "top-right" });
    }
  }

  async function addToFav(id) {
    let { data } = await addToWishlist(id);
    setWishlistState((prevState) => ({
      ...prevState,
      [id]: !prevState[id], 
    }));
    if (data.status === 'success') {
      toast.success(data.message, { position: "top-right" });
    } else {
      toast.error(data.message, { position: "top-right" });
    }
  }

  function searchProductsFn(e) {
    if (e.target.value === "") {
      setSearchProducts(products);
    } else {
      let filterProducts = products.filter((prod) =>
        prod.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearchProducts(filterProducts);
    }
  }

  return (
    <>
      <div className="application">
        <Helmet>
          <title>Freshcart Products</title>
        </Helmet>
      </div>
      {searchProducts.length > 0 ? (
        <div className="flex flex-wrap py-4 space-y-6">
          <input
            onChange={searchProductsFn}
            type="text"
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Search for products..."
          />
          {searchProducts.map((prod) => (
            <div key={prod.id} className="w-full md:w-1/2 lg:w-1/4 rounded-md shadow-md hover:shadow-green-500">
              <div className="product px-6 py-10 group">
                <Link to={`/productDetails/${prod.id}/${prod.category.name}`}>
                  <img src={prod.imageCover} className="w-full" alt="" />
                  <span className="text-green-700 font-light">{prod.category.name}</span>
                  <h3 className="text-xl font-normal">
                    {prod.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex justify-between">
                    <span>{prod.price} EGP</span>
                    <span>{prod.ratingsAverage}<i className="fas fa-star text-yellow-300"></i></span>
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addProductToCart(prod._id)}
                    className="btn opacity-0 group-hover:opacity-100 transition-all"
                  >
                    Add To Cart
                  </button>
                  <i
                    className="fa-solid text-red-700 fa-heart text-3xl"
                    onClick={() => addToFav(prod._id)}
                    
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}





























































































