import React from 'react'
import { useContext } from 'react'
import { WishlistContext } from '../../context/WishlistContext'
import { Link } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'

export default function Wishlist() {
    const { wishlistItems, toggleWishlist } = useContext(WishlistContext);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
            
            {wishlistItems.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg">Your wishlist is empty</p>
                    <Link to="/" className="text-green-600 hover:text-green-700 mt-4 inline-block">
                        Continue Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="relative">
                                <Link to={`/product/${product.id}`}>
                                    <img 
                                        src={product.imageCover} 
                                        alt={product.title} 
                                        className="w-full h-48 object-cover"
                                    />
                                </Link>
                                <button 
                                    onClick={() => toggleWishlist(product)}
                                    className="absolute top-2 right-2 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors"
                                >
                                    <FaHeart className="text-xl text-red-500" />
                                </button>
                            </div>
                            <div className="p-4">
                                <Link to={`/product/${product.id}`}>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                        {product.title}
                                    </h3>
                                </Link>
                                <p className="text-gray-600 text-sm mb-2">
                                    {product.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-green-600 font-bold">
                                        ${product.price}
                                    </span>
                                    <Link 
                                        to={`/product/${product.id}`}
                                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
} 