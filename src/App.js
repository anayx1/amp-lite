import React from "react";
import { Routes, Route } from "react-router-dom";
import DealerRegister from "./pages/Dealer-register";
import Homepage from "./pages/Homepage";
// import LoginRegisterForm from "./pages/LoginRegisterForm";
import ProductDetail from "./pages/Product";
import ContactUs from "./pages/Contact";
// import BlogPostForm from "./pages/BlogPostForm";
// import OffersPage from "./pages/Offers";
// import Dashboard from './admin/components/Dashboard'
// import DealerListPage from "./admin/Dealerlist";
// import TeamsPage from "./admin/Teams";
// import AddTeamsPage from "./admin/addTeam";
// import SettingPage from "./admin/settingPage";
import SearchPage from "./pages/Search";
import ProfilePage from "./pages/Profile";
// import Blogs from "./admin/components/blogs/blogs";
// import SingleBlog from "./admin/components/blogs/SingleBlog";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/dealer-register/" element={<DealerRegister />} />
        {/* <Route path="/login/" element={<LoginRegisterForm />} /> */}
        <Route path="/profile/" element={<ProfilePage />} />
        <Route path="/" element={<Homepage />} />{" "}
        <Route path="/shop/" element={<ProductDetail />} />{" "}
        {/* <Route path="/blogs/" element={<Blogs />} /> */}
        {/* <Route path="/blogs/:id" element={<SingleBlog />} /> */}
        <Route path="/search/" element={<SearchPage />} />{" "}
        <Route path="/contact/" element={<ContactUs />} />{" "}
        {/* <Route path="/createBlog/" element={<BlogPostForm />} />{" "} */}
        {/* <Route path="/offers/" element={<OffersPage />} />{" "} */}
        {/* <Route path="/admin/Dashboard" element={<Dashboard />} />{" "}
        <Route path="/admin/DealerList" element={<DealerListPage />} />{" "}
        <Route path="/admin/Teams" element={<TeamsPage />} />{" "}
        <Route path="/admin/Add-team" element={<AddTeamsPage />} />{" "}
        <Route path="/admin/settings" element={<SettingPage />} />{" "} */}
      </Routes>
    </>
  );
};

export default App;
