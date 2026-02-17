import { Outlet } from "react-router";
import Footer from "~/components/shared/Footer";
import { Navbar } from "~/components/shared/navbar";
import { SectionContainer } from "~/components/shared/SectionContainer";

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
    </div>
  );
}
