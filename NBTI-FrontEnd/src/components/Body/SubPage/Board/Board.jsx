import styles from "./Board.module.css";
import { Side } from "./Side/Side";
import { Content } from "./Content/Content";

export const Board = () => {
  return (
    <div className={styles.container}>
      <Side />
      <Content />
    </div>
  );
};
