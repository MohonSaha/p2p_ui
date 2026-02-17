import React from "react";
import { Twitter, Facebook, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex flex-col">
      {/* Header Navigation */}
      <header className="px-6 py-4 bg-white flex justify-between items-center">
        <div className="text-xs font-light">
          ©2024 ARUNA RESIDENCE ALL RIGHT RESERVED
        </div>

        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-sm hover:underline">
            Home
          </a>
          <a href="#" className="text-sm hover:underline">
            Properties
          </a>
          <a href="#" className="text-sm hover:underline">
            Our Projects
          </a>
          <a href="#" className="text-sm hover:underline">
            FAQs
          </a>
          <a href="#" className="text-sm hover:underline">
            About Us
          </a>
        </nav>

        <div className="flex space-x-4">
          <a href="#" aria-label="Twitter">
            <Twitter size={18} />
          </a>
          <a href="#" aria-label="Facebook">
            <Facebook size={18} />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram size={18} />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow relative">
        <div className="relative h-[500px] w-full overflow-hidden">
          {/* Background Image with Shadow */}
          <div
            className="absolute inset-0 bg-cover bg-center shadow-lg shadow-black"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/zh76TJdv/image-2.jpg')",
            }}
          >
            {/* Overlay for better text visibility */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>

          {/* Large ARUNA Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-8xl md:text-9xl font-bold tracking-wider">
              SAHA AGENCY
            </h1>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Footer;
