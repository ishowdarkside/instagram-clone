import GeneralForm from "./GeneralForm";
import styles from "./Settings.module.scss";
export default function Settings() {
  return (
    <div className={styles.settingsPanel}>
      <h2>Settings</h2>
      <GeneralForm />
    </div>
  );
}
