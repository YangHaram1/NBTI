import styles from "./Insert.module.css";
import axios from "axios";
import BoardEditor from "../../../../BoardEditor/BoardEditor";
import { useState, useEffect } from "react";
import { host } from "../../../../../../config/config";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../../../../../store/store";
import { format } from "date-fns";
import Swal from "sweetalert2";
import SweetAlert from "../../../../../../function/SweetAlert";

export const Insert = () => {
  const navi = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // 임시저장 팝업 창 열림/닫힘 상태 관리
  const [isAdmin, setIsAdmin] = useState(false); // 권한 여부 상태
  const [isNotice, setIsNotice] = useState(false); // 체크박스 상태 관리
  const { boardType, setBoardSeq } = useBoardStore();

  const [board, setBoard] = useState({
    title: "",
    contents: "",
    board_code: 1,
  }); // 1: 자유게시판
  const [tempBoard, setTempBoard] = useState({
    title: "",
    contents: "",
    board_code: 1,
  });
  const [tempBoardList, setTempBoardList] = useState([]);
  const [tempSaveTime, setTempSaveTime] = useState(""); // 임시 저장 시간 상태

  // 1 : 자유 2: 공지
  let code = 1;
  if (boardType === "자유") code = 1;
  else if (boardType === "공지") code = 2;

  // 글 입력
  const handleInput = (e) => {
    const { name, value } = e.target;
    setBoard((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // 글 입력 추가버튼
  const handleAddBtn = () => {
    if (board.title.trim() === "" || board.contents.trim() === "") {
      Swal.fire({
        icon: "error",
        text: "제목, 내용을 작성해주세요.",
      });
      return; // 유효성 검사 통과하지 못하면 함수 종료
    }

    // 글 작성 완료
    axios.post(`${host}/board`, board).then((resp) => {
      Swal.fire({
        icon: "success",
        text: "글이 작성되었습니다.",
      });
      navi("/board/free");
    });
  };

  // 로그인 한 사용자 정보 및 HR 권한 확인
  useEffect(() => {
    axios.get(`${host}/members`).then((resp) => {
      if (resp.data.member_level === "2" || resp.data.member_level === "3") {
        // HR 권한 확인
        axios.get(`${host}/members/selectLevel`).then((resp1) => {
          const hrStatus = resp1.data[parseInt(resp.data.member_level) - 1]?.hr; // 배열의 n번째 요소에서 hr 확인

          if (hrStatus === "Y") {
            setIsAdmin(true); // Y일 때 true
          }
        });
      }
    });
  }, []);

  // 체크박스 변경 (공지 게시판)
  const handleCheckbox = (e) => {
    setIsNotice(e.target.checked);
    setBoard((prev) => {
      return { ...prev, board_code: e.target.checked ? 2 : 1 };
    });
  };

  //---------------------------------------------------------------임시저장

  // 팝업창 공통 함수
  // 임시 저장된 목록 출력
  const saveTempBoard = () => {
    axios.get(`${host}/tempBoard/tempList/${code}`).then((resp) => {
      setTempBoardList(resp.data);
    });
  };

  // 임시 저장 버튼
  const handleTempSaveBtn = () => {
    setTempBoard(board); // 작성한 내용을 tempBoard에 담기

    if (tempBoardList.length >= 10) {
      Swal.fire({
        icon: "error",
        text: "임시 저장된 게시물이 최대 개수(10개)를 초과했습니다. 기존 게시물을 삭제한 후 다시 시도해주세요.",
      });
      return; // 임시 저장 수행 X
    }

    if (board.title.trim() === "" || board.contents.trim() === "") {
      Swal.fire({
        icon: "error",
        text: "제목, 내용을 작성해주세요.",
      });
      return; // 유효성 검사 통과하지 못하면 함수 종료
    }

    // 임시 저장 완료
    axios
      .post(`${host}/tempBoard/tempSave`, board)
      .then((resp) => {
        if (resp.data === 1) {
          const now = new Date();
          setTempSaveTime(format(now, "yyyy-MM-dd HH:mm:ss"));
          Swal.fire({
            icon: "success",
            text: "임시저장 되었습니다.",
          });
          saveTempBoard(); // 임시 저장된 게시물 목록 업데이트 역할
        }
      })
      .catch((error) => {
        console.error("임시저장 오류: ", error);
        Swal.fire({
          icon: "error",
          text: "임시저장에 실패했습니다.",
        });
      });
  };

  // 임시저장 팝업 열기 + 임시 저장된 목록 출력
  const openPopup = () => {
    setIsPopupOpen(true);
    saveTempBoard();
  };

  // 임시 저장된 목록 출력 (컴포넌트 마운트 시)
  useEffect(() => {
    saveTempBoard();
  }, [code]);

  // 임시 저장 삭제
  const handleTempSavaDel = (seq) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete(`${host}/tempBoard/delete/${seq}`)
        .then((resp) => {
          if (resp.data === 1) {
            setTempBoardList((prev) => {
              return prev.filter((item) => item.seq !== seq);
            });
          }
        })
        .catch((error) => {
          console.error("임시저장 삭제 실패: ", error);
          Swal.fire({
            icon: "error",
            text: "삭제에 실패했습니다.",
          });
        });
    }
  };

  // 임시 저장 수정 (작성된 글 불러오기)
  const tempBoardModify = (seq) => {
    axios.get(`${host}/tempBoard/modify/${seq}`).then((resp) => {
      setBoard(resp.data);
      setTempSaveTime(
        format(new Date(resp.data.write_date), "yyyy-MM-dd HH:mm:ss")
      ); // 수정할 글의 임시저장 시간을 설정

      closePopup(); // 팝업창 닫는 함수 호출
    });
  };

  // 임시저장 팝업 닫기
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div>
          {/* 관리자일 때 보이는 공지게시판 글쓰기용 체크박스 */}
          {isAdmin && (
            <label>
              <input
                type="checkbox"
                checked={isNotice}
                onClick={handleCheckbox}
              />
              <p>공지 게시판</p>
            </label>
          )}
        </div>
        <div>
          <p onClick={openPopup}>
            임시보관 된 게시물 ( {tempBoardList.length} )
          </p>
        </div>
      </div>
      <div className={styles.top}>
        <div className={styles.left}>
          <p>제목</p>
          <input
            type="text"
            name="title"
            value={board.title}
            maxLength={30}
            placeholder="30자 이하의 제목을 입력하세요."
            onChange={handleInput}
          />
          <p className={styles.tempSave}>임시저장 : {tempSaveTime}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.btns}>
            <button onClick={handleTempSaveBtn}>임시저장</button>
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
        <BoardEditor
          board={board}
          setBoard={setBoard}
          contents={board.contents}
        />
      </div>

      {/* 팝업 창 */}
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>임시 저장된 글 목록</h3>
            <div className={styles.tempSaveList}>
              {tempBoardList.map((item, i) => {
                const date = new Date(item.write_date);
                const currentDate = !isNaN(date)
                  ? format(date, "yyyy-MM-dd HH:mm:ss")
                  : "Invalid Date";

                const boardCodeValue =
                  item.board_code === 1
                    ? "자유"
                    : item.board_code === 2
                    ? "공지"
                    : "알 수 없음";

                return (
                  <div key={i}>
                    <div className={styles.tempSaveValue}>{boardCodeValue}</div>
                    <div className={styles.tempSaveTitle}>{item.title}</div>
                    <div className={styles.tempSaveTime}>{currentDate}</div>
                    <div className={styles.tempSaveBtns}>
                      <button
                        className={styles.mod}
                        onClick={() => {
                          tempBoardModify(item.seq);
                        }}
                      >
                        수정
                      </button>
                      <button
                        className={styles.del}
                        onClick={() => {
                          handleTempSavaDel(item.seq);
                        }}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <span>
              저장된 글은 최대 10개까지 저장되며, 가장 오래된 순서대로
              삭제됩니다. <br />
              첨부한 이미지나 파일은 저장되지 않습니다.
            </span>
            <button onClick={closePopup}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
};
