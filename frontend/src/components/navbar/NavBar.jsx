import Links from "./links/Links";
import styles from "./navbar.module.css";
import Link from "next/link";
// import { auth } from "@/lib/auth";

const NavBar = async () => {
  // const session = await auth();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        RecipeCorner
      </Link>
      <div>
        <Links session={""} />
      </div>
    </div>
  );
};
export default NavBar;
