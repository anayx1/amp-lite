import React from "react";
import AdminDashboard from "../AdminDashboard";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-3 md:p-5 bg-gray-100">
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
