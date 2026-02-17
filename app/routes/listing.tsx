import React from "react";
import { SectionContainer } from "~/components/shared/SectionContainer";
import PropertyDetails from "~/pages/PropertyDetails/PropertyDetails";

const listing = () => {
  return (
    <div>
      <SectionContainer>
        <div className="mt-24">
          <PropertyDetails />
        </div>
      </SectionContainer>
    </div>
  );
};

export default listing;
