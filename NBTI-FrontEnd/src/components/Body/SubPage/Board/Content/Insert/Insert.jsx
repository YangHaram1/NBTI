import axios from "axios";
import BoardEditor from "../../../../BoardEditor/BoardEditor";
import styles from "./Insert.module.css";
import { useState } from 'react';
import { host } from '../../../../../../config/config'
import { useNavigate } from "react-router-dom";

export const Insert = () => {

  // 팝업 창의 열림/닫힘 상태를 관리하는 상태
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업 창을 여는 함수
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // 팝업 창을 닫는 함수
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const navi = useNavigate();

  const [board, setBoard] = useState({ title: '', contents: '', board_code: 1 });

  const handleInput = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBoard((prev) => {
      return (
        { ...prev, [name]: value }
      )
    })
  }

  const handleAddBtn = () => {
    console.log(board);

    axios.post(`${host}/board`, board).then((resp) => {
      alert("글이 작성되었습니다.");
      navi('/board/free')
    })

  }

  return (
    <div className={styles.container}>
      <div className={styles.box} onClick={openPopup}>
        <p>임시보관 된 게시물 ( 0 )</p>
        {/* <a href="#">임시보관 된 게시물 ( )</a> */}
      </div>
      <div className={styles.top}>
        <div className={styles.left}>
          <p>제목</p>
          <input type="text" name="title" value={board.title} placeholder="제목을 입력하세요." onChange={handleInput} />
          <p className={styles.tempSave}>임시저장 : 2024-07-26-17:13</p>
        </div>
        <div className={styles.right}>
          <div className={styles.btns}>
            <button>임시저장</button>
            <button onClick={handleAddBtn}>작성완료</button>
          </div>
        </div>
      </div>
      <div className={styles.files}>
        <div>
          <input type="file" />
        </div>
      </div>
      <div className={styles.contents}>
        <BoardEditor setBoard={setBoard} />
      </div>

      {/* 팝업 창 */}
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>임시 저장된 글 목록</h3>
            <div className={styles.tempSaveList}>
              <div>
                <div className={styles.tempSaveTitle}>임시저장 예시 111</div>
                <div className={styles.tempSaveTime}>2024-07-20 14:20</div>
                <div className={styles.tempSaveBtns}>
                  <button className={styles.mod}>수정</button>
                  <button className={styles.del}>삭제</button>
                </div>
              </div>
            </div>
            <span>
              저장된 글은 최대 10개까지 저장되며, 가장 오래된 순서대로 삭제됩니다. <br />
              첨부한 이미지나 파일은 저장되지 않습니다.
            </span>
            <button onClick={closePopup}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};
