import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MainSection from "../components/homepage/MainSection";
// import Products from "../components/homepage/Products1";
import Products from "../components/homepage/Products";

import BestSeller from "../components/homepage/BestSeller";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <MainSection />
      <Products />
      <BestSeller/>
      <img
      src="promo.svg"
      alt="promo"
      className="w-full h-[100px]"
      />

      <Footer />
    </>
  );
};

export default Homepage;
