import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";

export default function EditProduct() {
  const paramsId = window.location.pathname.split("/")[3];

  const [product, setProduct] = useState([]);
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [img, setImg] = useState(product.img);
  const [description, setDescription] = useState(product.description);
  const [categories, setCategories] = useState(product.categories);
  const [stock, setStock] = useState(product.stock);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(product.size);
  const [discount, setDiscount] = useState(product.discount);
  const [colors, setColors] = useState(product.colors);
  const [category, setCategory] = useState([]);
  const [popular, setPopular] = useState(product.popular);
  const [allCategories, setAllCategories] = useState([]);

  const getAllCategories = () => {
    Axios.get("/categories").then((res) => {
      setAllCategories(res.data.categories);
    });
  };

  const getProduct = async () => {
    let { data } = await Axios.get(`/products/${paramsId}`);
    setProduct(data.product);
    setTitle(data.product.title);
    setPrice(data.product.price);
    setImg(data.product.img);
    setDescription(data.product.description);
    setCategories(data.product.categories);
    setStock(data.product.stock);
    setSize(data.product.size);
    setDiscount(data.product.discount);
    setColors(data.product.colors);
    setColors(data.product.popular);
    setPopular(data.product.popular);
  };

  const editProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Check if there is a file selected
      if (img) {
        // Create a new FormData object
        const formData = new FormData();
        formData.append("file", img);
        formData.append("upload_preset", "mern-chat"); // Replace 'your_upload_preset' with your actual upload preset name in Cloudinary

        // Upload the image to Cloudinary
        const cloudinaryResponse = await axios.post(
          "https://api.cloudinary.com/v1_1/mern-chat/image/upload",
          formData
        );

        // Get the image URL from the Cloudinary response
        const imageUrl = cloudinaryResponse.data.secure_url;

        // Make the PATCH request with the updated image URL
        let res = await Axios.patch(`/products/${paramsId}`, {
          title,
          price,
          img: imageUrl, // Use the Cloudinary image URL
          description,
          categories,
          stock,
          size,
          discount,
          colors,
          popular,
        });

        if (res.status === 200) {
          toast.success("Product updated Successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          setTitle("");
          setPrice("");
          setImg("");
          setDescription("");
          setCategories([]);
          setStock("");
          setLoading(false);
          window.location.href = "/";
        }
      } else {
        // If no image is selected, proceed with the PATCH request without updating the image
        let res = await Axios.patch(
          `/products/${paramsId}`,
          {
            title,
            price,
            img,
            description,
            categories,
            stock,
            size,
            discount,
            colors,
          },
          {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );

        if (res.status === 200) {
          toast.success("Product updated Successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Error");
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
    getAllCategories();
  }, []);
  return (
    <>
      <ToastContainer />
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
      <h3 className="text-3xl uppercase text-center  font-bold leading-6 text-gray-900">
        Edit Product
      </h3>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4  sm:px-0"></div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Product Stock
                      </label>
                      <input
                        type="number"
                        name="first-name"
                        id="first-name"
                        autoComplete="given-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setStock(e.target.value)}
                        value={stock}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Product price
                      </label>
                      <input
                        type="number"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        placeholder="$100"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => setPrice(e.target.value)}
                        value={price}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Discount (%)
                      </label>
                      <input
                        type="number"
                        name="last-name"
                        id="last-name"
                        autoComplete="family-name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        placeholder="optional"
                        onChange={(e) => setDiscount(e.target.value)}
                        value={discount}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Category
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                      >
                        {allCategories.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <div className="mt-4 flex items-center">
                        <input
                          id="popular"
                          name="popular"
                          type="checkbox"
                          onChange={(e) => {
                            setPopular(!popular);
                          }}
                          checked={popular} // Set the checked attribute based on the product.popular value
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />

                        <label
                          htmlFor="popular"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Popular Product
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {typeof img === "object" ? (
                          <img
                            src={URL.createObjectURL(img)}
                            alt="Preview"
                            className="h-62 mt-2"
                          />
                        ) : (
                          <img src={img} alt="Preview" className="h-62 mt-2" />
                        )}
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={(e) => setImg(e.target.files[0])}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG or JPG up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <button
                      type="submit"
                      onClick={(e) => editProduct(e)}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}
