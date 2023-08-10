import { useNavigate } from "react-router-dom";
import styles from "./NotFound.module.scss";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className={styles.body}>
      <span onClick={() => navigate(-1)}>&larr; Back</span>
      <h1>Page not found 😢</h1>
    </div>
  );
}
