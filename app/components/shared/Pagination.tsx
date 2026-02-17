import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";

interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
  siblingsCount?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
  siblingsCount = 1,
}) => {
  // Generate array of page numbers to display
  const generatePagination = () => {
    // Always include first and last page
    const firstPage = 1;
    const lastPage = totalPages;

    // Calculate range of pages to show around current page
    const leftSiblingIndex = Math.max(currentPage - siblingsCount, firstPage);
    const rightSiblingIndex = Math.min(currentPage + siblingsCount, lastPage);

    // Should we show dots on left side?
    const showLeftDots = leftSiblingIndex > firstPage + 1;
    // Should we show dots on right side?
    const showRightDots = rightSiblingIndex < lastPage - 1;

    // Generate the actual page items array
    const items = [];

    // Always add first page
    items.push(firstPage);

    // Add left dots if needed
    if (showLeftDots) {
      items.push("left-dots");
    }

    // Add pages around current page
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== firstPage && i !== lastPage) {
        items.push(i);
      }
    }

    // Add right dots if needed
    if (showRightDots) {
      items.push("right-dots");
    }

    // Always add last page (if not already the first page)
    if (lastPage !== firstPage) {
      items.push(lastPage);
    }

    return items;
  };

  const pages = generatePagination();

  return (
    <nav className="flex justify-center items-center gap-1 my-8">
      {/* Previous page button */}
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </Button>

      {/* Page numbers */}
      {pages.map((page, index) => {
        if (page === "left-dots" || page === "right-dots") {
          return (
            <Button
              key={`dots-${index}`}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full"
              disabled
            >
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More pages</span>
            </Button>
          );
        }

        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="icon"
            className={`h-10 w-10 rounded-full ${
              currentPage === page
                ? "bg-black text-white hover:bg-gray-800"
                : ""
            }`}
            onClick={() => typeof page === "number" && onPageChange(page)}
          >
            {page}
            <span className="sr-only">{`Page ${page}`}</span>
          </Button>
        );
      })}

      {/* Next page button */}
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </Button>
    </nav>
  );
};

export default Pagination;
