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
        <h2 className="text-3xl mt-5 font-medium text-gray-800 uppercase">
          Shop by category
        </h2>
        <Link to={'/categories'} className="bg-blue-900 px-3 py-1 text-white rounded-3xl">view all</Link>
      </div>
      <Categories limit={9} />
      <Products cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
}

export default Home;
