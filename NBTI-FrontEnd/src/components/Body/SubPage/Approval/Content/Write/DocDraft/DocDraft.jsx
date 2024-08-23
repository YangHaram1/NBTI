import React, { useEffect, useState } from 'react';

import styles from './DocDraft.module.css';
import { Header } from '../Header/Header';
import ApprovalEditor from '../ApprovalEditor/ApprovalEditor';
import { useApprovalLine, useEditorCheck } from '../../../../../../../store/store';

export const DocDraft = ({userdata, content ,setDocData, setContent, setDate, setDept, setTitle}) => {

    const {approvalLine} = useApprovalLine();
    const [showEditor, setShowEditor] = useState(true);
    const {editorCheck} = useEditorCheck();

    useEffect(()=>{
        if(editorCheck){
            setShowEditor(true);
        }else{
            setShowEditor(false);
        }
    },[editorCheck]);

    const handleDate = (e)=>{
        // console.log(e.target.value);
        setDate(e.target.value);
    } 
    const handleDept = (e)=>{
        // console.log(e.target.innerText);
        setDept(e.target.innerText);
    } 
    const handleTitle = (e)=>{
        // console.log(e.target.innerText);
        setTitle(e.target.innerText);
    } 

    return (
        <div className={styles.container}>
            <div className={styles.title}>업무기안서</div>
            <div className={styles.header}>
                <Header userdata={userdata}/>
            </div>
            <div className={styles.submain}>
                {/* <div className={styles.submain_box}> */}
                <div className={styles.submain_title}>시행 시작 일자</div>
                <input className={styles.submain_content} type='date' onChange={handleDate}></input>
                {/* <div className={styles.submain_content}>2024-08-01</div> */}
                <div className={styles.submain_title}>협조 부서</div>
                <div className={styles.submain_content} contentEditable="true" onInput={handleDept} suppressContentEditableWarning='true'></div>
                {/* </div> */}
            </div>
            <div className={styles.subtitle}>
                <div className={styles.subtitle_title}> 제목 </div>
                <div className={styles.subtitle_content} contentEditable="true" onInput={handleTitle} suppressContentEditableWarning='true'></div>
            </div>
            <div className={styles.content} >
                {showEditor&&<ApprovalEditor setContent={setContent} content ={content} />}
            </div>
        </div>
    );
}