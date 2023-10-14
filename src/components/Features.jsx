import { faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "../Axios";
import LoadingSpinner from "./LoadingSpinner";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";

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
      let { data } = await Axios.get("/products?popular=true&limit=5");
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
        {/* <div className="w-1/4">
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
                      {item?.description}
                    </p>
                  )}
                </div>
              ))}
              <div
                className="bg-gray-200 text-blue-700 font-semibold p-2"
                onClick={() => setSelectedCategory("show-all")}
                style={{ cursor: "pointer" }}
              >
                <Link to={"/categories"}>Show All</Link>
              </div>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </div> */}
        <div className="w-full">
          <div className="p-4">
            <h2 className="text-3xl uppercase font-semibold mb-4 text-center">
              Popular Products
            </h2>
            {products.length > 0 ? (
              <div className="flex">
                <Carousel products={products} />
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
