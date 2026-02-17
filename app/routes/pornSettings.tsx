import React from "react";
import { SectionContainer } from "~/components/shared/SectionContainer";
import PornSettingsPage from "~/pages/PornSettingsPage/PornSettingsPage";

const pornSettings = () => {
  return (
    <div>
      <SectionContainer>
        <div className="pt-16">
          <PornSettingsPage />
        </div>
      </SectionContainer>
    </div>
  );
};

export default pornSettings;
