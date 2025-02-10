import React from "react";
import Navbar from "../components/Navbar";

const Layout = ({ children }) => {
  return (
    <div className="bg-gradient-to-r from-slate-600 to-slate-700 min-h-screen">
      <Navbar />
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
