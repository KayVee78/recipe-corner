"use client";

import styles from "./registerForm.module.css";
import { useState } from "react";
import Link from "next/link";

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_APP_URL}/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        }
      );
      if (response.ok) {
        window.location.replace("/login");
      } else {
        setError(true);
        setErrorText(responseJson.message);
      }
      const responseJson = await response.json();
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleSubmit} method="POST">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <input
              type="password"
              placeholder="repeat password"
              name="passwordRepeat"
            /> */}
          <button>Register</button>
          {/* {state?.error} */}
          <Link href="/login">
            Have an account? <b>Login</b>
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

export default RegisterForm;
