import React, { useState } from "react";
import { MapPin, BedDouble, Bath, Square, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

interface PropertyCardProps {
  name: string;
  location: string;
  beds: number;
  baths: number;
  area: string | number;
  image: string;
  onDetailsClick: () => void;
  onFavoriteToggle?: (isFavorite: boolean) => void;
  isFavorite?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({
  name,
  location,
  beds,
  baths,
  area,
  image,
  onDetailsClick,
  onFavoriteToggle,
  isFavorite = false,
}) => {
  const [favorite, setFavorite] = useState(isFavorite);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering card click
    const newFavoriteState = !favorite;
    setFavorite(newFavoriteState);
    if (onFavoriteToggle) {
      onFavoriteToggle(newFavoriteState);
    }
  };

  return (
    <div className="overflow-hidden group flex flex-col h-full">
      <div className="relative overflow-hidden flex-grow">
        <div className="relative aspect-video">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-md"
          />
          <Button className="group-hover:opacity-80 opacity-0 absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900/90 hover:bg-gray-800 text-white rounded-full w-24 h-24 cursor-pointer">
            <Link to="/listings/mohon">Details</Link>
          </Button>

          {/* Favorite Heart Button */}
          <Button
            onClick={handleFavoriteClick}
            className="absolute cursor-pointer top-2 right-2 h-10 w-10 rounded-full p-0 bg-white/80 hover:bg-white shadow-md"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              size={24}
              className={favorite ? "fill-black text-black" : "text-gray-600"}
            />
          </Button>
        </div>
      </div>

      <div className="pt-3 pb-4 px-1">
        <div className="flex justify-between items-center mb-2 gap-4">
          <h3
            className="font-medium text-lg truncate max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
            title={name} // Shows full text on hover
          >
            {name}
          </h3>
          <div
            className="flex items-center text-gray-500 text-sm max-w-[200px] overflow-hidden whitespace-nowrap text-ellipsis"
            title={location} // Shows full text on hover
          >
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex items-center text-gray-600">
            <BedDouble size={16} className="mr-1" />
            <span>{beds}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Bath size={16} className="mr-1" />
            <span>{baths}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Square size={16} className="mr-1" />
            <span>{area}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
