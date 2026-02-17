import { useState } from "react";
import FilterCheckbox from "../helper/FilterCheckbox";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Slider } from "../ui/slider";

// Custom scrollbar styles
export const scrollbarStyles = `
 /* Custom scrollbar styles */
 .custom-scrollbar::-webkit-scrollbar {
   width: 6px;
 }
 
 .custom-scrollbar::-webkit-scrollbar-track {
   background: #f1f1f1;
   border-radius: 10px;
 }
 
 .custom-scrollbar::-webkit-scrollbar-thumb {
   background: #888;
   border-radius: 10px;
 }
 
 .custom-scrollbar::-webkit-scrollbar-thumb:hover {
   background: #555;
 }
`;
interface FilterSidebarProps {
  onClose: () => void;
  isMobile: boolean;
}

const FilterSidebar = ({ onClose, isMobile }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([500, 2500]);

  const handlePriceChange = (value: any) => {
    setPriceRange(value);
  };

  return (
    <div className="h-full">
      {/* Add the custom scrollbar styles */}
      <style>{scrollbarStyles}</style>

      <div
        className={` ${
          isMobile ? "py-6 max-h-screen " : "py-6 h-full"
        }  px-4 md:pr-6  `}
      >
        <div className="flex justify-between items-center mb-6">
          {isMobile ? "" : <h2 className="text-xl font-bold">Filter</h2>}

          {/* Custom close button */}
          {isMobile ? (
            <></>
          ) : (
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b-[2px] border-gray-100 pb-1">
            Price Range
          </h3>
          <div className="px-2 pt-4">
            <Slider
              defaultValue={priceRange}
              min={0}
              max={5000}
              step={100}
              onValueChange={handlePriceChange}
              className="mb-4"
            />
            <div className="flex justify-between">
              <span className="text-gray-600">${priceRange[0]}k</span>
              <span className="text-gray-600">${priceRange[1]}k</span>
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b-[2px] border-gray-100 pb-1">
            Property Type
          </h3>
          <div className="space-y-3">
            <FilterCheckbox label="House" />
            <FilterCheckbox label="Apartment" />
            <FilterCheckbox label="Villa" />
            <FilterCheckbox label="Townhouse" />
            <FilterCheckbox label="Land" />
          </div>
        </div>

        {/* Bedrooms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b-[2px] border-gray-100 pb-1">
            Bedrooms
          </h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
              >
                {num}
              </button>
            ))}
            <button className="h-10 px-3 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
              5+
            </button>
          </div>
        </div>

        {/* Bathrooms */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b-[2px] border-gray-100 pb-1">
            Bathrooms
          </h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
              >
                {num}
              </button>
            ))}
            <button className="h-10 px-3 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors duration-200">
              4+
            </button>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 border-b-[2px] border-gray-100 pb-1">
            Amenities
          </h3>
          <div className="space-y-3">
            <FilterCheckbox label="Swimming Pool" />
            <FilterCheckbox label="Garden" />
            <FilterCheckbox label="Garage" />
            <FilterCheckbox label="Air Conditioning" />
            <FilterCheckbox label="Gym" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mt-8">
          <Button
            variant="outline"
            className="flex-1 transition-colors duration-200"
          >
            Reset
          </Button>
          <Button className="flex-1 bg-black hover:bg-gray-800 text-white transition-colors duration-200">
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
