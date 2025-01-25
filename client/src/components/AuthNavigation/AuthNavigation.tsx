import styles from "./styles.module.scss";

const AuthNavigation = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Login</button>
      <button className={styles.button}>SignIn</button>
    </div>
  );
};

export default AuthNavigation;
