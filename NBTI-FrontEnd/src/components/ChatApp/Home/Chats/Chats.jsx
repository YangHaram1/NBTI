import styles from './Chats.module.css';
import { useAuthStore } from '../../../../store/store';
import { ChatsContext } from './../../../../Context/ChatsContext';
import axios from 'axios';
import React, { useContext, useEffect, useState, useRef, useCallback } from 'react';
import { host } from './../../../../config/config';
import avatar from '../../../../images/user.jpg';
import ChatsModal from './ChatsModal/ChatsModal';
import { useCheckList } from './../../../../store/store';
import { format } from 'date-fns';
const Chats = () => {
    const { loginID } = useAuthStore();
    const { setChatSeq, onMessage } = useCheckList();
    const { setChatNavi } = useContext(ChatsContext);
    const [group_chats, setGroup_chats] = useState([]);

    const [modalDisplay, setModalDisplay] = useState(null);
    const modalRef = useRef([]);
    const [countBookmark, setCountBookmark] = useState(-1);
    useEffect(() => {
        axios.get(`${host}/group_chat`).then((resp) => {
            if (resp != null) {
                if (resp.data !== '') {
                    console.log(resp.data);
                    let count = -1;
                    (resp.data).forEach((temp) => {
                        if (temp.bookmark === 'Y') count++;
                    })
                    setCountBookmark(count);
                    setGroup_chats(resp.data);
                }
                else {
                    setGroup_chats([]);
                }
            }
        })
    }, [onMessage])

    const handleRightClick = (index) => (e) => {
        const { clientX: x, clientY: y } = e;
       // console.log(`${x}:${y}`);
        e.preventDefault();
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            modalRef.current[index].style.display = 'flex';
            modalRef.current[index].style.top = (y) + 'px';
            modalRef.current[index].style.left = (x) + 'px';
            return modalRef.current[index];
        });
    };

    const handleClick = () => {
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            return null;
        })
    }

    const handleDoubleClick = (seq) => () => {
        if (loginID === null) {
            setChatNavi('');
        }
        else {

            setChatNavi((prev) => {
                setChatSeq(seq);
                return 'chat';
            });
        }
    }

    const handleSort = useCallback(() => {
        const sortedItems = (group_chats).sort((a, b) => {
            // 북마크가 'Y'인 항목을 먼저 오게 하려면
            if (a.bookmark === 'Y' && b.bookmark === 'N') {
                return -1; // a를 위로 이동
            }
            if (a.bookmark === 'N' && b.bookmark === 'Y') {
                return 1; // b를 위로 이동
            }
            // 북마크가 동일한 경우, seq 값에 따라 정렬
            // 둘 다 북마크가 'Y'거나 둘 다 'N'인 경우
            if (a.bookmark === b.bookmark) {
                if (a.dto === null && b.dto === null) {
                    return 0; // 둘 다 null인 경우 순서를 변경하지 않음
                }
                if (a.dto === null) {
                    return 1; // a.dto가 null이면 a를 뒤로 보냄
                }
                if (b.dto === null) {
                    return -1; // b.dto가 null이면 b를 뒤로 보냄
                }
                // 둘 다 dto가 존재하면, seq 값으로 정렬
                return b.dto.seq - a.dto.seq;
            }
            return false;
        });
        // setCount(countBookmark);
        return sortedItems;
    }, [group_chats])

    return (
        <div className={styles.container} onClick={handleClick}>
            {
                handleSort().map((item, index) => {
                    let formattedTimestamp = '';
                    if (item.dto != null) {
                        formattedTimestamp = format(new Date(item.dto.write_date), 'yyyy-MM-dd');
                    }
                    return (
                        <React.Fragment key={index}>
                            <div className={styles.room} onContextMenu={handleRightClick(index)} onDoubleClick={handleDoubleClick(item.seq)}>
                                <div>
                                    <img src={avatar} alt='' className={styles.avatar}></img>
                                </div>
                                <div className={styles.message}>
                                    <div className={styles.name}>
                                        <div>
                                            {item.name}
                                        </div>
                                        <div className={styles.bookmark}>
                                            {item.bookmark === 'Y' ? <i className="fa-solid fa-bookmark"></i> : false}
                                        </div>
                                        <div className={styles.size}>
                                            {item.size}
                                        </div>

                                    </div>
                                    <div className={styles.content} dangerouslySetInnerHTML={{ __html: (item.dto != null) ? item.dto.message : '메세지가 없습니다' }}>

                                    </div>
                                </div>
                                <div>
                                    <div className={styles.write_date}>
                                        {formattedTimestamp}
                                    </div>
                                    <div className={styles.alarm}>
                                        {item.alarm === 'Y' ? (<i className="fa-solid fa-bell"></i>) : (<i className="fa-solid fa-bell-slash"></i>)}
                                    </div>
                                </div>

                            </div>
                            {index === countBookmark && (<div className={styles.line}></div>)}
                            <ChatsModal modalRef={modalRef} index={index} item={item} setGroup_chats={setGroup_chats} setCountBookmark={setCountBookmark}></ChatsModal>
                        </React.Fragment>
                    );
                })
            }

        </div>
    )

}
export default Chats;