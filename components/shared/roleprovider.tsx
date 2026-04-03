"use client";

import { createContext, useContext, useState } from "react";

type Role = "admin" | "user";

interface RoleContextValue {
  role: Role;
  setRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

function getInitialRole(): Role {
  if (typeof window === "undefined") return "user"; 
  const stored = localStorage.getItem("app-role");
  return stored === "admin" || stored === "user" ? stored : "user";
}

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>(getInitialRole);

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem("app-role", newRole);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used inside <RoleProvider>");
  return ctx;
}
