import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Axios from "../Axios";
import { UserAuthContext } from "../context/UserAuth";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

function ProductView() {
  // console params from url
  const [product, setProduct] = useState({});
  const { authData } = useContext(UserAuthContext);

  const params = useParams();
  const productId = params.id;
  const getProduct = async () => {
    try {
      let res = await Axios.get(`/products/${productId}`);
      if (res.status === 200) {
        setProduct(res.data.product);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteProduct = async () => {
    try {
      if (window.confirm("Are you sure to delete this product")) {
        let res = await Axios.delete(`/products/${productId}`);
        toast.success("product deleted", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <ToastContainer />
      {/* component */}
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full object-cover object-center rounded-lg border border-gray-200"
              src={product.img}
            />

            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              {product.discount>0 && (
                <span className="text-sm mb-3 title-font bg-red-700 p-1 rounded-lg text-white  tracking-widest">
                  {product?.discount}% off
                </span>
              )}
              <div className="my-3">
                <Link
                  to={`/category/${product?.category?._id}`}
                  className="text-sm title-font mt-3 cursor-pointer text-gray-500 tracking-widest"
                >
                  <span className="font-bold bg-gray-300 p-1">
                    {product?.category?.name}
                  </span>
                </Link>
              </div>
              <h1 className="text-gray-900 text-3xl uppercase title-font font-medium mb-1">
                {product.title}
              </h1>

              <p className="leading-relaxed">{product.description}</p>

              {product?.discount ? (
                <>
                  <div className="font-bold ">
                    <span
                      style={{
                        textDecoration: "line-through",
                        fontSize: 13,
                        color: "gray",
                      }}
                    >
                      ₹{Math.floor(product?.price)}
                    </span>{" "}
                    <p className="text-green-600 text-2xl">
                      ₹
                      {Math.floor(product?.price) -
                        Math.floor(product?.price) * (product?.discount / 100)}
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-green-600 text-2xl">
                  {" "}
                  ₹{Math.floor(product?.price)}
                </p>
              )}

              {authData?.isAdmin && (
                <>
                  <div className="mt-3">
                    <Link
                      to={`/admin/edit-product/${product?._id}`}
                      className="bg-orange-600  mt-3 px-3 py-1 text-white "
                    >
                      <FontAwesomeIcon icon={faPen} className="mr-2" /> Edit
                      Product
                    </Link>
                  </div>
                  <button
                    onClick={() => deleteProduct()}
                    className="bg-red-600 mt-3 px-3 py-1 text-white "
                  >
                    <FontAwesomeIcon icon={faTrash} className="mr-2" />
                    Delete Product
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductView;
