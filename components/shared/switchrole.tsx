"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react";
import { UserAiIcon, UserCircleIcon } from "@hugeicons/core-free-icons";
import { useRole } from "./roleprovider";

export function SwitchRole() {
  const { role, setRole } = useRole();
  const [mounted, setMounted] = useState(false);

  const refCallback = (node: HTMLElement | null) => {
    if (node && !mounted) setMounted(true);
  };

  const isAdmin = mounted && role === "admin";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            ref={refCallback}
            variant="outline"
            size="icon"
            className="cursor-pointer"
          >
            <HugeiconsIcon
              icon={UserAiIcon}
              className={`h-[1.2rem] w-[1.2rem] transition-all ${
                isAdmin ? "scale-100 rotate-0" : "scale-0 -rotate-90"
              }`}
            />
            <HugeiconsIcon
              icon={UserCircleIcon}
              className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
                isAdmin ? "scale-0 rotate-90" : "scale-100 rotate-0"
              }`}
            />
            <span className="sr-only">Switch Role</span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setRole("admin")}
          className={mounted && role === "admin" ? "font-semibold" : ""}
        >
          Admin
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setRole("user")}
          className={mounted && role === "user" ? "font-semibold" : ""}
        >
          User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
