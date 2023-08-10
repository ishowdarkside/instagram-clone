import { useState } from "react";
import styles from "./Settings.module.scss";
import { useChangePassword } from "../../hooks/useProfileActions";

export default function PasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { mutate: changePassword } = useChangePassword();

  function handleSubmit(e) {
    e.preventDefault();
    changePassword(
      { oldPassword, newPassword },
      {
        onSuccess: (res) => {
          if (res.status === "success") {
            setOldPassword("");
            setNewPassword("");
          }
        },
      }
    );
  }

  return (
    <form className={styles.passwordForm} onSubmit={(e) => handleSubmit(e)}>
      <h2>Change password</h2>
      <div>
        <label>Previous password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>

      <div>
        <label>New password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <button>Save password</button>
    </form>
  );
}
