/* eslint-disable react/prop-types */
import { AiOutlineMore } from "react-icons/ai";
import styles from "./Postmodal.module.scss";
import { useState } from "react";
import { useProtect } from "../../hooks/useProtect";
import { usePostContext } from "../../context/ActivePost";
import { useDeletePost } from "../../hooks/usePostActions";
import { useQueryClient } from "@tanstack/react-query";
import { useGetProfile } from "../../hooks/useProfileActions";
import { useParams } from "react-router-dom";
export default function Creator({ creator }) {
  const [isOptionsActive, setIsOptionsActive] = useState(false);
  const { profileId } = useParams();
  const queryClient = useQueryClient();
  const {
    data: { user },
  } = useProtect();

  const {
    data: { user: profile },
  } = useGetProfile(profileId);
  console.log(profile);
  const {
    state: { activePost },
    dispatch,
  } = usePostContext();
  const { mutate } = useDeletePost();

  const handleDeletePost = () =>
    mutate(activePost._id, {
      onSuccess: () => {
        //dodati kasnije ovdje ako je creator === specificProfile onda invalidate specific Profile

        if (activePost.creator._id === profile._id)
          queryClient.invalidateQueries(["profile"]);

        if (activePost.creator._id === user._id)
          queryClient.invalidateQueries(["user"]);
        dispatch({ type: "reset" });
      },
    });

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
