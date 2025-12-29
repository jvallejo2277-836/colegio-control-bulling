"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser, logout } from "@/utils/auth";

export default function UserMenu() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const u = getUser();
    setUser(u);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return null; // no rompe si no hay usuario
  }

  return (
    <div className="user-menu">
      <span className="user-name">
        {user.nombre} {user.apellido}
      </span>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}
