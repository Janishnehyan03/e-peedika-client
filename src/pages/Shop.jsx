import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Axios from "../Axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserAuthContext } from "../context/UserAuth";

function Index({ cartOpen, setCartOpen }) {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const { authData } = useContext(UserAuthContext);
  const { id } = useParams();
  const getCategory = async () => {
    const response = await Axios.get(`/categories/${id}`);
    setCategory(response.data.category);
  };
  const getProducts = async () => {
    const response = await Axios.get(`/products?category=${id}`);
    setProducts(response.data.products);
  };
  const deleteCategory = async () => {
    try {
      if (window.confirm("You cannot undo this action")) {
        const response = await Axios.delete(`/categories/${id}`);
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProducts();
    getCategory();
  }, []);
  return (
    <>
      <ToastContainer />
      <div>
        <div className="w-full ">
          <div
            className="w-full h-full  transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col" id="cart">
              <div className=" w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8">
                <Link
                  to={`/`}
                  className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                >
                  {"<"}
                  <p className="text-sm  leading-none">Back</p>
                </Link>
                <div className="flex items-center space-x-2">
                  <img
                    src={category?.image}
                    className="h-28 w-28 rounded-full"
                    alt=""
                  />
                  <p className="text-5xl font-black mb-2 leading-10 text-gray-800 pt-3">
                    {category?.name}
                  </p>
                </div>
                <p className=" font-medium mb-2  text-gray-800 pt-3">
                  {category?.description}
                </p>
                {authData?.isAdmin && (
                  <div className="my-8 flex space-x-10">
                    <Link to={`/admin/edit-category/${category?._id}`}>
                      <FontAwesomeIcon icon={faPen} /> Edit Category
                    </Link>

                    <button
                      onClick={deleteCategory}
                      className="text-red-600 font-bold ml-2"
                    >
                      <FontAwesomeIcon icon={faTrash} /> Delete Category
                    </button>
                  </div>
                )}

                {products.length > 0 ? (
                  <div className="grid grid-cols-2">
                    {products.map((item, index) => (
                      <Link
                        key={index}
                        to={`/product/${item._id}`}
                        className="md:flex items-center hover:bg-gray-200 mx-2 p-3 py-8 border-t border-b border-gray-200"
                      >
                        <div className="h-full w-1/2">
                          <img
                            src={item.img}
                            alt
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="md:pl-3 md:w-3/4 w-full">
                          <div className="flex items-center justify-between w-full pt-1">
                            <p className="text-base uppercase font-black leading-none text-gray-800">
                              {item.title}
                            </p>
                          </div>

                          <p className="my-3  text-gray-600">
                            {item.description.slice(0, 200)}
                          </p>

                          <div className="text-xl text-red-500 font-semibold">
                            {item.discount ? (
                              <>
                                <div className="flex justify-between">
                                  <span
                                    style={{
                                      textDecoration: "line-through",
                                      fontSize: 14,
                                    }}
                                  >
                                    ₹{Math.floor(item.price)}
                                  </span>{" "}
                                  <p className="text-green-600">
                                    ₹
                                    {Math.floor(item.price) -
                                      Math.floor(item.price) *
                                        (item.discount / 100)}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <p className="text-green-600">
                                {" "}
                                ₹{Math.floor(item.price)}
                              </p>
                            )}
                          </div>
                          {item?.discount > 0 && (
                            <button className="bg-blue-900 m-3 text-white py-1 px-2">
                              {item.discount}% off
                            </button>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <LoadingSpinner />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
