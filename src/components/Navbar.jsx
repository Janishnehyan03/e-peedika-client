// src/components/Navbar.js
import { faTools, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { UserAuthContext } from "../context/UserAuth";
import { Link } from "react-router-dom";
import Axios from "../Axios";

const Navbar = () => {
  const { authData } = useContext(UserAuthContext);
  const logout = async () => {
    try {
      let response = await Axios.post("/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="flex items-center">
        <a href="/" className="text-3xl font-bold  text-[#172841]">
          E<span className="text-[#d54646]">.</span>
          Peedika
        </a>
      </div>

      {authData ? (
        <div className="flex justify-around items-center">
          <Link
            to={"/dashboard"}
            className="ml-4 bg-blue-900 px-2 py-2 rounded-lg hover:text-blue-900 hover:bg-transparent transition cursor-pointer border border-blue-900 text-white"
          >
            <FontAwesomeIcon icon={faTools} className="text-2xl" />{" "}
            <span className="font-bold">Dashboard</span>
          </Link>
          <button
            onClick={logout}
            className="text-red-500 font-bold uppercase ml-2"
          >
            logout
          </button>
        </div>
      ) : (
        <div className="flex justify-around items-center">
          <Link
            to={"/login"}
            className="ml-4 bg-blue-900 px-2 py-2 rounded-lg hover:text-blue-900 hover:bg-transparent transition cursor-pointer border border-blue-900 text-white"
          >
            <FontAwesomeIcon icon={faUser} className="text-2xl" />{" "}
            <span className="font-bold">Login</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
