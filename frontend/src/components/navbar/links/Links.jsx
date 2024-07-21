"use client";

import { useState } from "react";
import styles from "./links.module.css";
import NavLink from "./navLink/navLink";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
// import { handleLogout } from "@/lib/actions";

const links = [{ title: "Home Page", path: "/" }];

const Links = ({ session }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
  };
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map((link) => (
          <NavLink item={link} key={link.title} />
        ))}
        <>
          {session ? (
            <>
              <NavLink item={{ title: "Search Recipes", path: "/recipes" }} />
              <NavLink item={{ title: "Create New Post", path: "/newPost" }} />

              <button className={styles.logout} onClick={handleLogout}>
                <Link href={"/login"}>Logout</Link>
              </button>
            </>
          ) : (
            <NavLink item={{ title: "Login", path: "/login" }} />
          )}
        </>
      </div>
      <Image
        className={styles.menuButton}
        src="/menu.png"
        alt=""
        width={30}
        height={30}
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <div className={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink item={link} key={link.title} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Links;
