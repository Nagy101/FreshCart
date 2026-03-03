/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { FavContext } from "../../Context/FavContext";
import { CartContaxt } from "../../Context/CartContext";

export default function FavProduct() {
  let { favProduct, deletedProduct } = useContext(FavContext);
  let { addProductToCart } = useContext(CartContaxt);

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-main text-center mb-8">
        <i className="fa-regular fa-heart mr-2" /> My Wishlist
      </h2>

      {favProduct && favProduct.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favProduct.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden flex flex-col transition-transform hover:-translate-y-1"
            >
              <img
                className="w-full h-52 object-contain bg-gray-50 p-4"
                src={item.imageCover}
                alt={item.title}
              />
              <div className="p-4 flex flex-col flex-1">
                <h5 className="text-base font-semibold text-gray-900 truncate mb-1">
                  {item.title.split(" ", 3).join(" ")}
                </h5>
                <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => addProductToCart(item.id)}
                    className="w-full bg-main text-white py-2 rounded-lg hover:bg-blue-800 transition duration-200 text-sm font-medium"
                  >
                    <i className="fa-solid fa-cart-plus mr-1" /> Add to Cart
                  </button>
                  <button
                    onClick={() => deletedProduct(item.id)}
                    className="w-full border border-red-400 text-red-500 py-2 rounded-lg hover:bg-red-50 transition duration-200 text-sm font-medium"
                  >
                    <i className="fa-solid fa-trash mr-1" /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <i className="fa-regular fa-heart text-6xl text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-500 mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-gray-400 text-sm">
            Add products you love to your wishlist.
          </p>
        </div>
      )}
    </div>
  );
}
