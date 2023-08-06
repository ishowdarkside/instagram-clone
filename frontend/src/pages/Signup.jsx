import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import styles from "./Signup.module.scss";
import Spinner from "../ui/Spinner/Spinner";
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm();

  const { mutate, isLoading } = useSignup();
  if (isLoading) return <Spinner />;
  return (
    <div className={styles.signupBody}>
      <form onSubmit={handleSubmit((data) => mutate(data))}>
        <img src="/logo.svg" alt="logo img" />
        <div>
          <input
            type="text"
            placeholder="username"
            {...register("username", { required: true })}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="First name"
            {...register("firstName", { required: true })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            {...register("lastName", { required: true })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register("password", { required: true })}
          />
        </div>

        <div>
          <input
            type="password"
            placeholder="Password confirm"
            autoComplete="new-password"
            {...register("passwordConfirm", {
              required: true,
            })}
          />
        </div>
        <button disabled={!isValid}>Sign up</button>
      </form>

      <div className={styles.login}>
        <span>
          Already have an account? <Link to="/login">Log in</Link>
        </span>
      </div>
    </div>
  );
}
