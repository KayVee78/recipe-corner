import styles from "./register.module.css";
import Link from "next/link";

const RegisterPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} action={""}>
          <input type="text" placeholder="username" name="username" />
          <input type="email" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
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
      </div>
    </div>
  );
};

export default RegisterPage;
