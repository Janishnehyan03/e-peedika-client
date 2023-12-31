import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "../Axios";
import { ProductContext } from "../context/ProductContext";

function Products() {
  const [products, setProducts] = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
          discount: sortingOption === "discount" ? 1 : undefined,
          aToz: sortingOption === "aToz" ? 1 : undefined,
          zToa: sortingOption === "zToa" ? 1 : undefined,
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
    <>
      <ToastContainer />
      <div className="container pb-16">
        <h2 className="text-xl font-medium text-orange-800  mb-6">
          ({filteredProducts.length}) results
        </h2>
        <div className="flex items-center rounded-full px-3">
          <input
            type="text"
            placeholder="Search"
            onChange={handleSearch}
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
                <option value="aToz">A-Z</option>
                <option value="lowtoHigh">Price: Low to High</option>
                <option value="hightoLow">Price: High to Low</option>
                <option value="discount">Offer Products</option>
              </select>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <>
            <div className="flex justify-center">
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <div className="grid space-x-2 md:grid-cols-4">
              {/* item */}
              {filteredProducts.map((item, key) => (
                <Link
                  to={`/product/${item._id}`}
                  class="hover:bg-gray-100 mx-2 bg-white w-80 relative shadow-md mt-10 p-4"
                >
                  {item.discount > 0 && (
                    <div class="absolute left-0 top-4 uppercase text-xs font-semibold bg-red-600 text-white px-4 py-1">
                      {item?.discount}% off
                    </div>
                  )}
                  <div class="product-tumb h-64  flex items-center justify-center">
                    <img
                      src={item.img}
                      alt="Product Image"
                      class="w-full h-56"
                    />
                  </div>
                  <div class="relative p-4">
                    <span class="product-catagory block text-xs font-semibold text-gray-600 uppercase mb-2">
                      {item?.category?.name}
                    </span>
                    <h4 class="text-lg uppercase font-medium text-gray-900 hover:text-yellow-500">
                      <a href="">{item.title}</a>
                    </h4>
                    <p class="text-sm capitalize text-gray-600 leading-6 mt-2">
                      {item.description.slice(0, 200)}
                    </p>
                    <div class="product-bottom-details overflow-hidden border-t border-gray-300 pt-4">
                      <div className="w-1/2 float-left">
                        <div className="text-xl text-red-500 font-semibold">
                          {item.discount ? (
                            <>
                              <div className="flex justify-between">
                                <p className="text-green-600 text-xl font-semibold bg-green-200 py-1 px-3 rounded-full">
                                  ₹
                                  {Math.floor(item.price) -
                                    Math.floor(item.price) *
                                      (item.discount / 100)}
                                </p>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    fontSize: 14,
                                  }}
                                  className="absolute right-0"
                                >
                                  ₹{Math.floor(item.price)}
                                </span>{" "}
                              </div>
                            </>
                          ) : (
                            <span className="text-green-600 text-xl font-semibold bg-green-200 py-1 px-3 rounded-full">
                              {" "}
                              ₹{Math.floor(item.price)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Products;
