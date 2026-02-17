import HeroSection from "~/pages/Home/HeroSection/HeroSection";
import RealEstateSearch from "~/pages/Home/RealEstateSearch/RealEstateSearch";
import PropertyListingsSlider from "~/pages/Home/PropertyListingsSlider/PropertyListingsSlider";
import PropertyListing from "~/pages/Home/PropertyListing/PropertyListing";
import FAQSection from "~/components/shared/FAQSection";
import TextMarquee from "~/pages/Home/TextMarquee/TextMarquee";
import ImageGallery from "~/pages/Home/ImageGallery/ImageGallery";
import ContactSection from "~/components/shared/ContactSection";
import { SectionContainer } from "~/components/shared/SectionContainer";
import type { Route } from "../+types/root";
import DailyPlanner from "~/pages/Home/DailyPlanner/DailyPlanner";
import ProgressCharts from "~/pages/Home/ProgressCharts/ProgressCharts";
import { Calendar } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <>
      <SectionContainer>
        <div className="pt-16">
          <HeroSection />
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mt-12">
          <ProgressCharts />
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mt-12">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-6 h-6 text-chart-2" />
            <h2 className="text-2xl font-bold">Daily Planner</h2>
          </div>
          <DailyPlanner />
        </div>
      </SectionContainer>

      {/* <SectionContainer>
        <div className="mt-6 mb-10">
          <hr />
        </div>
      </SectionContainer>

      <SectionContainer>
        <PropertyListing />
      </SectionContainer> */}

      {/* <div className="mt-12">
        <ContactSection />
      </div> */}

      {/* <SectionContainer>
        <div className="mt-12">
          <ImageGallery />
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mt-12">
          <FAQSection />
        </div>
      </SectionContainer> */}

      {/* <div className="mt-20">
        <SectionContainer>
          <div className="border-t border-2" />
        </SectionContainer>
        <TextMarquee />
        <SectionContainer>
          <div className="border-b border-2" />
        </SectionContainer>
      </div> */}
    </>
  );
}
