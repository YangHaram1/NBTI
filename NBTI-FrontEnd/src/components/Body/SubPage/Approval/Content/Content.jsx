import styles from './Content.module.css';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home/Home';
import { Write } from './Write/Write';

export const Content = ()=>{
    return(
        <div className={styles.container}> 
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="write" element={<Write />} />
                <Route path="home/*" element={<Home />} />
                <Route path="listAll/*" element={<Home />} />
                <Route path="listWait/*" element={<Home />} />
                <Route path="listReserved/*" element={<Home />} />
                <Route path="listDocAll/*" element={<Home />} />
                <Route path="listDocWrite/*" element={<Home />} />
                <Route path="listDocApproval/*" element={<Home />} />
                <Route path="listDocReceive/*" element={<Home />} />
                <Route path="listDocReference/*" element={<Home />} />
                <Route path="listDocBan/*" element={<Home />} />
                <Route path="listDocCancle/*" element={<Home />} />
                <Route path="listDocTemp/*" element={<Home />} />
                <Route path="listDocSetting/*" element={<Home />} />
            </Routes>
        </div>
    );
}