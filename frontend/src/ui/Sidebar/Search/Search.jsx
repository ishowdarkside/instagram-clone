/* eslint-disable react/prop-types */
import { useState } from "react";
import styles from "./Search.module.scss";
import { IoCloseSharp } from "react-icons/io5";
import { useSearchUsers } from "../../../hooks/useProfileActions";
import Spinner from "../../Spinner/Spinner";
import SearchResult from "./SearchResult";
export default function Search({ setIsSearchActive }) {
  const [input, setInput] = useState("");
  const { data, isLoading } = useSearchUsers(input);
  return (
    <div className={styles.searchPanel}>
      <button
        className={styles.closeSearch}
        onClick={() => setIsSearchActive(false)}
      >
        <IoCloseSharp />
      </button>
      <span>Search for users</span>
      <input
        type="search"
        placeholder="@username"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {isLoading && <Spinner />}
      {!isLoading && (
        <div className={styles.searchResults}>
          {data.length === 0 && input !== "" && (
            <span className={styles.noResults}>No results!</span>
          )}
          {data.length > 0 &&
            data.map((r) => <SearchResult data={r} key={r._id} />)}
        </div>
      )}
    </div>
  );
}
