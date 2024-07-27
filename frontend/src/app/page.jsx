"use client";

import ImageSlider from "@/components/imageSlider/ImageSlider";
import styles from "./home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  { url: "http://localhost:3000/home1.png" },
  { url: "http://localhost:3000/home2.png" },
  { url: "http://localhost:3000/home3.png" },
  { url: "http://localhost:3000/home4.png" },
];

const HomePage = () => {
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("loggedInUser")) {
      setDisabled(true);
    }
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        {/* <Image
          src="/home.png"
          alt=""
          width={600}
          height={450}
          className={styles.homeImg}
        /> */}
        <ImageSlider slides={slides} />
      </div>
      <div style={{ textAlign: "center" }} className={styles.textContainer}>
        <h1 className={styles.title}>WHAT TO COOK TODAY?</h1>
        <p className={styles.desc}>
          Discover and share culinary delights with our recipe sharing platform.
          <br />
          Connect with a community passionate about cooking.
        </p>
        <div
          style={{ justifyContent: "center" }}
          className={styles.buttonContainer}
        >
          <form onSubmit={handleButtonClick}>
            <button
              className={`${styles.button} ${styles.buttonLogin} ${
                disabled && styles.disabled
              }`}
              disabled={disabled}
            >
              Join Now
            </button>
          </form>
          {/* <Link href="/contact">
            <button className={`${styles.button} ${styles.buttonRegister}`}>
              Register
            </button>
          </Link> */}
        </div>
        <div className={styles.brands}>
          {/* <Image src="/brands.png" alt="" fill className={styles.brandImg} /> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
