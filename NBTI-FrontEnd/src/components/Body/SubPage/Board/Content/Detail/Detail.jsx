import { useEffect, useRef, useState } from "react";
import styles from "./Detail.module.css";
import { useBoardStore } from "../../../../../../store/store";
import axios from "axios";
import { host, api } from '../../../../../../config/config'
import image from "../../../../../../images/user.jpg";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import { Editor } from '@tinymce/tinymce-react';


export const Detail = () => {

    const { boardSeq, boardType } = useBoardStore();
    const [detail, setDetail] = useState({});

    const navi = useNavigate();

    // 게시글 날짜 타입 변경
    const date = new Date(detail.write_date);
    const currentDate = !isNaN(date) ? format(date, 'yyyy-MM-dd HH:mm') : 'Invalid Date';

    useEffect(() => {
        let code = 1;
        if (boardType === "자유") code = 1;
        else if (boardType === "공지") code = 2;

        if (boardSeq === -1) {
            navi('/board');
        }

        if (boardSeq !== -1) {
            axios.get(`http://${host}/board/${boardSeq}/${code}`).then((resp) => {
                setDetail(resp.data);
            })
        }


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

    // 해당 게시글로 이동



    /** ================[ 삭 제 ]============= */
    const handleDelBtn = () => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            if (boardSeq !== -1) {
                axios.delete(`http://${host}/board/${detail.seq}`).then(resp => {
                    navi('/board/free');
                })
            }

        }
    }


    /** ================[ 수 정 ]============= */
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(detail.title);
    const [content, setContent] = useState(detail.contents);
    const [data, setData] = useState({ title: detail.title, content: detail.contents });

    // 에디터 내용 변경 핸들러
    const handleEditorChange = (content) => {
        setContent(content);
        setData((prevData) => ({ ...prevData, content })); // content 상태 업데이트와 동시에 data 상태 업데이트
    };

    // 수정 click 
    const handleEditBtn = () => {
        setIsEditing(true);
    };



    // detail 변경될 때 상태 초기화
    useEffect(() => {
        setTitle(detail.title);
        setContent(detail.contents);
    }, [detail]);


    // 저장 click
    const handleSaveBtn = () => {


        axios.post(`http://${host}/board`, data).then((resp) => {

            console.log("data2222: " + resp.data);


            setTitle(data.title);
            setContent(data.content);
            // setData(updatedData); // 상태를 업데이트된 데이터로 설정

            setIsEditing(false);
        })
    };



    // 취소 click 
    const handleCancelBtn = () => {
        setIsEditing(false);
        setTitle(detail.title);
        setContent(detail.contents);
    };


    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.left}>
                    <i class="fa-regular fa-star"></i>
                </div>
                <div className={styles.right}>
                    {!isEditing ? (
                        <>
                            <p onClick={handleEditBtn}>수정</p>
                            <p onClick={handleDelBtn}>삭제</p>
                        </>
                    ) : null}

                </div>
                {isEditing && (
                    <div className={styles.editButtons}>
                        <p onClick={handleSaveBtn}>저장</p>
                        <p onClick={handleCancelBtn}>취소</p>
                    </div>
                )}
            </div>
            <div className={styles.title}>
                <div className={styles.image}>
                    <img src={image} alt="" />
                </div>
                <div className={styles.titleWriter}>
                    <div className={styles.innerTitle}>
                        {isEditing ? (
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="제목을 입력하세요."
                                className={styles.editTitle}
                            />
                        ) : (
                            <p>{detail.title}</p>
                        )}
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
                {isEditing ? (
                    <Editor
                        initialValue={content}
                        apiKey={api}
                        init={{
                            height: 400,
                            menubar: true,
                            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                            toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        onEditorChange={handleEditorChange} // 에디터 내용 변경 시 호출
                    />
                ) : (
                    <span>{detail.contents}</span>
                )}
            </div>

            {/* --------------[ 댓글 작성 ]------------ */}
            <div className={styles.reply}>
                <div className={styles.count}>
                    <span>0</span>
                    <span>개의 댓글</span>
                </div>
                <div className={styles.replyInput}>
                    <img src={image} alt="" />
                    <textarea></textarea>
                    <button>등록</button>
                </div>

                {/* --------------[ 댓글 출력 ]------------ */}
                <div className={styles.replyOutputWrap}>
                    <div className={styles.replyOutput}>
                        <img src={image} alt="" />
                        <div>
                            <div className={styles.writer_writeDate}>
                                <span>롱초</span>
                                <span>2024-07-29 11:32</span>
                            </div>
                            <span>댓글 내용 어쩌구</span>
                        </div>
                        <div className={styles.likes}>
                            <i class="fa-regular fa-heart fa-lg" />
                            <p>5</p>
                        </div>
                        <button>X</button>
                    </div>
                </div>
            </div>
        </div>
    )
}