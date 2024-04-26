import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MainNav from "../../components/Navbar/MainNav";
import LowNav from "../../components/Navbar/LowNav";
import MobileNav from "../../components/Navbar/MobileNav";

export default function NavbarLayout({ title, children }) {
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>
      <div className="body-bg-2">
        <header>
          <MainNav />
          <LowNav />
          <MobileNav />
        </header>
        {children}
      </div>
    </div>
  );
}
