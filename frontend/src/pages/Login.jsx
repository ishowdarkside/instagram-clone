import { Link } from "react-router-dom";
import styles from "./Login.module.scss";
export default function Login() {
  return (
    <div className={styles.loginBody}>
      <form>
        <img src="/logo.svg" alt="logo img" />
        <input type="text" placeholder="username, or email" />
        <input type="password" placeholder="password" />
        <button disabled={true}>Log in</button>
      </form>

      <div className={styles.register}>
        <span>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </span>
      </div>
    </div>
  );
}
