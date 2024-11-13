import styles from "./styles.module.scss";

const Navigation = () => {
  return (
    <div className={styles.container}>
      <button className={styles.button}>Prev</button>
      <button className={styles.button}>Next</button>
    </div>
  );
};

export default Navigation;
