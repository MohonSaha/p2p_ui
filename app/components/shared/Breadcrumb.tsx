// import React from "react";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "../ui/breadcrumb";

// // Define the type for breadcrumb items
// type BreadcrumbItemType = {
//   label: string;
//   href?: string;
// };

// interface BreadcrumbProps {
//   items: BreadcrumbItemType[];
// }

// export function BreadcrumbDemo({ items }: BreadcrumbProps) {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         {items.map((item, index) => (
//           <React.Fragment key={index}>
//             <BreadcrumbItem>
//               {item.href ? (
//                 <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
//               ) : (
//                 <BreadcrumbPage>{item.label}</BreadcrumbPage>
//               )}
//             </BreadcrumbItem>
//             {index < items.length - 1 && <BreadcrumbSeparator />}
//           </React.Fragment>
//         ))}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }

import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

import { Layers, Menu, RectangleEllipsis } from "lucide-react"; // Import an icon for mobile menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type BreadcrumbItemType = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItemType[];
}

export function BreadcrumbDemo({ items }: BreadcrumbProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:flex justify-end items-end w-full text-right">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink href={item.href}>
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex justify-end">
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger className=" rounded-md">
            {/* <button>
              <Layers className="w-6 h-6 text-gray-400" />
            </button> */}
            <div className="border border-gray-300 p-2 rounded-full cursor-pointer hover:border-gray-400 transition-all duration-200">
              <Layers className="w-6 h-6 text-gray-400" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-auto">
            {items.map((item, index) => (
              <DropdownMenuItem key={index}>
                {item.href ? (
                  <a href={item.href} className="w-full text-left">
                    {item.label}
                  </a>
                ) : (
                  <span className="w-full text-left">{item.label}</span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
