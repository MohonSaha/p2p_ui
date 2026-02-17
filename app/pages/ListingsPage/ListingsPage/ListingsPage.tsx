import { useState, useEffect, type SetStateAction } from "react";
import { Filter, Heart, Search, X } from "lucide-react";
import DynamicSearchBar from "~/components/shared/DynamicSearchBar";
import PropertyCard from "~/components/shared/PropertyCard";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Slider } from "~/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import { BreadcrumbDemo } from "~/components/shared/Breadcrumb";
import Pagination from "~/components/shared/Pagination";
import FilterCheckbox from "~/components/helper/FilterCheckbox";
import FilterSidebar, {
  scrollbarStyles,
} from "~/components/shared/FilterSidebar";

const ListingsPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const properties = [
    {
      id: 1,
      name: "Griya Asri Tamansari Griya Asri Tamansari Griya Asri Tamansari",
      location: "Los Angeles, California",
      beds: 4,
      baths: 2.5,
      area: 410,
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 2,
      name: "Arjuna Hills Estate",
      location: "Austin, Texas",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 3,
      name: "Nirwana Residence",
      location: "Miami, Florida",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 4,
      name: "Serenity Heights",
      location: "Denver, Colorado",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 5,
      name: "Taman Asri Estate",
      location: "Chicago, Illinois",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 6,
      name: "Sentosa Hills",
      location: "San Francisco, California",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 7,
      name: "Nirwana Residence",
      location: "Miami, Florida",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 8,
      name: "Serenity Heights",
      location: "Denver, Colorado",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
    {
      id: 9,
      name: "Taman Asri Estate",
      location: "Chicago, Illinois",
      beds: 4,
      baths: 2.5,
      area: "410 m²",
      image: "https://i.ibb.co.com/LDfhVHzs/real-1.jpg",
    },
  ];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Listing" }, // No href means it's the current page
  ];

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    console.log("clicked");
  };

  // Filter content rendered for both desktop sidebar and mobile sheet
  const FilterContent = ({
    onClose,
    isMobileView,
  }: {
    onClose: () => void;
    isMobileView: boolean;
  }) => <FilterSidebar onClose={onClose} isMobile={isMobileView} />;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Number of properties per page

  // Calculate total pages
  const totalPages = Math.ceil(properties.length / itemsPerPage);

  // Get current properties for display
  const indexOfLastProperty = currentPage * itemsPerPage;
  const indexOfFirstProperty = indexOfLastProperty - itemsPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Handle page change
  const handlePageChange = (pageNumber: SetStateAction<number>) => {
    setCurrentPage(pageNumber);
    // Scroll to top of property list
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto pt-1">
      <div className="flex">
        {/* Desktop Sidebar - hidden on mobile */}
        {!isMobile && (
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isFilterOpen ? "w-72 opacity-100 mr-6" : "w-0 opacity-0 mr-0"
            } shrink-0 bg-white hidden md:block`}
          >
            {isFilterOpen && (
              <FilterContent onClose={toggleFilter} isMobileView={false} />
            )}
          </div>
        )}

        {/* Property Grid - adjusts columns based on sidebar state */}
        <div className="flex-1">
          {/* search and filter tab */}
          <div className="flex my-4 items-center border-b-[1px] border-gray-200 pb-4 gap-4">
            {/* Desktop filter button - hidden on mobile */}
            {!isMobile && !isFilterOpen && (
              <div
                className="border border-gray-300 p-2 rounded-full cursor-pointer hover:border-gray-400 transition-all duration-200"
                onClick={toggleFilter}
              >
                <Filter className="text-gray-400" />
              </div>
            )}

            {/* Mobile filter button using Sheet component */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <div className="border border-gray-300 p-2 rounded-full cursor-pointer hover:border-gray-400 transition-all duration-200">
                    <Filter className="text-gray-400" />
                  </div>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 w-[70%] ">
                  <style>{scrollbarStyles}</style>
                  <SheetHeader className="sticky top-0 z-10 bg-white h-2">
                    <SheetTitle>
                      <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold">Filter</h2>

                        <SheetClose asChild>
                          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200">
                            <X className="h-6 w-6" />
                          </button>
                        </SheetClose>
                      </div>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="h-[calc(100%-60px)] overflow-y-auto custom-scrollbar">
                    <FilterContent onClose={() => {}} isMobileView={true} />
                  </div>
                </SheetContent>
              </Sheet>
            )}

            <div className="border border-gray-300 p-2 rounded-full cursor-pointer">
              <Heart className="text-gray-400" />
            </div>
            <DynamicSearchBar />
            <div className=" md:flex justify-end items-end w-10 md:w-full text-right">
              <BreadcrumbDemo items={breadcrumbs} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                Discover SAHA AGENCY Property
              </h1>
              <p className="text-gray-600 max-w-2xl">
                Whether you're looking for a modern apartment in the city or a
                peaceful home in the suburbs, our listings offer something for
                everyone.
              </p>
            </div>

            {/* Desktop filter button - hidden on mobile */}
            {!isMobile && (
              <Button
                variant="ghost"
                className="text-black hover:bg-gray-100 mt-4 md:mt-0"
                onClick={toggleFilter}
              >
                Filter Result
              </Button>
            )}

            {/* Mobile filter button - only visible on mobile */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-black hover:bg-gray-100 mt-4 md:mt-0"
                  >
                    Filter Result
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="p-0 w-full sm:max-w-md"
                  // hideCloseButton={true}
                >
                  <FilterContent onClose={() => {}} isMobileView={true} />
                </SheetContent>
              </Sheet>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                name={property.name}
                location={property.location}
                beds={property.beds}
                baths={property.baths}
                area={property.area}
                image={property.image}
                onDetailsClick={() =>
                  console.log(`Property ${property.id} details clicked`)
                }
              />
            ))}
          </div>

          {/* Pagination component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            siblingsCount={1}
          />
        </div>
      </div>
    </div>
  );
};

// FilterSidebar Component

export default ListingsPage;
