import React from "react";
import {
  Heart,
  Share,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Info,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

const PropertyDetails = () => {
  const property = {
    title: "Minimal looking apartment, London, UK",
    address: "100 Hampshire Cir, Street, Haven #1023",
    price: "$113,200",
    downPayment: "$20,216",
    beds: 2,
    baths: 2,
    area: "1029sqf",
    isForSale: true,
    tags: ["New"],
    description:
      "This undercraft comprises 4 self-contained units of varying size. The units have separate secured access, from a central private access road at lower ground level. Access road routes through to a central patio/shared area, within which the MAXI Access Platform is located. The accommodation is selective.",
    images: [
      "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
      "https://i.ibb.co.com/YBQYw6bR/real-2.jpg",
      "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
      "https://i.ibb.co.com/YBQYw6bR/real-2.jpg",
      "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    ],
    details: {
      type: "Townhomes",
      hoa: "No HOA Fee",
      buildingYear: "2002",
      outdoor: "City View",
      garden: "Available",
      parking: "Yes",
    },
    agent: {
      name: "Daniel Doe",
      company: "Expanda Properties, LLC",
      location: "Alabama",
      licenseNumber: "#345573",
      contact: "000 1234 123 123",
    },
  };

  const availableTimes = [
    { date: "24 July 2025", slots: ["10:00 am", "12:30 pm"] },
  ];

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <div className="flex items-center text-gray-500">
            <MapPin size={16} className="mr-1" />
            <span className="text-sm">{property.address}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share size={16} className="mr-2" /> Share
          </Button>
          <Button variant="outline" size="sm">
            <Heart size={16} className="mr-2" /> Save
          </Button>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="relative mb-4">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={property.images[0]}
            alt="Property main view"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-blue-500 text-white font-semibold">
              {property.tags[0]}
            </Badge>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full h-10 w-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full h-10 w-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex mt-2 gap-2">
          {property.images.slice(1).map((img, index) => (
            <div key={index} className="w-24 h-20 rounded-md overflow-hidden">
              <img
                src={img}
                alt={`Property view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Property Details and Booking */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Price and Basic Info */}
          <div className="mb-6">
            <div className="space-y-2 items-baseline">
              {property.isForSale && (
                <Badge variant="outline" className="mr-2 bg-blue-500">
                  For sale
                </Badge>
              )}
              <h2 className="text-2xl font-bold">{property.price}</h2>
              <p className="text-md text-gray-600">
                Down payment {property.downPayment}
              </p>
            </div>

            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="2"
                    y="5"
                    width="20"
                    height="14"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M2 9H22" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{property.beds} Bed</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 11H20V17C20 18.1046 19.1046 19 18 19H6C4.89543 19 4 18.1046 4 17V11Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M4 11V7C4 5.89543 4.89543 5 6 5H18C19.1046 5 20 5.89543 20 7V11"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M8 19V21" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 19V21" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{property.baths} Bath</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6H21V18H3V6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M3 12H21" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 6V18" stroke="currentColor" strokeWidth="2" />
                </svg>
                <span>{property.area}</span>
              </div>
            </div>
          </div>

          {/* Overview Tab */}
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="location">Location Information</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="pt-4">
              <h3 className="font-semibold text-lg mb-2">Overview</h3>
              <p className="text-gray-700 mb-4">{property.description}</p>
              <Button variant="link" className="text-blue-600 p-0">
                Read More
              </Button>

              <h3 className="font-semibold text-lg mt-6 mb-2">Highlights</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 9.5L12 4L21 9.5"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M19 13V19.4C19 19.7314 18.7314 20 18.4 20H5.6C5.26863 20 5 19.7314 5 19.4V13"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Type</p>
                    <p className="text-sm">{property.details.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8V12L15 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">HOA</p>
                    <p className="text-sm">{property.details.hoa}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="3"
                        y="6"
                        width="18"
                        height="15"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M3 10H21"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M8 3V6" stroke="currentColor" strokeWidth="2" />
                      <path d="M16 3V6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Building Year</p>
                    <p className="text-sm">{property.details.buildingYear}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 12H19"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 5V19"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Outdoor</p>
                    <p className="text-sm">{property.details.outdoor}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 12H22"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Garden</p>
                    <p className="text-sm">{property.details.garden}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <svg
                      className="w-5 h-5 text-gray-600"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M3 9H21" stroke="currentColor" strokeWidth="2" />
                      <path d="M9 21V9" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Parking</p>
                    <p className="text-sm">{property.details.parking}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="details">
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-4">Property Details</h3>
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Property Type</p>
                    <p>{property.details.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Year Built</p>
                    <p>{property.details.buildingYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">HOA Fees</p>
                    <p>{property.details.hoa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Parking</p>
                    <p>{property.details.parking}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Outdoor Space</p>
                    <p>{property.details.outdoor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Garden</p>
                    <p>{property.details.garden}</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="location">
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-4">
                  Location Information
                </h3>
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="bg-green-50">
                    Map
                  </Badge>
                  <Badge variant="outline">School</Badge>
                  <Badge variant="outline">Shop & Restaurant</Badge>
                  <Badge variant="outline">Commute Location</Badge>
                </div>
                <div className="bg-gray-100 h-64 flex items-center justify-center rounded-lg">
                  <p className="text-gray-500">Map would be displayed here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Contact and Tour Booking */}
        <div>
          <Card className="mb-4">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-3">Request a tour</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get a tour of the house as per your time.
              </p>

              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">
                  {availableTimes[0].date}
                </h4>
                <div className="flex gap-2">
                  {availableTimes[0].slots.map((slot, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <Clock size={14} className="mr-1" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 mb-2">
                Schedule a Tour
              </Button>
              <Button variant="outline" className="w-full">
                Request Info
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Agent Information</h3>
              <div className="flex gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src="/api/placeholder/56/56"
                    alt="Agent profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{property.agent.name}</h4>
                  <p className="text-sm text-gray-600">
                    {property.agent.company} | {property.agent.location}
                  </p>
                  <div className="flex gap-1 mt-1">
                    <Badge
                      variant="outline"
                      size="sm"
                      className="text-xs bg-blue-50 text-blue-700"
                    >
                      Buy/Rent
                    </Badge>
                    <Badge
                      variant="outline"
                      size="sm"
                      className="text-xs bg-red-50 text-red-700"
                    >
                      For Sale
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">License Number</p>
                  <p className="text-sm">{property.agent.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact</p>
                  <p className="text-sm">{property.agent.contact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
