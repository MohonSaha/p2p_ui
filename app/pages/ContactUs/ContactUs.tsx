import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent } from "~/components/ui/card";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="w-full mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Get in Touch with Us</h1>
          <p className="text-gray-600 max-w-2xl">
            Have questions or need assistance? We're here to help—reach out and
            let’s create something amazing together!
          </p>
        </div>
        <p>Contact Us</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column - Contact Form */}
        <Card className="bg-gray-50 p-5 shadow-sm">
          <CardContent className="p-0">
            <h2 className="font-semibold text-lg mb-4">GET IN TOUCH</h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  NAME
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name*"
                  className="w-full bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  PHONE NUMBER
                </label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number*"
                  className="w-full bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  EMAIL
                </label>
                <Input
                  id="email"
                  placeholder="Enter your email*"
                  className="w-full bg-white"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  YOUR MESSAGE
                </label>
                <Textarea
                  id="message"
                  rows={10}
                  placeholder="Write your message here..."
                  className="w-full bg-white resize-none"
                />
              </div>

              <Button className="w-full bg-slate-900 hover:bg-black text-white font-medium">
                SEND MESSAGE
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Contact Information */}
        <div className="space-y-4">
          <Card className="bg-gray-50 p-5 shadow-sm">
            <CardContent className="p-0">
              <h2 className="font-semibold text-lg mb-4">
                CONTACT INFORMATION
              </h2>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="mr-4">
                    <Phone className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">PHONE</p>
                    <p>703.627.0444 </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-4">
                    <MapPin className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">ADDRESS</p>
                    <p>1425 N McLean Blvd, Elgin, IL</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="mr-4">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">EMAIL</p>
                    <p>SAHA.REALTOR@GMAIL.COM </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 p-5 shadow-sm">
            <CardContent className="p-0">
              <h2 className="font-semibold text-lg mb-4">BUSINESS HOURS</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium">MONDAY - FRIDAY</p>
                  <p>5:00 am - 8:00 pm</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-medium">SATURDAY</p>
                  <p>9:00 am - 4:00 pm</p>
                </div>

                <div className="flex justify-between">
                  <p className="font-medium">SUNDAY</p>
                  <p>9:00 am - 5:00 pm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
