import { Outlet } from "react-router";
import Footer from "~/components/shared/Footer";
import { Navbar } from "~/components/shared/navbar";
import { SectionContainer } from "~/components/shared/SectionContainer";
import TimeTrackerButton from "~/components/shared/TimeTracker/TimeTrackerButton";

export default function MainLayout() {
  return (
    <div>
      <SectionContainer>
        <Navbar />
      </SectionContainer>
      <div className="min-h-screen">
        <Outlet />
      </div>
      {/* <div className="mt-20">
        <Footer />
      </div> */}
      {/* <div className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50">
        <TimeTrackerButton />
      </div> */}
    </div>
  );
}
