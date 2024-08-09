// SearchUser.js
import React from 'react';
import styles from './SearchUser.module.css';

const SearchUser = ({ searchTerm, setSearchTerm, onSearch }) => {
    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className={styles.searchBar}>
            <input
                type="text"
                placeholder="사용자 이름 검색"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyPress}  // onKeyUp에서 onKeyDown으로 변경
            />
            <button onClick={onSearch}>검색</button>
        </div>
    );
};

export default SearchUser;
