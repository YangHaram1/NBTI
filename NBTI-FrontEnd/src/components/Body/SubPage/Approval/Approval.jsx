import styles from "./Approval.module.css";
import { Side } from "./Side/Side";
import { Content } from "./Content/Content";
// import { Route, Routes } from "react-router";
// import { Write_DocForm } from "./Content/Write_DocForm/Write_DocForm";

export const Approval = () => {
  return (
    <div className={styles.container}>
      <Side />
      <Content />
      {/* <Routes>
        <Route path='/approval/write_form' element={<Write_DocForm/>}></Route>
      </Routes> */}
    </div>
  );
};
