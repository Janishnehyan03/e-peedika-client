import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../Axios";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";

function Features() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };
  const getCategories = async () => {
    try {
      let { data } = await Axios.get("/categories");
      setCategories(data.categories);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getProducts = async () => {
    try {
      let { data } = await Axios.get("/products?popular=true&limit=3");
      setProducts(data.products);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  return (
    <div>
      <div className="flex ">
        <div className="w-1/4">
          <div className="bg-orange-600 text-white p-2">
            <p>
              <FontAwesomeIcon icon={faList} className="mr-3" />
              Browse categories
            </p>
          </div>
          {categories.length > 0 ? (
            <>
              {categories.slice(0, 10).map((item, key) => (
                <div
                  key={key}
                  className="bg-gray-100 hover:bg-gray-400 cursor-pointer border-b-2 border-gray-300 text-gray-700 font-semibold p-2"
                >
                  <Link to={`/category/${item?._id}`}>
                    {item?.name}{" "}
                    <span
                      className="float-right cursor-pointer"
                      onClick={() => handleCategoryClick(item)}
                    >
                      {selectedCategory === item ? "-" : "+"}
                    </span>
                  </Link>
                  {selectedCategory === item && (
                    <p className="text-gray-600 font-thin text-sm mt-2">
                      {/* Add your category description here */}
                      {item.description}
                    </p>
                  )}
                </div>
              ))}
              <div
                className="bg-gray-200 text-blue-700 font-semibold p-2"
                onClick={() => setSelectedCategory("show-all")}
                style={{ cursor: "pointer" }}
              >
                <Link to={'/categories'}>Show All</Link>
              </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div>
        <div className="w-3/4">
          <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Popular Products
            </h2>
            {products.length > 0 ? (
              <div className="flex">
                <Link
                  to={`/product/${products[0]?._id}`}
                  key={products[0]?._id}
                  className="relative mx-1 cursor-pointer  overflow-hidden group"
                >
                  <img
                    src={products[0]?.img}
                    className="object-cover  w-full h-full" // Add this class
                    alt=""
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center  text-white font-roboto font-medium group-hover:bg-opacity-60 transition">
                    <div className="flex mx-4 flex-col text-center items-center">
                      <h1 className="text-xl font-bold bg-blue-900 mb-4 text-white py-1 px-2">
                        {products[0]?.title}
                      </h1>
                      <p className="text-gray-200 text-[12px] font-sans uppercase">
                        {products[0]?.description.slice(0,200)}
                      </p>
                      <p className="text-xl font-bold my-4">
                        ₹{products[0]?.price}
                      </p>
                      <button className="border-white rounded-full border-2 w-1/2  text-white py-1 px-2">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </Link>

                <div className="">
                  {products.slice(1).map((product) => (
                    <Link
                      to={`/product/${product?._id}`}
                      key={product?._id}
                      className="relative hover:bg-gray-200 transition mx-1 cursor-pointer bg-gray-100 mb-1 rounded-sm overflow-hidden group flex"
                    >
                      <img
                        src={product?.img}
                        className="object-cover w-1/2 h-full"
                        alt=""
                      />
                      <div className="w-1/2 m-3 relative ">
                        <h1 className="text-xl text-blue-900 font-roboto font-medium transition">
                          {product?.title}
                        </h1>
                        <p className="uppercase">{product?.description.slice(0,100)}</p>
                        <p className="text-xl font-bold my-2">
                          ₹{product?.price}
                        </p>
                        <button className="bg-blue-900 text-white py-1 px-2">
                          Buy Now
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
