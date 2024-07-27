import styles from './Modal.module.css';

const Modal=({modalRef,index})=>{

    const handleChatRoom=()=>{
        console.log("채팅하기")
    }
    const handleMemberIfo=()=>{
        console.log("사용자 정보")
    }

    return(
        <div className={styles.container} ref={el=>modalRef.current[index]=el}>
            <div className={styles.content} onClick={handleChatRoom}>
                채팅 하기 {index}
            </div>
            <div className={styles.content} onClick={handleMemberIfo}>
                사용자 정보
            </div>
           
        </div>


    );
}
export default Modal;