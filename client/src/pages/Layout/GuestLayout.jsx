import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import MainNav from "components/Navbar/MainNav/MainNav";
import SubNav from "components/Navbar/SubNav/SubNav";
import MobileNav from "components/Navbar/MobileNav/MobileNav";

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
      <div>
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
