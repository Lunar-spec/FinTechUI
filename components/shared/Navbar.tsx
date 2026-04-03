"use client";
import Link from "next/link";
import { ModeToggle } from "./themebutton";
import { SwitchRole } from "./switchrole";
import { useRole } from "./roleprovider";
import { useState } from "react";
const Navbar = () => {
  const { role } = useRole();
  const [mounted, setMounted] = useState(false);

  return (
    <div className="flex items-center justify-between py-2 px-8 shadow-md">
      <Link href={"/"} className="flex items-center">
        FinTech
        <span className="text-purple-500 font-semibold text-xl">UI</span>
      </Link>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <div className="flex items-center gap-2 capitalize">
          <SwitchRole /> {mounted ? role : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
