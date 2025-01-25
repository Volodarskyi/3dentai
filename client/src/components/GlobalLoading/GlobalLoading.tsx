import styles from "./globalLoading.module.scss";

const GlobalLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.text}>Loading..</div>
      </div>
    </div>
  );
};

export default GlobalLoading;
