import React from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

const RealEstateSearch = () => {
  return (
    <div className="relative w-full  mx-auto">
      {/* Hero image with modern wooden houses */}
      <div className="w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://i.ibb.co.com/LDfhVHzs/real-1.jpg')`,
            filter: "brightness(0.9)",
          }}
        />

        {/* Search panel */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Looking For
                </label>
                <Input
                  type="text"
                  placeholder="What to look for?"
                  className="w-full mt-1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Type
                </label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Price
                </label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100k-250k">$100k - $250k</SelectItem>
                    <SelectItem value="250k-500k">$250k - $500k</SelectItem>
                    <SelectItem value="500k-750k">$500k - $750k</SelectItem>
                    <SelectItem value="750k-1m">$750k - $1M</SelectItem>
                    <SelectItem value="1m+">$1M+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Location
                </label>
                <Select>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="All Cities" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-york">New York</SelectItem>
                    <SelectItem value="los-angeles">Los Angeles</SelectItem>
                    <SelectItem value="chicago">Chicago</SelectItem>
                    <SelectItem value="houston">Houston</SelectItem>
                    <SelectItem value="phoenix">Phoenix</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 md:mt-6 flex justify-end">
                <Button className="bg-black hover:bg-gray-800 text-white px-6 w-full mt-1">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateSearch;
