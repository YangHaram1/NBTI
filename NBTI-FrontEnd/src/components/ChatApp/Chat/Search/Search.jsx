import styles from './Search.module.css';
import axios from 'axios';
import { host } from '../../../../config/config'

const Search = ({ search, setSearch, searchRef, setSearchList, handleSearch ,chatRef,divRef}) => {
    const handleSearchDate = (e) => {
        setSearch(e.target.value);
    }
    const handleCancel = () => {
        handleSearch();
    }
    const handleList = () => {
        const searchParam = search ? `?search=${encodeURIComponent(search)}` : '';
        axios.get(`http://${host}/chat${searchParam}`).then((resp) => {
            setSearchList(resp.data);
        })
    }
    
    const handleUp=()=>{
        if (divRef.current) {
            divRef.current.scrollTop = chatRef.current[0].scrollHeight;
          }
    }
    const handleDown=()=>{

    }


    return (
        <div className={`${styles.container}`} ref={searchRef}>
            <div className={styles.div1}>
                <input type="text" placeholder='검색할 내용을 입력하세요' name='content' value={search} onChange={handleSearchDate} />
            </div>
            <div className={styles.updown}>
                <div>
                    <button onClick={handleUp}>위로</button>  
                </div> 
                <div>
                    <button onClick={handleDown}>아래로</button>
                </div>
            </div>
            <div className={styles.div2}>
                <button className={styles.btn1} onClick={handleList}>검색</button>
            </div>
            <div className={styles.div3}>
                <button className={styles.btn2} onClick={handleCancel}>❌</button>
            </div>
        </div>

    );
}
export default Search;