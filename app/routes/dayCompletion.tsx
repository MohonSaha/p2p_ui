import React from "react";
import { SectionContainer } from "~/components/shared/SectionContainer";
import DailyPlanner from "~/pages/Home/DailyPlanner/DailyPlanner";

const dayCompletion = () => {
  return (
    <div className="pt-28">
      <SectionContainer>
        <div>
          <DailyPlanner />
        </div>
      </SectionContainer>
    </div>
  );
};

export default dayCompletion;
