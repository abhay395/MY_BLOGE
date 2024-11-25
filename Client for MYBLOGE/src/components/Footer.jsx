import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700 border-t border-gray-200">
      {/* Footer Top Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About MYBLOGE</h3>
          <p className="text-sm text-gray-600">
            MYBLOGE is your go-to platform for insightful articles, creative stories, and engaging blogs. Stay inspired and informed with us.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <Link to="/" className="hover:text-blue-500">Home</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">About Us</Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-blue-500">Contact</Link>
            </li>
           
          </ul>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe to our newsletter for the latest updates and articles.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="bg-white py-4">
      <div className="container mx-auto flex justify-center space-x-6">
        <a
          href="https://github.com/abhay395"
          target="_blank"
          className="text-gray-600 hover:text-blue-500"
          aria-label="Facebook"
        >
          <FaGithub className="h-6 w-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/abhay-parjapati-315044250/"
          target="_blank"
          className="text-gray-600 hover:text-blue-500"
          aria-label="Twitter"
        >
          <FaLinkedinIn className="h-6 w-6" />
        </a>
        <a
          href="#!"
          target="_blank"
          className="text-gray-600 hover:text-blue-500"
          aria-label="Instagram"
        >
          <FaInstagram className="h-6 w-6" />
        </a>
      </div>
    </div>

      {/* Footer Bottom */}
      <div className="bg-gray-200 py-4 text-center text-sm text-gray-600">
        © 2024 MYBLOGE. All rights reserved.
      </div>
    </footer>
  );
}
