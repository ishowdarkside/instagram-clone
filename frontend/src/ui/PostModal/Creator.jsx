/* eslint-disable react/prop-types */
import { AiOutlineMore } from "react-icons/ai";
import styles from "./Postmodal.module.scss";

export default function Creator({ creator }) {
  return (
    <div className={styles.creatorPanel}>
      <div>
        <img
          src={`http://127.0.0.1:3000/${creator.profilePicture}`}
          alt="profile avatar"
        />
        <span>{creator.username}</span>
      </div>
      <button>
        <AiOutlineMore />
      </button>
    </div>
  );
}
