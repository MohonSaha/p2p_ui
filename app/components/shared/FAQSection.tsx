import { useState, type SetStateAction } from "react";
import { ChevronDown } from "lucide-react";

const FAQSection = () => {
  // Initialize with the first item (index 0) open
  const [openItem, setOpenItem] = useState<number | null>(0);

  const toggleItem = (index: number | null) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqItems = [
    {
      question:
        "How do I start the process of buying a property with SAHA AGENCY?",
      answer:
        "At SAHA AGENCY, we make it simple for you to find your dream home. Start by browsing our property listings, and once you've found a property that interests you, contact our team to schedule a viewing and get expert advice on the next steps.",
    },
    {
      question: "What types of properties does SAHA AGENCY offer?",
      answer:
        "SAHA AGENCY offers a wide range of residential properties including apartments, houses, condos, and luxury homes across various locations to suit different preferences and budgets.",
    },
    {
      question: "Can SAHA AGENCY assist with property financing or mortgages?",
      answer:
        "Yes, SAHA AGENCY partners with several trusted financial institutions to provide competitive mortgage options. Our finance specialists can guide you through available financing options and help you secure the best rates for your property purchase.",
    },
    {
      question: "Does SAHA AGENCY provide property management services?",
      answer:
        "Yes, we offer comprehensive property management services for landlords, including tenant screening, rent collection, maintenance coordination, and regular property inspections to ensure your investment is well-maintained.",
    },
    {
      question: "Are there any fees involved in working with SAHA AGENCY?",
      answer:
        "Our fee structure varies depending on the service you're using. For buyers, our services are often complimentary. For sellers and landlords using our property management services, we charge competitive rates that reflect the quality and comprehensiveness of our services.",
    },
  ];

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-8">
        <div className="md:col-span-1 w-2/3 mt-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">
            Frequently Asked Question
          </h1>
          <p className="text-gray-600 mb-6 tracking-wider">
            Whether you're looking for a modern apartment in the city or a
            peaceful home in the suburbs, our listings offer something for
            everyone.
          </p>
        </div>

        <div className="md:col-span-1">
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleItem(index)}
                  className="flex justify-between items-center w-full py-4 text-left font-medium cursor-pointer"
                >
                  {item.question}
                  <ChevronDown
                    className={`transition-transform duration-200 h-5 w-5 ${
                      openItem === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {openItem === index && (
                  <div className="pb-4 text-gray-600">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
