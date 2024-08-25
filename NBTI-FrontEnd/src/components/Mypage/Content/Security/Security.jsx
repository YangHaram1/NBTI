import { useEffect, useState } from 'react';
import styles from './Security.module.css';
import axios from 'axios';
import { host } from '../../../../config/config';
import { useAuthStore } from '../../../../store/store';
import { useNavigate } from 'react-router';
import { format, parseISO } from 'date-fns';
import Swal from 'sweetalert2';
// import axios from 'axios';


export const Security = () => {

    const [showChangePwBox, setShowChangePwBox] = useState(false);
    const [pw, SetPw] = useState('');
    const [showNewPwBox, setShowNewPwBox] = useState(false);
    const [checkResult, setCheckResult] = useState(true);
    const [newPw, setNewPw] = useState('');
    const [confirmNewPw, setConfirmNewPw] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const {setLoginID} = useAuthStore();
    const navi = useNavigate();

    const [pwDate, setPwDate] = useState('');

    useEffect(()=>{
        axios.get(`${host}/members/getPwChangeDate`)
        .then((resp)=>{
            // console.log("변경날짜",resp.data);
            setPwDate(resp.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handlePwChange = () => {
        setShowChangePwBox(!showChangePwBox);
        setShowNewPwBox(false);
    }

    const handlePw=(e)=>{
        // console.log(e.target.value);
        SetPw(e.target.value);
    }
 
    const handlePwRight = () => {
        axios.post(`${host}/members/checkPw`, {pw:pw})
        .then((resp) =>{
            console.log(resp);
            if(resp.data){
                setShowNewPwBox(true);
                setShowChangePwBox(false);
            }else{
                Swal.fire({
                    icon:'warning',
                    title:'비밀번호가 옳바르지 않습니다.',
                    showConfirmButton: false,
                    timer: 1500
            })
            }
        })
    }

    const handleChangeNewPw = () => {
        // 비밀번호 유효성 검사
        if (!isPasswordValid) {
            Swal.fire({
                icon:'warning',
                title:'비밀번호는 영어 대소문자, 숫자, 특수문자 중 3종류 이상을 조합하여 최소 8자리로 설정해주세요.',
                showConfirmButton: false,
                timer: 1500
        })
            return;
        }

        axios.post(`${host}/members/changePw`, { pw: newPw })
            .then((resp) => {
                if (resp.data) {
                    Swal.fire({
                        icon:'warning',
                        title:'새로운 비밀번호로 다시 로그인 해주세요',
                        showConfirmButton: false,
                        timer: 1500
                })
                    axios.delete(`${host}/auth`)
                        .then(() => {
                            sessionStorage.removeItem("loginID");
                            setLoginID(null);
                            navi("/");
                        })
                        .catch((err) => {
                            console.log(err);
                            alert("로그아웃 오류");
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                alert("비밀번호 변경 오류");
            });
    }

    const handleNewPw = (e) => {
        const value = e.target.value;
        setNewPw(value);
        validatePassword(value, confirmNewPw);
    }

    const handleConfirmNewPw = (e) => {
        const value = e.target.value;
        setConfirmNewPw(value);
        validatePassword(newPw, value);
    }

    const validatePassword = (newPassword, confirmPassword) => {
        const isPasswordMatch = newPassword === confirmPassword;
        setCheckResult(isPasswordMatch);

        // 비밀번호 유효성 검사
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        setIsPasswordValid(passwordRegex.test(newPassword));
    }

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                보안 설정
            </div>
            <div className={styles.pw_box}>
                <div className={styles.pw_title}>
                    비밀번호 변경하기
                </div>
                <div className={styles.pw_last_change}>
                    <div className={styles.pw_last_title}>마지막 변경</div>
                    <div className={styles.pw_last_date}>
                        {
                            pwDate ? format(parseISO(pwDate), 'yyyy-MM-dd HH:mm') : '정보 없음'
                        }
                    </div>
                </div>
                <div className={styles.pw_btn}>
                    <button onClick={handlePwChange}> 
                        {showChangePwBox||showNewPwBox ? '변경 취소' : '변경 하기'}
                    </button>
                </div>
            </div>
            <div className={`${styles.change_pw_box} ${showChangePwBox ? styles.show : ''}`}>
                <div className={styles.pw_check} >
                    <div className={styles.pw_check_title}>비밀번호 재확인</div>
                    <div className={styles.pw_check_content}>계정 정보 보호를 위해 비밀번호를 다시 입력해주세요.</div>
                    <div className={styles.input}>
                        <input type='password' placeholder='비밀번호를 입력해주세요' onChange={handlePw}></input>
                        <button onClick={handlePwRight}>확인</button>
                    </div>
                </div>
            </div>
            <div className={`${styles.new_pw_box} ${showNewPwBox ? styles.show : ''}`}>
                    <div className={styles.new_pw_title}>새로운 비밀번호를 입력해주세요</div>
                    <div className={styles.new_pw_content1}>비밀번호는 영어 대소문자, 숫자, 특수문자 중 3종류 이상을 조합하여 최소 8자리</div>
                    <div className={styles.new_pw_content2}>이상의 길이로 구성해주세요</div>
                    <div className={styles.input}>
                        <input type='password' placeholder='새로운 비밀번호를 입력해주세요' onChange={handleNewPw} value={newPw}></input><br></br>
                    </div>
                    <div className={styles.input}>
                        <input type='password' placeholder='비밀번호를 입력해주세요' onChange={handleConfirmNewPw} value={confirmNewPw}></input><br></br>
                    </div>
                    <div className={styles.result}>
                    {!checkResult && (
                            <div className={styles.result}>
                                비밀번호가 동일하지 않습니다.
                            </div>
                        )}
                        {!isPasswordValid && (
                        <div className={styles.result}>
                            비밀번호는 영문자, 숫자, 특수문자 중 3종류 이상을 조합하여 최소 8자리로 설정해주세요.
                        </div>
                    )}
                        </div> 
                    <div className={`${styles.input} ${styles.change_btn}`}>
                        <button onClick={handleChangeNewPw} disabled={!checkResult || !isPasswordValid}> 변경 </button>
                        <div className={styles.empty_box}></div>
                    </div>
                </div>
        </div>
    );

}