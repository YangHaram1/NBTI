import styles from "./FreeBoard.module.css";
import image from "../../../../../images/user.jpg";
import { useEffect, useState, useRef } from "react";
import { host } from "../../../../../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useBoardStore } from "../../../../../store/store";
import { format } from "date-fns";

export const FreeBoard = () => {
  const navi = useNavigate();
  const { boardSeq, setBoardSeq, boardType, setBoardType } = useBoardStore();
  const [board, setBoard] = useState([]); // 게시글의 data
  const [currentUser, setCurrentUser] = useState(null); // 로그인된 사용자 정보 상태
  const [replyContents, setReplyContents] = useState("");
  const [reply, setReply] = useState([]);
  const inputRef = useRef(null);
  const [seq, setSeq] = useState();
  const [transform, setTransform] = useState(false);

  const [isLiked, setIsLiked] = useState({}); // 좋아요 상태를 객체로 저장

  useEffect(() => {
    // 자유 게시판 글 & 댓글 출력
    axios.get(`${host}/board/freeBoard`).then((resp) => {
      setBoard(resp.data.list);
      setReply(resp.data.rlist);
      setBoardType("자유");

      // 좋아요 상태 가져오기
      resp.data.rlist.forEach((reply) => {
        reply.forEach((innerReply) => {
          axios.get(`${host}/likes/status/${innerReply.seq}`).then((resp) => {
            // boolean 반환
            // 좋아요 상태의 prev에 새롭게 true / false를 업데이트
            setIsLiked((prev) => ({ ...prev, [innerReply.seq]: resp.data }));
          });
        });
      });
    });

    // 로그인 한 사용자 정보
    axios.get(`${host}/members`).then((resp) => {
      setCurrentUser(resp.data);
    });
  }, [transform]);

  // 댓글 입력 감지
  const handleInput = (e) => {
    setReplyContents(e.target.innerText);
  };

  // 댓글 입력 및 추가
  const handleReplyAdd = (boardSeq) => {
    let code = 1;
    const requestBody = {
      board_seq: boardSeq,
      board_code: code,
      contents: replyContents,
    };

    axios.post(`${host}/reply`, requestBody).then((resp) => {
      // setTransform(true);

      setTransform((prev) => !prev); // 트랜스폼 상태 변경하여 useEffect 재실행
      // 댓글 입력 창 초기화
      document.getElementById(`replyInput-${boardSeq}`).innerText = "";
      setReplyContents("");
    });
  };

  // 댓글 삭제
  const handleDelReplyBtn = (replySeq) => {
    axios.delete(`${host}/reply/${replySeq}`).then((resp) => {
      setReply((prev) => {
        return prev.map((item, i) => {
          return item.filter((ritem) => ritem.seq !== replySeq);
        });
      });
    });
  };

  // 댓글 좋아요 클릭
  const handleLikekAdd = (seq, i) => {
    console.log("조아요..", seq);
    setIsLiked((prev) => ({ ...prev, [seq]: true })); // 상태를 true로 변환

    axios.post(`${host}/likes/insert`, { reply_seq: seq }).then((resp) => {
      if (resp.data === 1) console.log("조아요 성공");
    });

    setReply((prev) => {
      let data = [];
      for (let j = 0; j < prev.length; j++) {
        if (i === j) {
          const newData = prev[j].map((item, index) => {
            if (seq == item.seq) return { ...item, count: item.count + 1 };
            else return item;
          });
          data.push(newData);
        } else {
          data.push(prev[j]);
        }
      }
      return data;
    });
  };

  // 댓글 좋아요 해제
  const handleLikeRemove = (seq, i) => {
    setIsLiked((prev) => ({ ...prev, [seq]: false }));

    axios.delete(`${host}/likes/delete/${seq}`).then((resp) => {
      if (resp.data === 1) console.log("조아요 취소");

      setReply((prev) => {
        let data = [];
        for (let j = 0; j < prev.length; j++) {
          if (i === j) {
            const newData = prev[j].map((item, index) => {
              if (seq == item.seq) return { ...item, count: item.count - 1 };
              else return item;
            });
            data.push(newData);
          } else {
            data.push(prev[j]);
          }
        }
        return data;
      });
    });
  };

  return (
    <div className={styles.container}>
      <h3>자유 게시판</h3>

      {board.map((item, i) => {
        const date = new Date(item.write_date);
        const currentDate = !isNaN(date)
          ? format(date, "yyyy-MM-dd HH:mm")
          : "Invalid Date";
        return (
          <div className={styles.boardList} key={i}>
            <div className={styles.header}>
              <div className={styles.profile}>
                <img src={image} alt="" />
              </div>
              <div className={styles.writer}>
                <p>{item.name}</p>
              </div>
              <div className={styles.writeDate}>
                <p>{currentDate}</p>
              </div>
            </div>
            <div className={styles.body}>
              <div
                className={styles.board}
                onClick={() => {
                  setBoardSeq(item.seq);
                  navi("/board/detail");
                }}
              >
                <div className={styles.boardTitle}>
                  <p>{item.title}</p>
                </div>
                <div className={styles.boardContents}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        item.contents.length > 200
                          ? item.contents.slice(0, 200) + " ..."
                          : item.contents,
                    }}
                  ></p>
                </div>
              </div>
              <div className={styles.reply}>
                <div className={styles.replyInput}>
                  <div
                    id={`replyInput-${item.seq}`} // 입력창 초기화하기 위해 부여하는 id
                    className={styles.inputText}
                    onInput={handleInput}
                    contentEditable="true"
                  ></div>
                  <button
                    onClick={() => {
                      handleReplyAdd(item.seq);
                    }}
                  >
                    등록
                  </button>
                </div>

                <div className={styles.replyOutputWrap}>
                  {reply[i].map((ritem, index) => {
                    // 댓글 날짜 타입 변경
                    const reply_date = new Date(ritem.write_date);
                    const reply_currentDate = !isNaN(reply_date)
                      ? format(reply_date, "yyyy-MM-dd HH:mm:ss")
                      : "Invalid Date";

                    return (
                      <div className={styles.replyOutput} key={index}>
                        <img src={image} alt="" />
                        <div>
                          <div className={styles.writer_writeDate}>
                            <span>{ritem.name}</span>
                            <span>{reply_currentDate}</span>
                          </div>
                          {/* <div
                            className={styles.replyContent}
                            dangerouslySetInnerHTML={{ __html: ritem.contents }}
                          /> */}
                          <div
                            className={styles.replyContent}
                            dangerouslySetInnerHTML={{
                              __html: ritem.contents.replace(/\n/g, "<br />"),
                            }}
                          />
                        </div>
                        <div className={styles.likes}>
                          <i
                            className="fa-regular fa-heart"
                            onClick={() => {
                              handleLikekAdd(ritem.seq, i);
                            }}
                            style={{
                              display: isLiked[ritem.seq] ? "none" : "inline",
                            }}
                          />
                          <i
                            className="fa-solid fa-heart"
                            onClick={() => {
                              handleLikeRemove(ritem.seq, i);
                            }}
                            style={{
                              display: isLiked[ritem.seq] ? "inline" : "none",
                            }}
                          />
                          <p>{ritem.count}</p>
                        </div>
                        {currentUser && currentUser.id === ritem.member_id && (
                          <button
                            onClick={() => {
                              handleDelReplyBtn(ritem.seq);
                            }}
                          >
                            X
                          </button>
                        )}
                      </div>
                    );
                  })}

                  {
                    // reply[i].length >= 6 && (
                    // <div className={styles.moreReplies}>...</div>
                    // )
                  }
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
