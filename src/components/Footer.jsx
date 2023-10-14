import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8">
      <div className="flex flex-wrap justify-around max-w-6xl m-auto">
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
          <h3 className="text-lg font-bold mb-2">About Us</h3>
          <ul className="text-sm">
            <li>Our Story</li>
            <li>Mission and Vision</li>
            <li>Testimonials</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
          <h3 className="text-lg font-bold mb-2">Customer Service</h3>
          <ul className="text-sm">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Returns and Refunds</li>
            <li>Shipping Information</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
          <h3 className="text-lg font-bold mb-2">Shop</h3>
          <ul className="text-sm">
            <li>Products</li>
            <li>New Arrivals</li>
            <li>Best Sellers</li>
            <li>Special Offers</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
          <h3 className="text-lg font-bold mb-2">Policies</h3>
          <ul className="text-sm">
            <li>Privacy Policy</li>
            <li>Terms and Conditions</li>
            <li>Cookie Policy</li>
            <li>Accessibility</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 mb-4">
          <h3 className="text-lg font-bold mb-2">Connect With Us</h3>
          <ul className="text-sm">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tribune. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
