import { useProtect } from "../../hooks/useProtect";
import { useForm } from "react-hook-form";
import styles from "./Settings.module.scss";
import { useChangeData } from "../../hooks/useProfileActions";
export default function GeneralForm() {
  const {
    data: { user },
  } = useProtect();

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm();

  const { mutate } = useChangeData();

  function handleChange(data) {
    const formData = new FormData();
    if (data.profilePicture[0] !== undefined)
      formData.append("profilePicture", data.profilePicture[0]);
    delete data.profilePicture;
    const entries = Object.entries(data);
    entries.forEach((e) => formData.append(e[0], e[1]));
    mutate(formData);
  }
  return (
    <form
      className={styles.generalForm}
      onSubmit={handleSubmit((data) => handleChange(data))}
    >
      <div>
        <img
          src={`http://127.0.0.1:3000/${user.profilePicture}`}
          alt="avatar"
        />
        <label htmlFor="profilePicture">Change profile picture</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          className={styles.fileInput}
          {...register("profilePicture")}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="username"
          defaultValue={user.username}
          {...register("username", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          placeholder="First name"
          defaultValue={user.firstName}
          {...register("firstName", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          placeholder="Last name"
          defaultValue={user.lastName}
          {...register("lastName", { required: true })}
        />
      </div>
      <div className={styles.accessibility}>
        <span>accessibility</span>
        <div>
          <input
            type="radio"
            value={true}
            defaultChecked={user.isPrivate}
            {...register("isPrivate")}
          />
          <label htmlFor="isPrivate">Private</label>
        </div>
        <div>
          <input
            type="radio"
            defaultChecked={!user.isPrivate}
            value={false}
            {...register("isPrivate")}
          />
          <label htmlFor="isPrivate">Public</label>
        </div>
      </div>
      <button disabled={!isValid}>Save changes</button>
    </form>
  );
}
