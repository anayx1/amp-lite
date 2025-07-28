import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Grid,
  Home,
  Wrench,
  Settings,
  Users,
  PenToolIcon as Tool,
  Tag,
  ShoppingCart,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const sliderRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Category items for mobile slider
  const categoryItems = [
    { icon: <Grid className="h-6 w-6" />, label: "All Categories" },
    { icon: <Home className="h-6 w-6" />, label: "Home" },
    { icon: <Wrench className="h-6 w-6" />, label: "AC Repair" },
    { icon: <Settings className="h-6 w-6" />, label: "AC Services" },
    { icon: <Users className="h-6 w-6" />, label: "Add Business" },
    { icon: <Tool className="h-6 w-6" />, label: "Install/Uninstall" },
    { icon: <Tag className="h-6 w-6" />, label: "Offers" },
  ];

  // Drawer menu items
  const drawerItems = [
    { icon: <User className="h-5 w-5" />, label: "My Account" },
    { icon: <Grid className="h-5 w-5" />, label: "All Categories" },
    { icon: <Users className="h-5 w-5" />, label: "Dealer Add Business" },
    { icon: <HelpCircle className="h-5 w-5" />, label: "Help Center" },
  ];

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? sliderRef.current.scrollLeft - scrollAmount
          : sliderRef.current.scrollLeft + scrollAmount;

      sliderRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.addEventListener("scroll", checkScroll);
      checkScroll();
      return () => slider.removeEventListener("scroll", checkScroll);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        {/* Top bar - Hidden on mobile */}
        <div className="bg-white text-gray-600 text-sm hidden md:block">
          <div className="container mx-auto flex items-center justify-between h-10 px-[10%]">
            <div className="flex items-center gap-4">
              <Link className="hover:text-blue-500 text-black" to="#">
                About Us
              </Link>
              <Link className="hover:text-blue-500 text-black" to="/profile/">
                My account
              </Link>
              <Link className="hover:text-blue-500 text-black" to="/blogs/">
                Blog
              </Link>
            </div>

          </div>
        </div>

        {/* Main header */}
        <div className="border-b bg-[#219BFB] sticky top-0 z-40">
          <div className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4 md:px-[10%]">
            {/* Mobile menu button */}
            <button
              className="text-white md:hidden"
              onClick={toggleDrawer}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Logo */}
            <Link className="flex items-center gap-2" to="/">
              <img
                src="/media/logo.png"
                alt="AC Logo"
                className="h-[auto] w-16 md:w-20"
              />
            </Link>

            {/* Search bar - Hidden on mobile */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative">
                <input
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md"
                  placeholder="Search for AC2 products, categories or brands..."
                  type="search"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Cart/Account */}
            <div className="flex items-center gap-4 text-white">
              <ShoppingCart className="h-6 w-6 md:hidden" />
              <Link to='/profile/'>
                <div className="hidden md:flex items-center gap-2 cursor-pointer">
                  <User className="h-6 w-6" />
                  <span>Account</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="px-4 pb-3 md:hidden">
            <div className="relative">
              <input
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-full text-sm"
                placeholder="Search for products..."
                type="search"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Desktop Categories */}
        <div className="w-full bg-[#219BFB] hidden md:block">
          <div className="container mx-auto grid grid-cols-9 divide-x divide-blue-400 ">
            <Link
              to="#"
              className="col-span-2 flex flex-col text-center items-center justify-center gap-2 px-6 py-6 text-white hover:bg-blue-500 transition-colors"
            >
              <Grid className="h-5 w-5" />
              <span className="text-md font-medium">All Categories</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col text-center items-center justify-center gap-2 px-6 py-6 text-white hover:bg-blue-500 transition-colors"
            >
              <Home className="h-5 w-5" />
              <span className="text-md font-medium">Home</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col text-center items-center justify-center gap-2 px-6 py-6 text-white hover:bg-blue-500 transition-colors"
            >
              <Wrench className="h-5 w-5" />
              <span className="text-md font-medium">Ac Repair</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col text-center items-center justify-center gap-2 px-6 py-6 text-white hover:bg-blue-500 transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="text-md font-medium">Ac Services</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col text-center items-center justify-center gap-2 px-6 py-6 text-white hover:bg-blue-500 transition-colors"
            >
              <Users className="h-5 w-5" />
              <span className="text-md font-medium">Dealer Add Business</span>
            </Link>
            <Link
              to="#"
              className="flex flex-col text-center items-center justify-center gap-2 px-6 py-6 text-white hover:bg-blue-500 transition-colors"
            >
              <Tool className="h-5 w-5" />
              <span className="text-md font-medium">Ac Install Uninstall</span>
            </Link>
            <Link
              to="#"
              className="col-span-2 flex items-center justify-center gap-2 px-6 py-6 text-white hover:bg-blue-500 transition-colors relative"
            >
              <Tag className="h-5 w-5" />
              <span className="text-md font-medium">Offers</span>
              <span className="absolute top-1 right-1 px-1.5 py-0.5 text-xs font-semibold bg-red-500 text-white rounded">
                SALE
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Categories Slider */}
        <div className="md:hidden bg-white border-b relative">
          {showLeftScroll && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 p-1 shadow-md rounded-full"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}

          {showRightScroll && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-90 p-1 shadow-md rounded-full"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          )}

          <div
            ref={sliderRef}
            className="flex overflow-x-auto scrollbar-hide py-4 px-4 gap-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categoryItems.map((item, index) => (
              <Link
                key={index}
                to="#"
                className="flex flex-col items-center gap-1 min-w-[4.5rem]"
              >
                <div className="p-2 rounded-full bg-gray-100">{item.icon}</div>
                <span className="text-xs text-gray-600 text-center whitespace-nowrap">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 md:hidden ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          onClick={toggleDrawer}
        >
          <div
            className={`fixed inset-y-0 left-0 w-72 bg-white transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 bg-[#219BFB] text-white">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span className="text-lg font-semibold">Login & Signup</span>
              </div>
              <button onClick={toggleDrawer} className="p-1">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              <div className="flex flex-col py-2">
                {drawerItems.map((item, index) => (
                  <Link
                    key={index}
                    to="#"
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 transition-colors"
                    onClick={toggleDrawer}
                  >
                    {item.icon}
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="border-t">
                <div className="px-4 py-3">
                  <h3 className="text-sm font-semibold text-gray-600">
                    Language
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    <button className="px-4 py-1 border rounded text-sm text-gray-700 hover:bg-gray-50">
                      English
                    </button>
                    <button className="px-4 py-1 border rounded text-sm text-gray-700 hover:bg-gray-50">
                      हिंदी
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
