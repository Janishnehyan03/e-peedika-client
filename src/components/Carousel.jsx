import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default ({ products }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="mySwiper"
    >
      {products.map((product) => (
        <SwiperSlide key={product._id}>
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="relative mx-1 cursor-pointer w-full overflow-hidden group flex items-center justify-center"
          >
            <img
              src={product.img}
              className="object-cover w-full h-96 rounded-lg"
              alt=""
            />
            <div className="absolute flex flex-col items-center bg-black  bg-opacity-40 text-white font-roboto font-medium group-hover:bg-opacity-60 transition p-4 rounded-lg">
              <h1 className="text-3xl font-bold  uppercase text-white py-1 px-2  text-center">
                {product.title}
              </h1>
              <p className="text-gray-300 max-w-lg text-sm font-sans text-center mt-2">
                {product.description.slice(0, 150)}
              </p>
              <p className="text-xl font-bold my-4 text-center">₹{product.price}</p>
              {product.discount > 0 && (
                <button className="bg-red-500 text-white py-1 px-4 rounded-lg text-center">
                  {product.discount}% Off
                </button>
              )}
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
