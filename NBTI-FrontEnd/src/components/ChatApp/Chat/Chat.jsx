import { useContext, useRef, useEffect, useCallback, useState } from 'react';
import { ChatsContext } from '../../../Context/ChatsContext.js';
import styles from './Chat.module.css';
import MyEditor from './../MyEditor/MyEditor';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
//import { last } from 'lodash';
import React from 'react';
import { useCheckList } from '../../../store/store.js';
import Emoticon from './Emoticon/Emoticon.jsx';
import Search from './Search/Search.jsx';
import { host } from '../../../config/config.js'
axios.defaults.withCredentials = true;
const Chat = () => {

  //navi('',{state:resp.data});
  const editorRef = useRef(null);
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);
  const searchRef = useRef(null);
  const divRef = useRef(null);
  //const chatRef = useRef([]);

  const navi = useNavigate();
  const { chats, setChats, ws } = useContext(ChatsContext);
  let lastDate = null;
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');
  const { searchDisplay, setSearchDisplay } = useCheckList();
  const [serchList, setSearchList] = useState([]);

  const scrollToBottom = useCallback(() => {
    setIsLoading(false);
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chats])

  useEffect(() => {

    scrollToBottom();
  }, [scrollToBottom])

  // WebSocket 연결을 설정하는 useEffect
  useEffect(() => {
    ws.current = new WebSocket(`ws://${host}/chatWebsocket`);

    ws.current.onopen = () => {

      console.log('Connected to WebSocket');
    }
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
      setChats((prev) => {
        // console.log([...prev,chat]);
        return [...prev, chat]
      })

    }


    // Update position on window resize
    window.addEventListener('resize', updateSidebarPosition);
    console.log("셋팅");;
    // Clean up event listener on component unmount

    return () => {
      ws.current.close();
      window.removeEventListener('resize', updateSidebarPosition);
    };

  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  const handleChats = useCallback(() => {
    // Initial positioning
    if (searchDisplay) {
      axios.get(`http://${host}/chat`).then(response => {
        setChats(response.data);
        console.log("채팅기록가저오기");
      })
    }
    else {

      updateSidebarPosition();
      updateSearchPosition();
    }
  }, [searchDisplay])

  useEffect(() => {
    handleChats();
  }, [searchDisplay])


  const handleCancel = () => {
    navi("/");
  }
  const handleSearch = () => {
    const Searchbar = searchRef.current;
    Searchbar.style.display = searchDisplay ? "flex" : "none";
    setSearchDisplay(!searchDisplay);
    setSearch('');
    setSearchList([]);
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
      if (serchList.length > 0) {
        console.log("검색실행");
        serchList.forEach((s_item) => {
          if (item.seq === s_item.seq) {
            const temp = item.message.replace(search, `<span style="background-color: red !important;">${search}</span>`);
            result = temp;
          }
        })
      }
    }
    return result;
  }, [])


  const [list, setList] = useState();

  const handleChatsData = useCallback(() => {
    setList(
      chats.map((item, index) => {
        console.log("리랜더링");
        const formattedTimestamp = format(new Date(item.write_date), 'a hh:mm').replace('AM', '오전').replace('PM', '오후');
        const currentDate = format(new Date(item.write_date), 'yyyy-MM-dd');
        const isDateChanged = currentDate !== lastDate;
        if (isDateChanged) {
          lastDate = currentDate;
        }
        //---------------------------------------------//
        const temp = handleSearchData(item);
        if (temp !== '') {
          item.message = temp;
        }
        //--------------------------------------------------//
        return (
          <React.Fragment key={index}>
            {isDateChanged && (
              <div className={styles.dateSeparator}>{currentDate}</div>
            )}
            <div className={styles.div1} >
              <div>{item.member_id}</div>
              <div className={styles.content}>
                <div dangerouslySetInnerHTML={{ __html: item.message + '&nbsp' }} className={styles.mbox}></div>
                <div className={styles.date}>{formattedTimestamp}</div>
              </div>
            </div>
          </React.Fragment>
        );
      })
    );

  }, [])

  useEffect(()=>{
    handleChatsData();
  },[handleChatsData])









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


        <Search search={search} setSearch={setSearch} searchRef={searchRef} setSearchList={setSearchList} handleSearch={handleSearch}></Search>
        <Emoticon sidebarRef={sidebarRef} editorRef={editorRef} />
      </React.Fragment>
    );
  }

}
export default Chat;