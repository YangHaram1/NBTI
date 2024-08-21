import { useState } from 'react';
import { MainCalendar } from './Calendar/MainCalendar';
import ClockButton from './ClockButton/ClockButton';
import { FreeBoard } from "./FreeBoard/FreeBoard";
import { MainApproval } from './MainApproval/MainApproval';
import { NoticeBoard } from "./NoticeBoard/NoticeBoard";
import styles from "./Wrapper.module.css";
// import React, { useEffect } from "react";

export const Wrapper = () => {
    const [check,setCheck]= useState({in:false,out:false});
  // useEffect(() => {
  //   // 외부 스타일시트를 동적으로 추가
  //   const link = document.createElement("link");
  //   link.rel = "stylesheet";
  //   link.href =
  //     "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
  //   document.head.appendChild(link);

  //   // 컴포넌트가 언마운트될 때 스타일시트를 제거
  //   return () => {
  //     document.head.removeChild(link);
  //   };
  // }, []);

  return (
    <div className={styles.container}>
      <div className={styles.side}>
      <div className={styles.work_time}>
          <ClockButton type="clock-in"  check={check} setCheck={setCheck} />
          <ClockButton type="clock-out"  check={check} setCheck={setCheck}/>
        </div>
        <div className={styles.approval}><MainApproval/></div>
        <div className={styles.calendar}><MainCalendar/></div>
      </div>
      <div className={styles.board}>
        <div className={styles.notice_board}><NoticeBoard /></div>
        <div className={styles.free_board}><FreeBoard /></div>
      </div>
      {/* <div className={styles.up_btn}>
        <button>
          <i class="fa-solid fa-arrow-up fa-xl"></i>
        </button>
      </div> */}
    </div>
  );
};
