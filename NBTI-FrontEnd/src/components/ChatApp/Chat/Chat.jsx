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
import { useAuthStore } from './../../../store/store';
import './Chat.css';
import { Slide, toast } from 'react-toastify';
import avatar from '../../../images/user.jpg'
import Invite from './Invite/Invite.jsx';

import 'react-toastify/dist/ReactToastify.css'
axios.defaults.withCredentials = true;
const Chat = () => {

  //navi('',{state:resp.data});
  const editorRef = useRef(null);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const divRef = useRef(null);
  const chatRef = useRef([]);
  const { loginID } = useAuthStore();


  const { chats, setChats, ws, setChatNavi, chatSeq, chatNavi } = useContext(ChatsContext);
  let lastDate = null;
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');
  const { searchDisplay, setSearchDisplay } = useCheckList();
  const [searchList, setSearchList] = useState([]);
  const [invite, setInvite] = useState(false);



  const handleChats = useCallback(() => {
    if (!searchDisplay) {
      updateSidebarPosition();
      updateSearchPosition();
    }
  }, [searchDisplay])

  useEffect(() => {
    handleChats();
  }, [searchDisplay])

  // WebSocket 연결을 설정하는 useEffect
  useEffect(() => {
    const url = host.replace(/^https?:/, '')
    // ws.current = new WebSocket(`${url}/chatWebsocket`);

    //  ws.current.onopen = () => {

    // }
    if (loginID != null) {
      axios.get(`${host}/chat?chatSeq=${chatSeq}`).then(resp => {

        setChats(resp.data);
        console.log("채팅목록가저오기");
      })
      updateSidebarPosition();
      updateSearchPosition();
      ws.current.onclose = () => {
        console.log('Disconnected from WebSocket');
      };

      ws.current.onerror = (error) => {
        console.log('WebSocket error observed:', error);
        // 오류 처리 로직을 추가할 수 있습니다.
      };

      ws.current.onmessage = (e) => {
        // alert("메세지옴");
        let chat = JSON.parse(e.data);
        if (chat.member_id !== loginID) {
          notify(chat);
        }
        if (chat.group_seq === chatSeq) {
          setChats((prev) => {

            return [...prev, chat]
          })
        }
        console.log("메세지보냄");
        /*toast("알림", {
          position: "top-left", // 위치 설정
          autoClose: 5000,       // 자동 닫힘 시간 (5초)
          hideProgressBar: true, // 진행 바 숨기기
        });*/



        /*
        // 알림 생성
        const notificationTitle = "새 메시지";
        const notificationOptions = {
          body: chat,
          icon: { avatar } // 알림 아이콘의 경로
        };

        if (Notification.permission === "granted") {
          new Notification(notificationTitle, notificationOptions);
        }
        ///*/
      }
    }


    window.addEventListener('resize', updateSidebarPosition);
    console.log("셋팅");;

    return () => {
      window.removeEventListener('resize', updateSidebarPosition);
    };

  }, []);


  const notify = (item) => {
    console.log("알림");
    toast.info(`${item.member_id}님한테 메세지가 왔습니다`, {
      position: "top-right", // 오른쪽 위에 표시
      autoClose: 5000, // 5초 후 자동으로 닫힘
      hideProgressBar: false, // 진행 바 숨기기: false로 설정하여 진행 바 표시
      closeOnClick: true, // 클릭 시 닫기
      pauseOnHover: false, // 마우스 오버 시 일시 정지
      draggable: true, // 드래그 가능
      rtl: false // RTL 텍스트 지원 비활성화
    });
  };

  const handleCancel = () => {
    setChatNavi("home");
  }
  const handleInvite = () => {
    setInvite((prev) => {
      return !prev;
    })
  }



  const handleSearch = () => {
    const Searchbar = searchRef.current;
    Searchbar.style.display = searchDisplay ? "flex" : "none";
    if (!searchDisplay) {
      setSearchList([]);
      setSearch('');
    }
    setSearchDisplay(!searchDisplay);

  }

  const updateSidebarPosition = () => {
    const sidebar = sidebarRef.current;
    const container = containerRef.current;
    if (sidebar && container) {
      const containerRect = container.getBoundingClientRect();
      sidebar.style.left = (containerRect.left - 325) + 'px';
    }
  };

  const updateSearchPosition = () => {
    const Searchbar = searchRef.current;
    const container = containerRef.current;
    if (Searchbar && container) {
      const containerRect = container.getBoundingClientRect();
      Searchbar.style.top = (containerRect.top + 30) + 'px';
      Searchbar.style.left = (containerRect.left) + 'px';
    }
  };

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


  const [list, setList] = useState();

  const handleChatsData = useCallback(() => {
    let count = 0;
    setList(
      chats.map((item, index) => {
        const formattedTimestamp = format(new Date(item.write_date), 'a hh:mm').replace('AM', '오전').replace('PM', '오후');
        const currentDate = format(new Date(item.write_date), 'yyyy-MM-dd');
        const isDateChanged = currentDate !== lastDate;
        if (isDateChanged) {
          lastDate = currentDate;
        }
        //---------------------------------------------//
        const temp = handleSearchData(item);
        let check = false;
        if (temp !== '') {
          check = true;
        }

        //--------------------------------------------------//
        let idCheck = false;
        if (item.member_id === loginID) {
          idCheck = true;
        }

        //--------------------------------------------------//
        return (
          <React.Fragment key={index}>
            {isDateChanged && (
              <div className={styles.dateSeparator}>{currentDate}</div>
            )}
            <div className={idCheck ? styles.div1Left : styles.div1} >
              {
                !idCheck && (<div className={styles.avatar}><img src={avatar} alt="" /></div>)
              }
              <div>
                <div className={idCheck ? styles.nameReverse : styles.name}>{item.member_id}</div>
                <div className={idCheck ? styles.contentReverse : styles.content}>
                  <div dangerouslySetInnerHTML={{ __html: (check ? temp : item.message) }}
                    ref={el => {
                      if (el && check) {
                        chatRef.current[count++] = el;
                      }
                    }} className={styles.mbox}></div>
                  <div className={styles.date}>{formattedTimestamp}</div>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })
    );

  }, [chats, handleSearchData])

  useEffect(() => {
    chatRef.current = [];
    handleChatsData();
  }, [handleChatsData])

  const scrollBottom = useCallback(() => {
    if (chatRef.current.length !== 0) {
      chatRef.current[chatRef.current.length - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    else if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }

  }, [list])
  useEffect(() => {
    scrollBottom();
  }, [scrollBottom])





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
        {invite && (<Invite setInvite={setInvite}></Invite>)}
      </React.Fragment>
    );
  }

}
export default Chat;