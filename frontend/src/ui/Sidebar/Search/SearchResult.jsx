import { Link } from "react-router-dom";
import styles from "./Search.module.scss";
export default function SearchResult(data) {
  const { data: searchResult } = data;
  return (
    <Link
      to={`/app/profile/${searchResult._id}`}
      className={styles.searchResult}
    >
      <img src={`/${searchResult.profilePicture}`} />
      <span className={styles.username}>{searchResult.username}</span>
      <span className={styles.fullName}>
        {searchResult.firstName} {searchResult.lastName}
      </span>
    </Link>
  );
}
