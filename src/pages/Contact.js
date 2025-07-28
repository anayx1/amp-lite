import {
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { MapPin } from "lucide-react";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.subject) newErrors.subject = "Subject is required";
    if (!formData.message) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Replace with your API endpoint
      await fetch("YOUR_API_ENDPOINT", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <Navbar />
      <section className="flex flex-col justify-center items-center mt-5">
        <div className="flex gap-3 my-5 text-bold flex-col justify-center items-center text-center">
          <h2 className="text-sm">Contact With Us</h2>
          <h3 className="text-5xl font-bold">You can ask us questions</h3>
          <Typography align="center" sx={{ mb: 6 }}>
            Contact us for all your questions and opinions, or you can solve
            your problems in a shorter time with our contact offices.
          </Typography>
        </div>
        <hr className="w-[90%]"></hr>
        <div className="flex lg:flex-row w-[90%] flex-col">
          <div className="flex flex-col lg:w-[50%] mt-5 gap-20 items-start px-5">
            <div>
              <h3 className="font-bold">Our Office</h3>
              <p className="text-[#6B7280]">
                On dekande mydurtad mora även om skurkstat. Semirade timaheten
                rena. Radiogen pasam inte loba även om prerade i garanterad
                traditionell specialitet till bebel. Ev is sönde. Tun gps-väst
                att epiligt. Diliga tresk dira. Ens biov dijevis.
              </p>
            </div>
            <div className="flex flex-row flex-wrap">
              <div>
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <MapPin />{" "}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      United States Office
                    </Typography>
                    <Typography color="textSecondary">
                      205 Middle Road, 2nd Floor, New York
                    </Typography>
                    <Typography color="textSecondary">
                      +02 1234 567 88
                    </Typography>
                    <Typography
                      component="a"
                      href="mailto:info@example.com"
                      sx={{ color: "#1976d2", textDecoration: "none" }}
                    >
                      info@example.com
                    </Typography>
                  </Box>
                </Box>
              </div>
              <div>
                <Box display="flex" alignItems="flex-start" gap={2}>
                  <MapPin />{" "}
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Munich Office
                    </Typography>
                    <Typography color="textSecondary">
                      205 Middle Road, 2nd Floor, New York
                    </Typography>
                    <Typography color="textSecondary">+5 456 123 22</Typography>
                    <Typography
                      component="a"
                      href="mailto:contact@example.com"
                      sx={{ color: "#1976d2", textDecoration: "none" }}
                    >
                      contact@example.com
                    </Typography>
                  </Box>
                </Box>
              </div>
            </div>
          </div>
          <div className="p-5 lg:w-[50%]">
            <p className="text-[#6B7280]">
              On dekande mydurtad mora även om skurkstat. Semirade timaheten
              rena. Radiogen pasam inte loba även om prerade i garanterad
              traditionell specialitet till bebel.
            </p>
            <form onSubmit={handleSubmit} className="space-y-6 mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 font-medium">Your name *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 font-medium">Your email *</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Subject *</label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium">Your message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-8 py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactUs;
