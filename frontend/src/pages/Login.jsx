import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Login.module.scss";
import { useLogin } from "../hooks/useAuth";
export default function Login() {
  const { mutate, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  return (
    <div className={styles.loginBody}>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <img src="/logo.svg" alt="logo img" />
        <input
          type="text"
          placeholder="username, or email"
          autoComplete="username"
          {...register("username", { required: true })}
        />
        <input
          type="password"
          placeholder="password"
          autoComplete="current-password"
          {...register("password", { required: true })}
        />
        <button disabled={!isValid}>Log in</button>
      </form>

      <div className={styles.register}>
        <span>
          Don&apos;t have an account? <Link to="/signup">Sign up</Link>
        </span>
      </div>
    </div>
  );
}
