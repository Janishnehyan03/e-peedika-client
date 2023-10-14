import React from "react";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Features from "../components/Features";
import Products from "../components/Products";
import { Link } from "react-router-dom/cjs/react-router-dom";

function Home({ cartOpen, setCartOpen }) {
  return (
    <>
      {/* <Banner /> */}
      <Features />
      <div className="flex mt-3 justify-between items-center">
        <div className="flex flex-col items-center mx-auto my-8">
          <h2 className="text-3xl mt-5 text-center font-medium text-gray-800 uppercase">
            explore the categories
          </h2>
        </div>
      </div>
      <Categories limit={7} />
      <div className="flex flex-col items-center mx-auto my-8">
        <h2 className="text-3xl mt-5 text-center font-medium text-gray-800 uppercase">
          our latest products
        </h2>
      </div>
      <Products cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
}

export default Home;
