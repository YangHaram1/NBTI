import styles from "./Main.module.css";
import { Wrapper } from "./Wrapper/Wrapper";
import { HeaderWrapper } from "./HeaderWrapper/HeaderWrapper.jsx";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "../../../store/store.js";
import Login from "../../Login/Login.jsx";

export const Main = () => {
  const [displayLogin, setDisplayLogin] = useState(false);
  const { loginID } = useAuthStore();

  useEffect(() => {
    if (loginID !== null && loginID!=='error') {
      setDisplayLogin(true);
    }
    else {
      setDisplayLogin(false);
    }
  },[])
  
  return (
    <React.Fragment>
      {!displayLogin && (<Login></Login>)}
      {displayLogin && (
        <div className={styles.container}>
        <HeaderWrapper />
        <Wrapper />
      </div>)}
    </React.Fragment>
  );
};
