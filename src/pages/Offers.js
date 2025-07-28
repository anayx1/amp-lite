import React from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Card, CardContent } from "@mui/material";

const OffersPage = () => {
  // Sample offers data with layout information
  const offers = [
    {
      id: 1,
      image: "/api/placeholder/600/400",
      title: "Voltas AC Diwali Offer",
      contact: "+913265263535",
      span: 2, // Spans 2 columns
    },
    {
      id: 2,
      image: "/api/placeholder/300/400",
      title: "General AC Offer",
      contact: "+913265263535",
      span: 1,
    },
    {
      id: 3,
      image: "/api/placeholder/300/400",
      title: "Amazon AC Deal",
      contact: "+913265263535",
      span: 1,
    },
    {
      id: 4,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    {
      id: 5,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    {
      id: 6,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    {
      id: 7,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    {
      id: 8,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    {
      id: 9,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    {
      id: 10,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    {
      id: 11,
      image: "/api/placeholder/600/400",
      title: "Split AC Offer",
      contact: "+913265263535",
      span: 2,
    },
    // Add more offers as needed
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* Filter Bar */}
      <div className="flex items-center gap-4 mb-6 overflow-x-auto">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <Filter className="w-4 h-4" />
          <span>Filter By</span>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <span>Date</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <span>State</span>
          <ChevronDown className="w-4 h-4" />
        </button>

        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
          <span>City</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {offers.map((offer) => (
          <Card
            key={offer.id}
            className={`overflow-hidden ${
              offer.span === 2 ? "md:col-span-2" : "md:col-span-1"
            }`}
          >
            <CardContent className="p-0">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h3 className="font-medium text-sm">{offer.title}</h3>
                <p className="text-sm text-gray-600">{offer.contact}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Register now to get latest updates on promotions & coupons.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View More Button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-2 bg-black text-white rounded-lg">
          View More
        </button>
      </div>
    </div>
  );
};

export default OffersPage;
