import styles from './Content.module.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './Home/Home';
import { Write } from './Write/Write';
import { List } from './List/List';
import { ListDoc } from './ListDoc/ListDoc';
import { Detail } from './Detail/Detail';
import { useEffect } from 'react';
import { useApprovalLine, useReferLine } from '../../../../../store/store';

export const Content = ()=>{

    const location = useLocation();
    const { resetReferLine } = useReferLine();
    const { resetApprovalLine } = useApprovalLine();

    useEffect(() => {
            // console.log('URL이 변경되었습니다:', location.pathname);
            if(location.pathname === "/approval/write/docVacation"||location.pathname === '/approval/write/docLeave'||location.pathname === '/approval/write/docDraft'||location.pathname === '/approval/write'){
                // console.log("데이터 보존");
            }else{
                // console.log("데이터 삭제");
                resetReferLine();
                resetApprovalLine();
            }
    }, [location]);

    return(
        <div className={styles.container}> 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="write" element={<Write />} />
                <Route path="home/*" element={<Home />} />
                <Route path="listWait/*" element={<List setlist={"결재 대기"} />} />
                <Route path="listReserved/*" element={<List setlist={"결재 예정"} />}/>
                <Route path="listAll/*" element={<List setlist={"참조/열람 대기"}/>} />
                <Route path="listDocAll/*" element={<ListDoc setlist={"전체 문서함"} />} />
                <Route path="listDocWrite/*" element={<ListDoc setlist={"기안 문서함"} />} />
                <Route path="listDocApproval/*" element={<ListDoc setlist={"결재 문서함"} />} />
                <Route path="listDocReceive/*" element={<ListDoc setlist={"수신 문서함"} />} />
                <Route path="listDocReference/*" element={<ListDoc setlist={"참조/열람 문서함"} />} />
                <Route path="listDocBan/*" element={<ListDoc setlist={"반려 문서함"} />} />
                <Route path="listDocCancle/*" element={<ListDoc setlist={"상신취소 문서함"} />} />
                <Route path="listDocTemp/*" element={<ListDoc setlist={"임시 저장 문서함"} />} />
                <Route path="listDocSetting/*" element={<ListDoc setlist={"전자결재 관리"} />} />
                <Route path="write/docVacation/*" element={<Write setlist={"휴가신청서"} />} />
                <Route path="write/docLeave/*" element={<Write setlist={"휴직신청서"} />} />
                <Route path="write/docDraft/*" element={<Write setlist={"업무기안서"} />} />
                <Route path="detail/*" element={<Detail setlist={"디페일 페이지"}/>}/>
            </Routes>
        </div>
    );
}