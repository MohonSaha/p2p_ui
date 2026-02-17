import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Link } from "react-router";

const PropertyListingsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const properties = [
    {
      id: 1,
      title: "Griya Asri Tamansari",
      location: "Austin, Texas",
      description:
        "Nestled in the serene landscapes of Austin, Taman Harmoni Village offers a perfect blend of modern living and natural tranquility.",
      imageUrl: "https://i.ibb.co.com/YBQYw6bR/real-2.jpg",
    },
    {
      id: 2,
      title: "Permata Indah Residence",
      location: "San Diego, California",
      description:
        "A luxurious residential complex featuring contemporary design with spacious living areas and premium amenities.",
      imageUrl: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 3,
      title: "Griya Tamansari",
      location: "Orlando, Florida",
      description:
        "Modern family homes designed with comfort and elegance, surrounded by lush gardens and community spaces.",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === properties.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? properties.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full  mx-auto  py-8">
      <h1 className="text-4xl font-bold text-center mb-2">
        Explore New Property Listings
      </h1>
      <p className="text-center text-gray-600 mb-8">
        From cozy apartments to spacious family homes, our diverse listings
        cater to various needs and preferences.
      </p>

      <div className="relative">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {properties.map((property) => (
              <div key={property.id} className="w-full flex-shrink-0">
                <Card className="relative border-0 shadow-xl h-[450px] overflow-hidden rounded-none">
                  <CardContent className="p-0">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-[450px] object-cover rounded-none"
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 flex items-end w-full">
                      <div className="p-6 text-white mx-auto text-center w-full">
                        <h2 className="text-2xl font-bold mb-2">
                          {property.title}
                        </h2>
                        <div className="flex items-center mb-3 justify-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm text-center">
                            {property.location}
                          </span>
                        </div>
                        <p className="text-sm text-gray-200 mx-auto text-center">
                          {property.description}
                        </p>
                      </div>
                    </div>

                    <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 hover:bg-gray-800 text-white rounded-full w-24 h-24 cursor-pointer">
                      <Link to="/listings">Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-800 rounded-full shadow-md h-10 w-10"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-800 rounded-full shadow-md h-10 w-10"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Pagination Indicators */}
        <div className="flex justify-center mt-4 gap-2">
          {properties.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyListingsSlider;
