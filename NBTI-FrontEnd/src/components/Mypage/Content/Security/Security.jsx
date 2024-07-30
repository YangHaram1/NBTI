import { useState } from 'react';
import styles from './Security.module.css';
import axios from 'axios';
import { host } from '../../../../config/config';
import { useAuthStore } from '../../../../store/store';
import { useNavigate } from 'react-router';
import { assertLiteral } from '@babel/types';
// import axios from 'axios';


export const Security = () => {

    const [showChangePwBox, setShowChangePwBox] = useState(false);
    const [pw, SetPw] = useState('');
    const [showNewPwBox, setShowNewPwBox] = useState(false);
    const [checkPw, setCheckPw] = useState('');
    const [checkResult, setCheckResult] = useState(true);
    const {setLoginID} = useAuthStore();
    const navi = useNavigate();

    const handlePwChange = () => {
        setShowChangePwBox(!showChangePwBox);
        setShowNewPwBox(false);
    }

    const handlePwCheck =(e)=>{
        console.log(e.target.value);
        setCheckPw(e.target.value);
    }

    const handlePwCheckResult =(e)=>{
        console.log(e.target.value);
        const checkValue = e.target.value;
        setCheckResult( checkPw === checkValue );
    }

    const handlePw=(e)=>{
        console.log(e.target.value);
        SetPw(e.target.value);
    }

    // 비밀번호 확인하는 코드 짜야함.  
    const handlePwRight = () => {
        axios.post(`http://${host}/members/checkPw`, {pw:pw})
        .then((resp) =>{
            console.log(resp);
            if(resp.data){
                setShowNewPwBox(true);
                setShowChangePwBox(false);
            }else{
                alert("비밀번호가 옳바르지 않습니다.");
            }
        })
        console.log(showNewPwBox);
        console.log(checkPw);
    }

    // 비밀번호 변경
    const handleChangeNewPw = ()=>{
        axios.post(`http://${host}/members/changePw`, {pw:checkPw})
        .then((resp)=>{
            // 비밀번호 변경 후 로그아웃
            alert("새로운 비밀번호 다시 로그인 해주세요");
            if(resp.data){
                axios.delete(`http://${host}/auth`)
                .then((resp)=>{
                    sessionStorage.removeItem("loginID");
                    setLoginID(null);
                    navi("/");
                })
                .catch((err)=>{
                    console.log(err);
                    alert("로그아웃 오류");
                })
            }
        })
        .catch((err)=>{
            console.log(err);
            alert("비밀번호 변경 오류");
        })
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
                    <div className={styles.pw_last_date}>2024-07-28</div>
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
                    <div className={styles.new_pw_content2}>이상의 길이로 구성해주세요 (유효성 검사 아직x)</div>
                    <div className={styles.input}>
                        <input type='text' placeholder='새로운 비밀번호를 입력해주세요' onChange={handlePwCheck}></input><br></br>
                    </div>
                    <div className={styles.input}>
                        <input type='text' placeholder='비밀번호를 입력해주세요' onChange={handlePwCheckResult}></input><br></br>
                    </div>
                    <div className={styles.result}>
                    {!checkResult && (
                            <div className={styles.result}>
                                비밀번호가 동일하지 않습니다.
                            </div>
                        )}
                        </div> 
                    <div className={`${styles.input} ${styles.change_btn}`}>
                        <button onClick={handleChangeNewPw}> 변경 </button>
                        <div className={styles.empty_box}></div>
                    </div>
                </div>
        </div>
    );

}