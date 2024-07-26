import styles from "./Main.module.css";
import { Wrapper } from "./Wrapper/Wrapper";
import { HeaderWrapper } from "./HeaderWrapper/HeaderWrapper.jsx";

export const Main = () => {
  return (
    <div className={styles.container}>
      <HeaderWrapper />
      <Wrapper />
    </div>
  );
};
