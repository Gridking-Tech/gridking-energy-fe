import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import logo from "../../public/assets/placeholders/logo-gridking.png";
import Link from "next/link";
const footerLinks = [
  { name: "Contact Us", href: "/contact" },
  // { name: "Trade Show", href: "#" },
  { name: "Battery", href: "collections/battery" },
  { name: "Inverter", href: "collections/inverters" },
];

const socialLinks = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaInstagram />, href: "#" },
  { icon: <FaTwitter />, href: "#" },
  { icon: <FaLinkedinIn />, href: "#" },
  { icon: <FaYoutube />, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-16">
      <div className="flex justify-between items-center flex-wrap">
        <div className="flex flex-col">
          {/* <img src="/gridking-logo.png" alt="GridKing" className="h-12 mr-4" /> */}
          <div className="text-2xl font-black ">
            <img src={logo.src} alt="logo" className="h-12 mr-4 mb-4" />
          </div>
          <div>
            <p>Location - F1219, Alaba International Market, Lagos.</p>
            <p>Email: info@gridking.africa | Tel: +2347074683973</p>
          </div>
        </div>
        <div className="flex gap-4 text-xl">
          {socialLinks.map((link, index) => (
            <div key={index} className="text-white">
              <div>{link.icon}</div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4 border-gray-700" />
      <div className="flex justify-between flex-wrap cursor-pointer">
        <div className="flex items-center">
          {footerLinks.map((link, index) => (
            <span key={index} className="flex items-center">
              <Link href={link.href} className="text-white mx-2">{link.name}</Link>
              {index < footerLinks.length - 1 && " | "}
            </span>
          ))}
        </div>
        <div>
          <p>&copy; Copyrights 2024-2025, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
}
