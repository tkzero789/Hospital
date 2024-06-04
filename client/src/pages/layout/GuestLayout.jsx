import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import MainNav from "../../components/Navbar/MainNav";
import SubNav from "../../components/Navbar/SubNav";
import MobileNav from "../../components/Navbar/MobileNav";
import { useLocation } from "react-router-dom";

export default function NavbarLayout({ title, children }) {
  const location = useLocation(); // Get current route
  const navbarClass = location.pathname === "/home" ? "fixed-top" : "";

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>
      <div className="body-bg-2">
        <header className={navbarClass}>
          <SubNav />
          <MainNav />
          <MobileNav />
        </header>
        {children}
      </div>
    </>
  );
}
