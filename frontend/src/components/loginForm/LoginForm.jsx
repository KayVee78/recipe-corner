"use client";

import Link from "next/link";
import styles from "./loginForm.module.css";
import { useRef, useContext, useState } from "react";

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameRef.current.value,
            password: passwordRef.current.value,
          }),
        }
      );

      const responseJson = await response.json();
      if (response.ok) {
        localStorage.setItem("loggedInUser", JSON.stringify(responseJson));
        window.location.replace("/recipes");
      } else {
        setError(true);
        setErrorText(responseJson.message);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            name="username"
            ref={usernameRef}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            ref={passwordRef}
          />
          <button>Login</button>
          {/* {state?.error} */}
          <Link href="/register">
            {"Don't have an account?"} <b>Register</b>
          </Link>
        </form>
        {error && (
          <span style={{ color: "#b71540", marginTop: "10px" }}>
            {errorText || "Something went wrong"}
          </span>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
