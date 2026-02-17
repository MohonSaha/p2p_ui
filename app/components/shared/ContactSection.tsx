import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const ContactSection = ({ rounded }: { rounded?: boolean }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample property images
  const propertyImages = [
    "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    "https://i.ibb.co.com/YBQYw6bR/real-2.jpg",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === propertyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? propertyImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-[90vh] rounded-md">
      {/* Left side - Image Slider */}
      <div className="relative w-full md:w-4/7 h-96 md:h-[90vh] bg-amber-50">
        <img
          src={propertyImages[currentImageIndex]}
          alt={`Property view ${currentImageIndex + 1}`}
          className={`w-full h-full object-cover ${
            rounded ? "rounded-l-sm" : ""
          }`}
        />

        {/* Navigation buttons */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <Button
            onClick={prevImage}
            variant="outline"
            size="icon"
            className="bg-white/70 hover:bg-white rounded-full h-10 w-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={nextImage}
            variant="outline"
            size="icon"
            className="bg-white/70 hover:bg-white rounded-full h-10 w-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Right side - Form */}
      <div
        className={`w-full md:w-3/7 bg-gray-900 text-white p-8 md:p-12 ${
          rounded ? "rounded-r-sm" : ""
        }`}
      >
        <div className="max-w-md mx-auto h-full flex flex-col items-center justify-center">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Still haven't found what you're looking for?
            </h2>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium mb-2"
                >
                  First Name
                </label>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium mb-2"
                >
                  Last Name
                </label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="intent"
                className="block text-sm font-medium mb-2"
              >
                I Want to
              </label>
              <Input
                id="intent"
                placeholder="Buy Property"
                className="bg-gray-800 border-gray-700"
              />
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium mb-2">
                Notes
              </label>
              <Textarea
                id="notes"
                placeholder="Tell us more about what you're looking for..."
                className="bg-gray-800 border-gray-700 min-h-24"
              />
            </div>

            <Button className="w-full bg-white text-gray-900 hover:bg-gray-100">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
