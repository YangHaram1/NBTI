import { useEffect, useState } from 'react';
import styles from './List.module.css';
import { format } from 'date-fns';
import { host } from '../../../../../../config/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';


export const List = ({setlist}) => {

    const navi = useNavigate();
    const [lists, setLists] = useState([]);
    const [fileExistenceMap, setFileExistenceMap] = useState({});

    // 페이지네이션 상태변수
    const [cpage, setCpage] = useState(1);
    const [page_total_count, setPage_total_count] = useState();
    const [target, setTarget] = useState('select');
    const [keyword, setKeyword] = useState('');
    const [search,setSearch] =useState(false);

    const record_count_per_page = 15;
    const navi_count_per_page = 5;

    useEffect(()=>{
        // console.log("setlist 변경", cpage);
        setCpage(1);
    },[setlist])

    useEffect(()=>{
        let url = '';
        const start = cpage * record_count_per_page - (record_count_per_page - 1);
        const end = cpage * record_count_per_page;

        // console.log(setlist);
        switch (setlist) {
            case '결재 대기':
                // console.log("결재대기");
                url = `${host}/approval/getApprovalWait`;
                break;
            case '결재 예정':
                // console.log("결재 예정")
                url = `${host}/approval/getApprovalBook`;
                break;
            case '참조/열람 대기':
                // console.log("참조/열람 대기");
                url = `${host}/approval/getReferIsMeWait`
                break;
            // case '반려 문서함':
            default:
                return;
        }


        axios.get(url +`?start=${start}&end=${end}&target=${target}&keyword=${keyword}`)
        .then(async (resp) => {
            // console.log(resp.data);

            setLists(() => {
                const record_total_count = resp.data.count;//106 10 // 10
                if (record_total_count % record_count_per_page === 0) {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page));
                }
                else {
                    setPage_total_count(Math.floor(record_total_count / record_count_per_page) + 1);
                }
                return resp.data.list;//10
            });

            const filePromises = resp.data.list.map(async (list) => {
                try {
                    let seq = list.temp_seq;
                    const fileResp = await axios.get(`${host}/files/getFiles/${seq}`);
                    return { temp_seq: seq, files: fileResp.data };
                } catch (err) {
                    console.error(err);
                    return { temp_seq: list.temp_seq, files: false };
                }
            });
            
            const files = await Promise.all(filePromises);
            const fileMap = files.reduce((acc, { temp_seq, files }) => ({
                ...acc, [temp_seq]: files
            }), {});
            
            setFileExistenceMap(fileMap);
            
        })
        .catch((error) => {
            console.error(error);
        });
    },[cpage, setlist, search])

    useEffect(()=>{
        setKeyword('');
        setTarget('select');
        // setCpage(1);
    },[setlist])

    const handleMove = (tempSeq, docSubName) => {
        navi("/approval/detail", {state:{seq:tempSeq, setlist:docSubName, list:setlist}});
    };

    const handleSearch = () =>{
        setSearch((prev)=>{
            setCpage(1);
            return !prev;
        })
    }

    const handleTarget = (e)=>{
        setTarget(e.target.value);
        console.log("검색 종류",e.target.value);
    }

    const handleKeyword = (e)=>{
        setKeyword(e.target.value);
        console.log("키워드",e.target.value);
        console.log("검색 종류",target);
    }

    const handlePage = (selectedPage) => {
        setCpage(selectedPage.selected + 1);
    }


    return(
        <div className={styles.container}>
            <div className={styles.title}>{setlist}</div>
            <div className={styles.search_box}>
            <select onChange={handleTarget} value={target}>
                    <option value="select">선택</option>
                    <option value="writer">기안자</option>
                    <option value="doc_seq">문서번호</option>
                    <option value="title">제목</option>
                </select>
                <input type='text' placeholder='Seach' onChange={handleKeyword} value={keyword}></input>
                <button onClick={handleSearch}>검색</button>
            </div>
            <div className={styles.content}>
                <div className={styles.head}> 
                    <div className={styles.date}> 기안일</div>
                    <div className={styles.form}> 결재양식</div>
                    <div className={styles.emergency}> 긴급</div>
                    <div className={`${styles.content_title} ${styles.align}`}> 제목</div>
                    <div className={styles.file}> 첨부</div>
                    <div className={styles.writer}> 기안자</div>
                </div>
                <div className={styles.body}>

                    {
                        lists.map((list)=>{
                            return(
                            <div className={styles.lists} key={list.temp_seq}>
                                <div className={styles.date}>
                                {
                                    format(new Date(list.approval_date),'yyyy-MM-dd')
                                }
                                </div>
                                <div className={styles.form}> {list.doc_sub_name}</div>
                                <div className={styles.emergency}>
                                        {
                                            list.emergency == "Y  " ?  <div className={styles.emergency_badge}>긴급</div> :"" 
                                        }
                                </div>
                                <div className={`${styles.content_title} ${styles.content_title_hover}`} onClick={() => handleMove(list.temp_seq, list.doc_sub_name)}>
                                     {
                                        list.title !== null ? list.title : list.doc_sub_name 
                                    }
                                </div>
                                <div className={styles.file}>
                                    {/* {console.log("콘솔로 찍어보깅",fileExistenceMap[list.temp_seq])} */}
                                    {
                                    fileExistenceMap[list.temp_seq] != undefined
                                    ? Array.from(fileExistenceMap[list.temp_seq]).length > 0 ? <i className="fa-solid fa-paperclip"></i> : ''
                                    : '...'} {/* 로딩 중일 때는 '...' 표시 */}
                                </div>
                                <div className={styles.writer}> {list.name}</div>
                            </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className={styles.footer}>
            <ReactPaginate
                pageCount={page_total_count} // 페이지 총 개수
                pageRangeDisplayed={navi_count_per_page} // 현재 페이지를 기준으로 표시할 페이지 범위 수
                marginPagesDisplayed={1} // 양쪽 끝에 표시할 페이지 수
                onPageChange={handlePage} // 페이지 변경 핸들러
                containerClassName={styles.pagination} // 스타일 클래스
                activeClassName={styles.active} // 활성 페이지 클래스
                initialPage={0} //초기 page 값
                previousLabel={'<'} // 이전 페이지 버튼 레이블
                previousClassName={styles.previous} // 이전 버튼의 클래스명
                nextLabel={'>'} // 다음 페이지 버튼 레이블
                nextClassName={styles.next} // 다음 버튼의 클래스명
                breakLabel={'...'} // 생략 표시 제거
                breakClassName={null} // 생략 표시의 클래스명 제거
            />
            </div>
        </div>
    );
}