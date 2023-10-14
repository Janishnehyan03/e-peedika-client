import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import LoadingSpinner from "./LoadingSpinner";

function Categories({ limit }) {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    try {
      const { data } = await Axios.get(`/categories?limit=${limit}`);
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="flex justify-center items-center py-4">
      {categories.length > 0 ? (
        <div className="grid grid-cols-8 space-x-4">
          {categories.map((item) => (
            <Link to={`/category/${item._id}`} key={item._id}>
              <div className="flex flex-col items-center mx-2 group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-28 h-28 rounded-full "
                />
                <p className="text-center mt-2 group-hover:text-orange-500 font-semibold">{item.name}</p>
              </div>
            </Link>
          ))}
          <Link to="/categories">
            <div className="flex flex-col items-center mx-2">
              <div className="w-24 h-24 rounded-full group transition hover:bg-gray-600 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-700 text-center font-bold group-hover:text-white">
                  View All
                </p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default Categories;
