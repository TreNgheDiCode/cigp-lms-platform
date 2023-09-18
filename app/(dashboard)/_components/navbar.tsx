"use client"

import { NavbarRoutes } from "@/components/navbar-routes";
import { MobileSidebar } from "./mobile-sidebar";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [mounted, isMounted] = useState(false);

  useEffect(() => {
    isMounted(true)
  }, [])
  
  if(!mounted) return null;

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};

export default Navbar;
