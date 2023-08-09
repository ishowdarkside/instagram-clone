import { createPost } from "../../../services/postFunctions";
import styles from "./CreatePostModal.module.scss";
import { useForm } from "react-hook-form";
import { usePostContext } from "../../../context/ActivePost";
import { useQueryClient } from "@tanstack/react-query";
export default function CreatePostModal() {
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm();

  const queryClient = useQueryClient();
  const { dispatch } = usePostContext();
  async function handlePost(data) {
    const formData = new FormData();
    const photosArr = Array.from(data.photos);
    photosArr.forEach((i) => formData.append("photos", i));
    formData.append("description", data.description);
    await createPost(formData);
    dispatch({ type: "reset" });
    queryClient.invalidateQueries({ queryKey: ["user"] });
  }
  return (
    <div className={styles.modalWrapper}>
      <img src="/photpo.svg" alt="photpo.svg" />
      <span>Share a post</span>
      <form onSubmit={handleSubmit((data) => handlePost(data))}>
        <label htmlFor="photos">Choose from computer</label>
        <input
          type="file"
          multiple={true}
          id="photos"
          name="photos"
          {...register("photos", { required: true })}
        />
        <input
          type="text"
          placeholder="Write a caption"
          {...register("description")}
        />
        <button disabled={!isValid}>Share</button>
      </form>
    </div>
  );
}
