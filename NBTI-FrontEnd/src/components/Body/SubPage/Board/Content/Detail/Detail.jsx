import { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { useBoardStore } from "../../../../../../store/store";
import axios from "axios";
import { host } from '../../../../../../config/config'
import image from "../../../../../../images/user.jpg";
import { format } from 'date-fns';





export const Detail = () => {

    const { boardSeq, boardType } = useBoardStore();
    const [detail, setDetail] = useState([]);


    useEffect(() => {
        // 외부 스타일시트를 동적으로 추가
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        document.head.appendChild(link);

        // 컴포넌트가 언마운트될 때 스타일시트를 제거
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    useEffect(() => {
        let code = 0;
        if (boardType === "자유") {
            code = 1;
        } else if (boardType === "공지") {
            code = 2;
        }

        axios.get(`http://${host}/board/${boardSeq}/${code}`).then((resp) => {
            setDetail(resp.data);
        })
    }, []);

    const date = new Date(detail.write_date);
    const currentDate = !isNaN(date) ? format(date, 'yyyy-MM-dd HH:mm') : 'Invalid Date';

    return (


        <div className={styles.container}>
            {/* <div>{detail.title}</div> */}
            <div className={styles.top}>
                <div className={styles.left}>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div className={styles.right}>
                    <p>수정</p>
                    <p>삭제</p>
                </div>
            </div>
            <div className={styles.title}>
                <div className={styles.image}>
                    <img src={image} alt="" />
                </div>
                <div className={styles.titleWriter}>
                    <div className={styles.innerTitle}>
                        <p>{detail.title}</p>
                    </div>
                    <div className={styles.innerWriter}>
                        <p>{detail.member_id}</p>
                    </div>
                </div>
                <div className={styles.writeDate}>
                    <span>{currentDate}</span>
                </div>
            </div>
            <div className={styles.content}>
                <span>{detail.contents}</span>
            </div>


            <div className={styles.reply}>
                <div className={styles.replyCount}>
                    <span>0</span>
                    <span>개의 댓글</span>
                </div>
                <div className={styles.replyBox}>
                    <img src={image} alt="" />
                    <textarea></textarea>
                    <button>등록</button>
                </div>
            </div>

        </div>
    )
}