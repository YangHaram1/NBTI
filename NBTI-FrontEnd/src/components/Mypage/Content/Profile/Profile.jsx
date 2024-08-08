import { useEffect, useRef, useState } from 'react';
import styles from './Profile.module.css';
import { host } from '../../../../config/config';
import axios from 'axios';
import { format } from 'date-fns';
// import { useNavigate } from 'react-router';
// import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';


export const Profile = () =>{

    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [myData, SetMyData] = useState({
        id:'',
        name:'', 
        email:'', 
        enter_date:null, 
        team_code:'', 
        job_code:'', 
        member_call:'', 
        address:'',
        birth:''
    });
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleEmail =(e)=>{
        console.log(e.target.innerText);
        setEmail(e.target.innerText);
    };

    const handlePhone =(e)=>{
        setPhone(e.target.innerText);
    };

    const handleAddress =(e)=>{
        setAddress(e.target.innerText);
    };

    const handleUpdate = ()=>{

        const updatedData = {
            email: email,
            member_call: phone,
            address: address
        };

        // console.log(email, phone, address);

        axios.put(`${host}/members`, updatedData)
        .then(()=>{
            console.log("업데이트 성공");
        })
    }

    const handleCancle = ()=>{
        window.location.reload();
    }
    

    useEffect(()=>{
        axios.get(`${host}/files/mypageUpdate`)
        .then((resp)=>{
            console.log(resp);
            SetMyData(resp.data);
            setAddress(resp.data.address);
            setEmail(resp.data.email);
            setPhone(resp.data.member_call);
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleChangeClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreviewImage(imageUrl);
        }
    };

    return(
        <div className={styles.container}> 
            <div className={styles.title}>
             프로필 설정 
            </div>
            <div className={styles.content}>
               <div className={`${styles.photo_box} ${styles.box}`}>
                    <div className={`${styles.name} ${styles.photo_name}`}>사진</div>
                    <div className={`${styles.value} ${styles.photo_value_box}`}>
                    <div className={styles.photo}>
                            {previewImage ? (
                                <img src={previewImage} alt="미리 보기" className={styles.preview} />
                            ) : (
                                '사진 영역'
                            )}
                        </div>
                        <div className={styles.change}>
                            <button className={styles.change_btn} onClick={handleChangeClick}>변경하기</button>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
               </div>
               <div className={`${styles.name_box} ${styles.box}`}>
                    <div className={styles.name}>이름</div>
                    <div className={styles.value}>{myData.name}</div>
               </div>
               <div className={`${styles.dept_box} ${styles.box}`}>
                    <div className={styles.name}>부서</div>
                    <div className={styles.value}>{myData.team_code}</div>
               </div>
               <div className={`${styles.job_code_box} ${styles.box}`}>
                    <div className={styles.name}>직위</div>
                    <div className={styles.value}>{myData.job_code}</div>
                </div>
               <div className={`${styles.birth_box} ${styles.box}`}>
                    <div className={styles.name}>생일</div>
                    <div className={styles.value}>{myData.birth}</div>
               </div>
               <div className={`${styles.email} ${styles.box}`}>
                    <div className={styles.name} >이메일</div>
                    <div className={styles.value} contentEditable='true' onInput={handleEmail} suppressContentEditableWarning='true'>{myData.email}</div>
                </div>
               <div className={`${styles.address_box} ${styles.box}`}>
                    <div className={styles.name}>주소</div>
                    <div className={styles.value} contentEditable='true'onInput={handleAddress} suppressContentEditableWarning='true'>{myData.address}</div>
                </div>
               <div className={`${styles.call_box} ${styles.box}`}>
                    <div className={styles.name}>핸드폰 번호</div>
                    <div className={styles.value} contentEditable='true' onInput={handlePhone} suppressContentEditableWarning='true'>{myData.member_call}</div>
                </div>
                <div className={`${styles.ent_date} ${styles.box}`}>
                    <div className={styles.name}>입사일</div>
                    <div className={styles.value}>
                        {
                            format(new Date(myData.enter_date),'yyyy-MM-dd')
                        }
                    </div>
                </div>
            </div>
            <div className={styles.btns}>
                <button className={styles.save_btn} onClick={handleUpdate}>저장</button>
                <div className={styles.empty_box}></div>
                <button className={styles.cancle_btn} onClick={handleCancle}>취소</button>
                <div className={styles.empty_box}></div>
            </div>
        </div>
    );
};