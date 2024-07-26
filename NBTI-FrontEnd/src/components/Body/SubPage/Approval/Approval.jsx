import styles from "./Approval.module.css";
import { Side } from "./Side/Side";
import { Content } from "./Content/Content";

export const Approval = () => {
  return (
    <div className={styles.container}>
      <Side />
      <Content />
    </div>
  );
};
