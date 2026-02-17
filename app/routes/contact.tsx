import FAQSection from "~/components/shared/FAQSection";
import { SectionContainer } from "~/components/shared/SectionContainer";
import ContactUs from "~/pages/ContactUs/ContactUs";
import TextMarquee from "~/pages/Home/TextMarquee/TextMarquee";

const contact = () => {
  return (
    <div>
      <SectionContainer>
        <div className="mt-24">
          <ContactUs />
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="mt-16">
          <FAQSection />
        </div>
      </SectionContainer>

      <div className="mt-12">
        <SectionContainer>
          <div className="border-t border-2" />
        </SectionContainer>
        <TextMarquee />
        <SectionContainer>
          <div className="border-b border-2" />
        </SectionContainer>
      </div>
    </div>
  );
};

export default contact;
