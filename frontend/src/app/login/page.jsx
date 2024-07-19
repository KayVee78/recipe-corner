"use client";

// import { useState, useRef, useContext } from "react";
import Link from "next/link";
import styles from "./login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} action={""}>
          <input type="text" placeholder="username" name="username" />
          <input type="password" placeholder="password" name="password" />
          <button>Login</button>
          {/* {state?.error} */}
          <Link href="/register">
            {"Don't have an account?"} <b>Register</b>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
