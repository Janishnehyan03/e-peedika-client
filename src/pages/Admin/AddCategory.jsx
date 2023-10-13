import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "../../Axios";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setPreviewImage(URL.createObjectURL(selectedImage)); // Create a preview URL for the selected image
    setImage(selectedImage);
  };

  const sendToCloudinary = async () => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "mern-chat");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/mern-chat/image/upload",
        formData
      );
      const { secure_url } = res.data;
      return secure_url; // Return the secure URL
    } catch (error) {
      console.log(error);
      throw error; // Rethrow the error
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const imageUrl = await sendToCloudinary(); // Wait for the image upload
      if (typeof imageUrl === "string") {
        let res = await Axios.post("/categories", {
          name,
          description,
          image: imageUrl, // Use the secure URL from Cloudinary
        });
        if (res.data.success) {
          setName("");
          setDescription("");
          setImage("");
          toast.success("Category created successfully", {
            position: "top-center",
            autoClose: 2000,
          });
          window.location.href = "/dashboard";
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <h3 className="text-lg text-center uppercase font-bold leading-6 text-gray-900">
          create Category
        </h3>
        <form
          onSubmit={addProduct}
          encType="multipart/form-data"
          className="max-w-lg mx-auto"
        >
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label
                htmlFor="category-name"
                className="block text-sm font-medium text-gray-700"
              >
                Category Name
              </label>
              <input
                type="text"
                id="category-name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="category-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="product-description"
                className="block text-sm font-medium text-gray-700"
              >
                Product Description
              </label>
              <input
                type="text"
                id="product-description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                autoComplete="product-description"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cover photo
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="mx-auto h-20 w-20"
                  />
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
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, up to 10MB
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right">
              {loading ? (
                <CircularProgress />
              ) : (
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </>
  );
}

export default AddCategory;
