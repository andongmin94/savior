import React from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const Layout = ({ children }) => {
  return (
    <div className="h-screen relative w-full">
      <Header />
        <main className="min-h-full">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
