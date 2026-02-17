import React, { useState, useEffect } from "react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      text: "As a real estate professional, I can't say enough about The Realestate Place. Their commitment to their customers is unmatched, the quality of their homes outstanding. Also the loyalty to real estate agents during fluctuating markets also outstanding. Tank you for your hard work",
      name: "Dianne Russell",
      position: "Realtor",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      id: 2,
      text: "Working with The Realestate Place has been a game-changer for my family. They helped us find our dream home in record time and made the entire process stress-free. Their attention to detail is remarkable.",
      name: "Robert Johnson",
      position: "Homeowner",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      id: 3,
      text: "I've been in the real estate industry for over 15 years, and The Realestate Place consistently stands out for their professionalism and integrity. They truly put clients first and deliver exceptional results every time.",
      name: "Sarah Williams",
      position: "Property Manager",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: React.SetStateAction<number>) => {
    setActiveIndex(index);
  };

  return (
    <div className=" py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>

      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white p-8 rounded-lg shadow-[0_0.4px_10px_rgba(0,0,0,0.3)] my-4 h-[250px] flex flex-col justify-center items-center text-center">
                  <p className="text-gray-700 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <div className="text-left">
                      <p className="font-medium text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`mx-1 h-3 w-3 rounded-full ${
                index === activeIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
