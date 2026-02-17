import React, { useState, useEffect } from "react";

import { Search } from "lucide-react";
import { Input } from "../ui/input";

const DynamicSearchBar = () => {
  // Array of placeholders to cycle through
  const placeholders = [
    "Search by property location",
    "Search by area of property",
    "Search by property name",
    "Search by property category",
  ];

  // State to manage current placeholder
  const [currentPlaceholder, setCurrentPlaceholder] = useState(placeholders[0]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Function to cycle through placeholders
  const cyclePlaceholder = () => {
    const nextIndex = (placeholderIndex + 1) % placeholders.length;
    setCurrentPlaceholder(placeholders[nextIndex]);
    setPlaceholderIndex(nextIndex);
  };

  // Use effect to automatically change placeholder every 3 seconds
  useEffect(() => {
    const placeholderInterval = setInterval(cyclePlaceholder, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(placeholderInterval);
  }, [placeholderIndex]);

  return (
    <div className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder={currentPlaceholder}
        className="pl-10 pr-4 py-5 w-full border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out"
      />
      <div className="absolute left-3  top-1/2 transform -translate-y-1/2">
        <Search className="text-gray-400 cursor-pointer hover:text-blue-500" />
      </div>
    </div>
  );
};

export default DynamicSearchBar;
