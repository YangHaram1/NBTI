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
                onKeyUp={handleKeyPress}
            />
            <button onClick={onSearch}>검색</button>
        </div>
    );
};

export default SearchUser;
