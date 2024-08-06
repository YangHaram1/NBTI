import styles from './Content.module.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home/Home';
import { Write } from './Write/Write';
import { List } from './List/List';
import { ListDoc } from './ListDoc/ListDoc';

export const Content = ()=>{
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
            </Routes>
        </div>
    );
}