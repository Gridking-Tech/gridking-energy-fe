import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { DarkLogo } from "@/shared/Icons";
import NewsletterSubscription from "@/components/NewsLetterSub";

const Footer = () => {
  return (
    <footer className="bg-[#F47A2B] text-black py-8 px-4 min-h-[60vh]">
      <div className="container mx-auto md:max-w-6xl px-2 md:px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 mb-6">
          <div className="text-left mb-6 md:mb-0 md:w-1/3 flex-shrink-0 flex flex-col items-center md:items-start">
            <div className="mb-6">
              <DarkLogo />
            </div>
            <p className="text-sm flex items-center py-1">
              <FaPhone className="mr-2" /> +234 907 468 5973
            </p>
            <p className="text-sm flex items-center py-1">
              <FaEnvelope className="mr-2" /> info@gridking.africa
            </p>
            <div className="flex space-x-4 mt-2">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:justify-between md:space-x-8 w-full md:w-2/3 items-center md:items-start">
            <div className="mb-4 md:mb-0">
              <h4 className="font-bold text-center md:text-left">EXPLORE</h4>
              <ul className="text-sm text-center md:text-left">
                <li>
                  <a href="/product">Products</a>
                </li>
              </ul>
            </div>
            <div className="mb-4 md:mb-0">
              <h4 className="font-bold text-center md:text-left">SUPPORT</h4>
              <ul className="text-sm text-center md:text-left">
                <li>
                  <a href="/contact">Contact Support</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-center md:text-left">LEGAL</h4>
              <ul className="text-sm text-center md:text-left">
                <li>
                  <a href="/about">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-2xl">
            <NewsletterSubscription />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-sm mt-8 md:mt-12 w-full">
          <p className="mb-2 md:mb-0">GridKing Solar & Renewable Energy</p>
          <p>© Copyright © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
