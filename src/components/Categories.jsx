import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";
import { useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

function Categories({ limit }) {
  const [categories, setCategories] = useState([]);
  const getAllCategories = async () => {
    let { data } = await Axios.get(`/categories?limit=${limit}`);
    setCategories(data.categories);
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <>
      {/* category text*/}
      <div className="container py-16">
        {categories.length > 0 ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-3">
            {/* item */}
            {categories.map((item) => (
              <Link to={`/category/${item._id}`}>
                <div
                  key={item._id}
                  className="relative rounded-full overflow-hidden group border border-blue-200 p-1"
                >
                  <div className="h-20 w-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover rounded-full w-full h-full"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-xl text-blue-900 font-roboto font-medium group-hover:bg-blue-900 group-hover:text-white transition">
                    {item.name}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </>
  );
}

export default Categories;
