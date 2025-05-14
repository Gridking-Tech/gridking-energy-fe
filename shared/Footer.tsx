import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import {DarkLogo} from "@/shared/Icons";

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
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">SUPPORT</h4>
              <ul className="text-sm">
                <li>
                  <a href="#">Energy Solutions</a>
                </li>
                <li>
                  <a href="#">Contact Support</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold">LEGAL</h4>
              <ul className="text-sm">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Cookie Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div 
        style={{backgroundImage: `url(/assets/placeholders/footer-Bg.png)`}}
        className="text-white p-28 rounded-sm max-w-6xl mx-auto border-4 border-[#F47A2B]">
          <h3 className="text-4xl mb-4 text-center">
            Subscribe To Our Newsletter
          </h3>
          <p className="text-xs mb-6 text-center">
            Subscribe to get the latest updates on solar innovations,
            energy-saving tips, exclusive offers, and more — straight to your
            inbox!
          </p>
          <div className="relative flex justify-center items-center">
            <input
              type="email"
              placeholder="Enter your email address"
              className="p-3 pr-28 w-full max-w-xs text-black bg-white rounded border-none outline-none"
            />
            <button className="absolute bg-[#F47A2B] text-white p-2 rounded-sm font-bold uppercase right-[18rem] cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
        <div className="flex justify-between text-sm mt-12">
          <p>GridKing Solar & Renewable Energy</p>
          <p>© Copyright © 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;