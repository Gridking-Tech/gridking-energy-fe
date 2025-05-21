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
    <footer className="bg-[#F47A2B] text-black py-8 px-4">
      <div className="container mx-auto md:max-w-6xl px-4 py-12">
        <div className="flex justify-between space-x-8 mb-6">
          <div className="text-left mb-6">
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
          <div className="flex justify-between space-x-8 mb-6 ">
            <div>
              <h4 className="font-bold">EXPLORE</h4>
              <ul className="text-sm">
                <li>
                  <a href="/product">Products</a>
                </li>
                <li></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">SUPPORT</h4>
              <ul className="text-sm">
                <li>
                  <a href="/contact">Contact Support</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">LEGAL</h4>
              <ul className="text-sm">
                <li>
                  <a href="/about">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <NewsletterSubscription />
        <div className="flex justify-between text-sm mt-12">
          <p>GridKing Solar & Renewable Energy</p>
          <p>© Copyright © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
