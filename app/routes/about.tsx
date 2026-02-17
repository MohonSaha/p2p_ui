import AboutPage from "~/components/shared/About";
import { SectionContainer } from "~/components/shared/SectionContainer";
import Testimonials from "~/components/shared/Testimonials";

export default function About() {
  return (
    <>
      <SectionContainer>
        <div className="mt-16">
          <AboutPage />
        </div>
      </SectionContainer>
    </>
  );
}
