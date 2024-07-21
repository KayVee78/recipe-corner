"use client";
import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
// import { auth } from "@/lib/auth";

const NavBar = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      setSession(JSON.parse(loggedInUser));
    }
  }, []);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        RecipeCorner
      </Link>
      <div>
        <Links session={session} />
      </div>
    </div>
  );
};
export default NavBar;
