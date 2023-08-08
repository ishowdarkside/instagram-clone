/* eslint-disable react/prop-types */
import { AiOutlineMore } from "react-icons/ai";
import styles from "./Postmodal.module.scss";
import { useState } from "react";
import { useProtect } from "../../hooks/useProtect";
import { usePostContext } from "../../context/ActivePost";
import { useDeletePost } from "../../hooks/usePostActions";
import { useQueryClient } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner";
export default function Creator({ creator }) {
  const [isOptionsActive, setIsOptionsActive] = useState(false);

  const queryClient = useQueryClient();
  const { data: userData, isLoading: isLoadingMe } = useProtect();

  const {
    state: { activePost },
    dispatch,
  } = usePostContext();

  const { mutate } = useDeletePost();

  const handleDeletePost = () =>
    mutate(activePost._id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["user"]);
        dispatch({ type: "reset" });
      },
    });

  if (isLoadingMe) return <Spinner />;

  const { user } = userData;

  return (
    <div className={styles.creatorPanel}>
      <div>
        <img
          src={`http://127.0.0.1:3000/${creator.profilePicture}`}
          alt="profile avatar"
        />
        <span>{creator.username}</span>
      </div>
      {user._id === activePost.creator._id && (
        <div className={styles.popupWrapper}>
          <button onClick={() => setIsOptionsActive((curr) => !curr)}>
            <AiOutlineMore />
          </button>

          {isOptionsActive && (
            <div className={styles.popup}>
              <button onClick={handleDeletePost}>Delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
