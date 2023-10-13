import { faPen, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Axios from "../../Axios";
import Categories from "../../components/Categories";
import LoadingSpinner from "../../components/LoadingSpinner";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortingOption, setSortingOption] = useState("Default");
  const [categories, setCategories] = useState([]);

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
      let { data } = await Axios.get("/products", {
        params: {
          category: selectedCategory,
          lowtoHigh: sortingOption === "lowtoHigh" ? 1 : undefined,
          hightoLow: sortingOption === "hightoLow" ? 1 : undefined,
        },
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSortingOption(event.target.value);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [selectedCategory, sortingOption]);
  return (
    <div className="mb-[3rem] ">
      <h1 className="text-6xl text-center border border-blue-900 text-blue-900 font-medium  py-3 rounded-full uppercase mb-6">
        Dashboard
      </h1>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-center mt-4 text-blue-900 font-bold text-2xl uppercase  px-2 py-1 rounded-full max-w-sm mx-auto">
            categories
          </h1>
          <Link
            to={`/add-category`}
            className="bg-blue-900 px-4 rounded-full py-2 text-white uppercase font-bold"
          >
            <FontAwesomeIcon icon={faPen} /> create new category
          </Link>
        </div>

        <Categories />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-center mt-4  font-bold text-2xl uppercase text-black px-5 py-2 rounded max-w-sm mx-auto">
            products
          </h1>
          <Link
            to={`/add-product`}
            className="text-center mt-4 bg-blue-900 font-bold text-2xl uppercase text-white px-5 py-2 rounded max-w-sm mx-auto"
          >
            + Add New Product
          </Link>
        </div>
        <div className="flex items-center rounded-full px-3 w-64">
          <input
            type="text"
            placeholder="Search"
            className="py-2 px-4 w-full rounded-full outline-none text-gray-700"
          />
          <div className="p-3 rounded-r-full">
            <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div className="w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Filter by Category
              </label>
              <select
                className="block w-full bg-white border border-gray-300 rounded py-2 px-4"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="All">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/2">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Sort by
              </label>
              <select
                className="block w-full bg-white border border-gray-300 rounded py-2 px-4"
                value={sortingOption}
                onChange={handleSortingChange}
              >
                <option value="Default">Default Sorting</option>
                <option value="lowtoHigh">Price: Low to High</option>
                <option value="hightoLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-4">
              {products.map((item, productIndex) => (
                <div
                  key={productIndex}
                  class="product-card bg-white w-80 relative shadow-md mx-auto mt-10 p-4"
                >
                  <div class="product-tumb h-64  flex items-center justify-center float-left">
                    <img
                      src={item.img}
                      alt="Product Image"
                      class="w-full h-56"
                    />
                  </div>
                  <div class="product-details p-4 float-left">
                    <div class="absolute left-0 top-4 uppercase text-xs font-semibold bg-red-600 text-white px-4 py-1">
                      3% off
                    </div>
                    <span class="product-catagory block text-xs font-semibold text-gray-600 uppercase mb-2">
                      {item?.category?.name}
                    </span>
                    <h4 class="text-lg uppercase font-medium text-gray-900 hover-text-yellow-500">
                      <a href="">{item.title}</a>
                    </h4>
                    <p class="text-sm capitalize text-gray-600 leading-6 mt-2">
                      {item.description}
                    </p>
                    <div class="product-bottom-details overflow-hidden border-t border-gray-300 pt-4">
                      <div class="w-1/2 float-left">
                        <div class="text-xl text-yellow-500 font-semibold">
                          ₹{item.price}
                        </div>
                      </div>
                      <div class="w-1/2 float-left text-right">
                        <div class="text-sm text-gray-700 line-through inline-block mr-2">
                          $96.00
                        </div>
                        <div class="product-links inline-block">
                          <a
                            href=""
                            class="text-gray-400 hover-text-yellow-500"
                          >
                            <i class="fas fa-heart"></i>
                          </a>
                          <a
                            href=""
                            class="text-gray-400 hover-text-yellow-500"
                          >
                            <i class="fas fa-shopping-cart"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
