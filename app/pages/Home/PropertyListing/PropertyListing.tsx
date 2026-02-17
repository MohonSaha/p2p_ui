import { MapPin, BedDouble, Bath, Square } from "lucide-react";
import { Button } from "~/components/ui/button";

const PropertyCard = ({ name, location, beds, baths, area, image, index }) => {
  // First and sixth cards (index 0 and 5) get special treatment
  const isSpecialCard = index === 0 || index === 5;

  return (
    <div
      className={`overflow-hidden group flex flex-col h-full ${
        isSpecialCard ? "h-80" : "h-64"
      } `}
    >
      <div className="relative overflow-hidden flex-grow">
        {/* Container with fixed height to ensure content alignment */}
        <div className={`relative`}>
          <img
            src={image}
            alt={name}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-105  rounded-xl ${
              isSpecialCard ? "h-80" : "h-64 md:mt-16 mt-0"
            }`}
          />
          {isSpecialCard ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-black bg-opacity-70 text-white rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-sm font-medium cursor-pointer">
                  Details
                </span>
              </div>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black bg-opacity-70 text-white rounded-full w-20 h-20 flex items-center justify-center">
                <span className="text-sm font-medium cursor-pointer">
                  Details
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 mt-auto">
        {" "}
        {/* mt-auto pushes content to bottom */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{name}</h3>
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
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

const PropertyListing = () => {
  const properties = [
    {
      id: 1,
      name: "Griya Asri Tamansari",
      location: "San Francisco, California",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 2,
      name: "Arjuna Hills Estate",
      location: "Denver, Colorado",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 3,
      name: "Nirwana Residence",
      location: "Austin, Texas",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 4,
      name: "Serenity Heights",
      location: "Seattle, Washington",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 5,
      name: "Taman Asri Estate",
      location: "Miami, Florida",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 6,
      name: "Sentosa Hills",
      location: "Chicago, Illinois",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            Discover SAHA AGENCY Property
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Whether you're looking for a modern apartment in the city or a
            peaceful home in the suburbs, our listings offer something for
            everyone.
          </p>
        </div>
        <Button variant="ghost" className="text-black hover:bg-gray-100">
          See All Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property, index) => (
          <PropertyCard
            key={property.id}
            name={property.name}
            location={property.location}
            beds={property.beds}
            baths={property.baths}
            area={property.area}
            image={property.image}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyListing;
