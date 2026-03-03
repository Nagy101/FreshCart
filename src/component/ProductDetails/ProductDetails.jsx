/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Loding from "../Loding/Loding";
import { CartContaxt } from "../../Context/CartContext";

export default function ProductDetails() {
  let { addProductToCart } = useContext(CartContaxt);
  let { id } = useParams();
  const [product, setproduct] = useState(null);
  const [loding, setLoding] = useState(true);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  async function getProducts(productId) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`,
    );
    console.log(data.data);
    setproduct(data.data);
    setLoding(false);
  }
  useEffect(() => {
    getProducts(id);
  }, []);
  return (
    <>
      {loding ? (
        <Loding />
      ) : (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row gap-0">
            {/* Image Slider */}
            <div className="md:w-2/5 bg-gray-50 p-6 flex items-center justify-center">
              <Slider {...settings} className="w-full">
                <div>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-72 object-contain rounded-xl"
                  />
                </div>
                {product.images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-72 object-contain rounded-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>

            {/* Product Info */}
            <div className="md:w-3/5 p-8 flex flex-col justify-between">
              <div>
                <span className="inline-block text-xs font-semibold text-main bg-blue-50 px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
                  {product.category.name}
                </span>
                <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-3">
                  {product.title}
                </h1>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>

                <div className="flex items-center gap-1 text-yellow-400 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${
                        i < Math.round(product.ratingsAverage)
                          ? "fa-solid"
                          : "fa-regular"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {product.ratingsAverage} / 5
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {product.price.toLocaleString()} EGP
                  </span>
                  {product.priceAfterDiscount && (
                    <span className="text-sm line-through text-gray-400">
                      {product.priceAfterDiscount} EGP
                    </span>
                  )}
                </div>
                <button
                  onClick={() => addProductToCart(product.id)}
                  className="w-full bg-main hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition duration-200 flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-cart-plus" />
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
