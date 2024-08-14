import { useContext, useRef, useEffect, useCallback, useState } from 'react';
import { ChatsContext } from '../../../Context/ChatsContext.js';
import styles from './Chat.module.css';
import MyEditor from './../MyEditor/MyEditor';
import axios from 'axios';
import { format } from 'date-fns';
import React from 'react';
import { useCheckList } from '../../../store/store.js';
import Emoticon from './Emoticon/Emoticon.jsx';
import Search from './Search/Search.jsx';
import { host } from '../../../config/config.js'
import { useAuthStore, useNotification } from './../../../store/store';
import './Chat.css';
import { Slide, toast } from 'react-toastify';
import avatar from '../../../images/user.jpg'
import Invite from './Invite/Invite.jsx';
import sanitizeHtml from 'sanitize-html';
import 'react-toastify/dist/ReactToastify.css'
import notice from '../../../images/notice.png';
import Swal from 'sweetalert2';
import SweetAlert from '../../../function/SweetAlert.js';
axios.defaults.withCredentials = true;
const Chat = () => {
  const editorRef = useRef(null);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const divRef = useRef(null);
  const chatRef = useRef([]);
  const { loginID } = useAuthStore();
  const [chatCheck, setChatCheck] = useState([]);
  const { chats, setChats, ws, setChatNavi, chatAppRef, chatNavi, dragRef } = useContext(ChatsContext);
  let lastDate = null;
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');
  const { searchDisplay, setSearchDisplay, chatSeq, setChatSeq, setOnmessage, setWebSocketCheck, chatController, setChatController } = useCheckList();
  const [searchList, setSearchList] = useState([]);
  const [invite, setInvite] = useState(false);
  const [updateMember, setUpdateMember] = useState(false);
  const [checkInvite, setCheckInvite] = useState(false);


  useEffect(() => { //group_chat 속성 가저오기 나와의채팅인지 아닌지 
    const { chatSeq } = useCheckList.getState();
    if (chatSeq !== 0)
      axios.get(`${host}/group_chat/invite?group_seq=${chatSeq}`).then((resp) => {
        console.log(resp.data);
        if (resp.data === 'Y') {
          setCheckInvite(true)
        }
        else {
          setCheckInvite(false)
        }

      })
  }, [chatSeq])

  // WebSocket 연결을 설정하는 useEffect
  useEffect(() => {
    //const url = host.replace(/^https?:/, '')

    if (loginID != null && loginID !== 'error') {
      ws.current.onclose = () => {
        console.log('Disconnected from WebSocket');
        setWebSocketCheck();
      };

      ws.current.onerror = (error) => {
        console.log('WebSocket error observed:', error);
        setWebSocketCheck();
        // 오류 처리 로직을 추가할 수 있습니다.
      };

      ws.current.onmessage = (e) => {
        if (e.data === 'chatController') {
          console.log("delete");
          setChatController();
        }
        else if (e.data === "updateMember") {
          console.log(e.data);
          setUpdateMember((prev) => {
            return !prev;
          });
          setOnmessage();

        } else {
          let chat = JSON.parse(e.data);
          const { chatSeq } = useCheckList.getState();
          //메세지 온거에 맞게 group_seq 사용해서 멤버 list받기 이건 chatSeq 없이 채팅 꺼저있을떄를 위해서 해놈
          if (chatSeq === 0)
            axios.get(`${host}/group_member?group_seq=${chat.group_seq}`).then((resp) => {
              setOnmessage();
              if (chat.member_id !== loginID) {
                resp.data.forEach((temp) => { //알림보내기 로직
                  if (temp.member_id === loginID) {
                    if (temp.alarm === 'Y') notify(chat);
                  }
                })
              }
            })

          //////
          if (chat.group_seq === chatSeq) {
            setChats((prev) => {

              return [...prev, chat]
            })
            if ((chatSeq !== 0)) { //이것도 멤버 last_chat_seq 업데이트
              axios.patch(`${host}/group_member?group_seq=${chatSeq}&&last_chat_seq=${chat.seq}`).then((resp) => {
                setOnmessage();
                setUpdateMember((prev) => {
                  return !prev;
                });
              })
            }

          }
          console.log("메세지보냄");
        }
      }

    }
    return () => {
    };

  }, [chatNavi]);

  useEffect(() => {
    if (loginID != null && loginID !== 'error') {
      const { chatSeq } = useCheckList.getState();
      if (chatSeq !== 0) {
        axios.get(`${host}/chat?chatSeq=${chatSeq}`).then(resp => {//채팅목록 가저오기
          setChats(resp.data);
          console.log("채팅목록가저오기");
          if (resp.data.length > 0) //멤버 last_chat_seq 업데이트
            axios.patch(`${host}/group_member?group_seq=${chatSeq}&&last_chat_seq=${resp.data[resp.data.length - 1].seq}`).then((resp) => {
              ws.current.send("updateMember");
            })
        })
      }
    }
  }, [chatNavi, invite, chatController])


  const notify = useCallback((item) => {
    const { maxCount, count, increment, decrement } = useNotification.getState();
    const { chatSeq } = useCheckList.getState();
    console.log(`chatSeq= ${chatSeq} item.group_seq=${item.group_seq}`);
    if (chatSeq !== 0) {
      return false;
    }
    if (count < maxCount) {
      console.log("알림");
      toast.info(`${item.member_id}님한테 메세지가 왔습니다`, {
        position: "top-right", // 오른쪽 위에 표시
        autoClose: 5000, // 5초 후 자동으로 닫힘
        hideProgressBar: false, // 진행 바 숨기기: false로 설정하여 진행 바 표시
        closeOnClick: true, // 클릭 시 닫기
        pauseOnHover: false, // 마우스 오버 시 일시 정지
        draggable: true, // 드래그 가능
        rtl: false, // RTL 텍스트 지원 비활성화
        onClose: decrement,
        onOpen: increment,
        onClick: () => handleToastOnclick(item),
        icon: <img src={notice} alt="custom-icon" className={styles.shake} />
      });
    }
    //}

  }, [chatSeq])


  const handleToastOnclick = (item) => {

    setChatNavi((prev) => {

      if (chatAppRef.current != null)
        chatAppRef.current.style.display = "flex";

      if (dragRef.current)
        dragRef.current.style.display = "flex";
      console.log(`on click toast:${item.group_seq} `);
      setChatSeq(item.group_seq);
      return 'chat'
    });

  }


  const handleCancel = () => {
    setChatNavi((prev) => {
      setChatSeq(0);
      return "home";
    });
  }
  const handleInvite = () => {
    if (checkInvite)
      setInvite((prev) => {
        return !prev;
      })
    else {
      Swal.fire({
        icon: 'error',
        title: "나와의 채팅",
        text: '초대 기능이 제한됩니다.'
      })
    }
  }



  const handleSearch = (e) => {
    const Searchbar = searchRef.current;
    Searchbar.style.display = searchDisplay ? "flex" : "none";
    if (!searchDisplay) {
      setSearchList([]);
      setSearch('');
    }
    else {
      const container = dragRef.current;
      if (Searchbar && container) {
        const containerRect = container.getBoundingClientRect();
        const x = e.clientX - containerRect.left - 305;
        const y = e.clientY - containerRect.top + 20;
        Searchbar.style.top = `${y}px`;
        Searchbar.style.left = `${x}px`;
      }
    }
    setSearchDisplay(!searchDisplay);
  }


  const handleSearchData = useCallback((item) => {
    let result = '';
    if (!searchDisplay) {
      if (searchList.length > 0) {
        searchList.forEach((s_item) => {
          if (item.seq === s_item.seq) {
            const temp = item.message.replace(search, `<span style="background-color: red !important;">${search}</span>`);
            result = temp;

          }
        })
      }
    }
    return result;
  }, [searchList]);


  //다운로드 컨트롤
  const handleDownload = (split) => {
    const linkElement = document.createElement('a');
    // 2. 링크 속성 설정
    linkElement.href = `${host}/files/downloadChat?oriname=${split[0]}&sysname=${split[1]}`;
    linkElement.download = split[0];
    linkElement.click();
  }

  const safeHtml = (html) => {
    const sanitizedHtml = sanitizeHtml(html, {
      allowedTags: ['a', 'p', 'b', 'i', 'u'],
      allowedAttributes: {
        // 'a': ['href', 'download'],
      },
    });

    return sanitizedHtml;
  }

  const [list, setList] = useState();
  const handleChatsData = useCallback(() => {
    let count = 0;

    setList(
      chats.map((item, index) => {
        //---------------------------------------------// 날짜 로직 
        const formattedTimestamp = format(new Date(item.write_date), 'a hh:mm').replace('AM', '오전').replace('PM', '오후');
        const currentDate = format(new Date(item.write_date), 'yyyy-MM-dd');
        const isDateChanged = currentDate !== lastDate;
        if (isDateChanged) {
          lastDate = currentDate;
        }
        //---------------------------------------------// 검색후 로직 추가
        const temp = handleSearchData(item);
        let check = false;
        if (temp !== '') {
          check = true;
        }
        else {

        }

        //--------------------------------------------------// 내가쓴글인지 아닌지
        let idCheck = false;
        if (item.member_id === loginID) {
          idCheck = true;
        }

        //--------------------------------------------------//여기는 채팅 읽은표시
        const chatCheckCount = chatCheck.filter((temp) => {
          if ((temp.last_chat_seq < item.seq) && temp.member_id !== item.member_id) {
            //  console.log(temp.member_id);
            return true;
          }

          return false;
        }).length;

        //--------------------------------------------------// 여기가 파일쪽 로직 처리
        let fileCheck = false;
        let file = '';
        if (item.upload_seq !== 0) {
          const split = item.message.split(' ');
          fileCheck = true;
          if (split[2] === '2') {
            file = `<p style="color: blue; cursor: pointer;">${split[0]}</p>`;
          }
          else if (split[2] === '1') {
            file = `<p style="color: blue; cursor: pointer;"><img src=${host}/images/chat/${split[1]} alt=downloadImage"></img></p>`;
          }

        }
        //--------------------------------------------------// 여긴 시스템 로직 처리
        let systemCheck = false;
        if (item.member_id === 'system') {
          check = false;
          systemCheck = true;
        }

        //--------------------------------------------------//
        return (
          <React.Fragment key={index}>
            {isDateChanged && (
              <div className={styles.dateSeparator}>{currentDate}</div>
            )}
            {systemCheck && (
              <div className={styles.system}><p>{item.message}</p></div>
            )}
            {!systemCheck && (
              <div className={idCheck ? styles.div1Left : styles.div1} >
                {
                  !idCheck && (<div className={styles.avatar}><img src={avatar} alt="" /></div>)
                }
                <div>
                  <div className={idCheck ? styles.nameReverse : styles.name}>{item.member_id}</div>
                  <div className={idCheck ? styles.contentReverse : styles.content}>
                    <div dangerouslySetInnerHTML={{ __html: (check ? temp : (fileCheck ? file : item.message)) }}
                      ref={el => {
                        if (el && check) {
                          chatRef.current[count++] = el; //검색한것만 ref 추가
                        }
                      }} className={idCheck ? styles.mboxReverse : styles.mbox} onClick={fileCheck ? () => SweetAlert('warning', '채팅방', '다운로드를 진행하시겠습니까?', () => handleDownload(item.message.split(' '))) : undefined}></div>
                    <div style={{ display: "flex" }}>
                      {(chatCheckCount > 0) && (<div className={styles.check}>{chatCheckCount || ''}</div>)}
                      <div className={styles.date}>{formattedTimestamp}</div>
                    </div>
                  </div>
                </div>
              </div>)}
          </React.Fragment>
        );
      })
    );

  }, [chats, handleSearchData, chatCheck])

  useEffect(() => {
    chatRef.current = []; //이거떄문에 class remove전에 닫으면 오류나는데 이부분 고민할필요가있다 
    handleChatsData();
  }, [handleChatsData])

  const scrollBottom = useCallback(() => {
    if (chatRef.current.length > 0) {
      chatRef.current[chatRef.current.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    else if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }

  }, [list]);

  useEffect(() => { //스크롤 
    scrollBottom();
  }, [scrollBottom]);

  useEffect(() => {//group_seq에 맞는 member list 뽑기
    axios.get(`${host}/group_member?group_seq=${chatSeq}`).then((resp) => {
      setChatCheck(resp.data);
    })
  }, [invite, updateMember, chatNavi]);


  if (isLoading === true) {
    //return <Loading></Loading>;
  }
  else {
    return (
      <React.Fragment>
        <div className={styles.container} ref={containerRef}>
          <div className={styles.header}>
            <div className={styles.header1}>
              방제목
            </div>
            <div className={styles.header2}>
              <button onClick={handleInvite}>➕</button>
              <button onClick={handleSearch}>🔍 </button>
              <button onClick={handleCancel}>❌</button>
            </div>
          </div>
          <div className={styles.contents} ref={divRef}>
            {
              list
            }
          </div>
          <div className={styles.div2}>
            <MyEditor sidebarRef={sidebarRef} editorRef={editorRef}></MyEditor>
          </div>
        </div>
        <Search search={search} setSearch={setSearch} searchRef={searchRef} setSearchList={setSearchList} handleSearch={handleSearch} chatRef={chatRef} divRef={divRef}></Search>
        <Emoticon sidebarRef={sidebarRef} editorRef={editorRef} />
        {invite && (<Invite setInvite={setInvite} chatCheck={chatCheck}></Invite>)}
      </React.Fragment>
    );
  }

}
export default Chat;