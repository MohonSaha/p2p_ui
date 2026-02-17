import React from "react";
import { ChevronRight, Home, DollarSign, Key, Ruler } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import Testimonials from "./Testimonials";
import { Link } from "react-router";

const AboutPage = () => {
  return (
    <div className=" py-8 font-serif">
      {/* Header with Image */}
      <div className="relative w-full rounded-3xl overflow-hidden mb-8">
        <div className="w-full h-48 md:h-52 bg-slate-200">
          <img
            src="https://i.ibb.co.com/LDfhVHzs/real-1.jpg"
            alt="Aerial view of real estate company"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 top-[80%] flex items-center justify-center">
          <div className="bg-white px-8 py-3 rounded-lg shadow-2xl ">
            <h2 className="text-4xl  text-gray-800 ">
              Get to Know <span className="text-cyan-600">Us</span>
            </h2>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className=" flex justify-between gap-8 mt-20 flex-col md:flex-row">
        <div className="md:col-span-1 md:w-2/5">
          <h3 className="text-3xl font-medium mb-2">A little bit about</h3>
          <h2 className="text-5xl  text-cyan-600 mb-4">The Realestate place</h2>
          <Link to="/contact">
            <button className="cursor-pointer flex items-center text-cyan-600 border border-cyan-600 rounded-full px-4 py-2 text-sm hover:bg-cyan-50 transition-colors">
              Contact us <ChevronRight className="ml-1 w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="md:col-span-2 text-gray-700 space-y-4 md:w-3/5">
          <p className="font-semibold text-2xl">Your local & loyal agent</p>
          <p>
            At The RealEstate Place, we're more than just your local real estate
            agency; we're your local partners in finding the perfect place to
            call home. Our commitment to you goes beyond buying or selling
            properties – it's about building lasting relationships within our
            vibrant community.
          </p>
          <p>
            The RealEstate Place is more than just a real estate agency; we're
            your trusted partners in making your real estate dreams a reality.
            Discover the difference of working with a team that's as passionate
            about your goals as you are. Welcome to The RealEstate Place, where
            your local and loyal agent is always here to serve you!
          </p>
        </div>
      </div>

      {/* Specialization Section */}
      <div className="mt-20">
        <div className="flex justify-between items-center gap-8 flex-col md:flex-row">
          <div className="md:w-2/5">
            <h2 className="text-4xl font-medium mb-6">
              We <span className="text-cyan-600">specialize</span> in
            </h2>
            {/* Description Text */}
            <div className="text-gray-700 space-y-4">
              <p>
                At The Realestate Place, our expertise spans across a wide
                spectrum of real estate services to suit your every need.
                Whether you're looking to buy your dream home, rent a cozy
                apartment, sell your property, or require a precise appraisal,
                we have you covered.
              </p>
              <p className="">
                With our commitment to excellence and passion for real estate,
                we're dedicated to making your real estate journey a smooth and
                rewarding experience. The Realestate Place is your trusted
                partner in all things real estate.
              </p>
            </div>
          </div>
          <div className="md:w-3/5 bg-slate-100 p-6 rounded-lg">
            <div className="flex flex-wrap gap-4">
              <Card className="border-none flex-1 min-w-[220px]">
                <CardContent className="md:px-10 flex flex-col items-center text-center">
                  <div className="bg-cyan-50 p-4 rounded-full mb-4">
                    <Home className="text-cyan-600 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Realestate Sales</h3>
                </CardContent>
              </Card>

              <Card className="border-none flex-1 min-w-[220px]">
                <CardContent className="md:px-10 flex flex-col items-center text-center">
                  <div className="bg-cyan-50 p-4 rounded-full mb-4">
                    <Key className="text-cyan-600 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">
                    Realestate Buying
                  </h3>
                </CardContent>
              </Card>

              <Card className="border-none flex-1 min-w-[220px]">
                <CardContent className="md:px-10 flex flex-col items-center text-center">
                  <div className="bg-cyan-50 p-4 rounded-full mb-4">
                    <DollarSign className="text-cyan-600 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Realestate Rent</h3>
                </CardContent>
              </Card>

              <Card className="border-none flex-1 min-w-[220px]">
                <CardContent className="md:px-10 flex flex-col items-center text-center">
                  <div className="bg-cyan-50 p-4 rounded-full mb-4">
                    <Ruler className="text-cyan-600 w-6" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">
                    Realestate Appraisal
                  </h3>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="my-12">
        <Testimonials />
      </div>

      <div className="relative w-full rounded-3xl overflow-hidden">
        <div className="w-full h-48 md:h-52 bg-slate-200">
          <img
            src="https://i.ibb.co.com/LDfhVHzs/real-1.jpg"
            alt="Aerial view of real estate company"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 top-[20%] flex items-center justify-center">
          <div className="text-white text-center rounded-lg shadow-2xl inset-0 bg-gradient-to-b from-transparent to-black/90 h-full w-full">
            <h2 className="md:text-6xl text-4xl px-4  text-white font-bold">
              {/* Get to Know <span className="text-cyan-600">Us</span> */}
              Looking for quality Real Estate?
            </h2>
            <div>
              <button className="mx-auto mt-5 flex items-center justify-center text-cyan-600 border-2 border-cyan-600 rounded-full px-4 py-2 text-sm hover:bg-cyan-600 hover:text-white transition-colors">
                Contact us <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
