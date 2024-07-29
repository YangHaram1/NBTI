import styles from './Content.module.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home/Home';
import { Write } from './Write/Write';
import { List } from './List/List';

export const Content = ()=>{
    return(
        <div className={styles.container}> 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="write" element={<Write />} />
                <Route path="home/*" element={<Home />} />
                <Route path="listAll/*" element={<List setlist={"결재 전체"}/>} />
                <Route path="listWait/*" element={<List setlist={"결재 대기"} />} />
                <Route path="listReserved/*" element={<List setlist={"결재 예약"} />}/>
                <Route path="listDocAll/*" element={<List setlist={"전체 문서함"} />} />
                <Route path="listDocWrite/*" element={<List setlist={"기안 문서함"} />} />
                <Route path="listDocApproval/*" element={<List setlist={"결재 문서함"} />} />
                <Route path="listDocReceive/*" element={<List setlist={"수신 문서함"} />} />
                <Route path="listDocReference/*" element={<List setlist={"참조/열람 문서함"} />} />
                <Route path="listDocBan/*" element={<List setlist={"반려 문서함"} />} />
                <Route path="listDocCancle/*" element={<List setlist={"상신취소 문서함"} />} />
                <Route path="listDocTemp/*" element={<List setlist={"임시 저장 문서함"} />} />
                <Route path="listDocSetting/*" element={<List setlist={"전자결재 관리"} />} />
            </Routes>
        </div>
    );
}