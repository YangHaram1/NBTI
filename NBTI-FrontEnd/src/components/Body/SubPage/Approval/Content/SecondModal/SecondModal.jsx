import React, { useState } from 'react';
import styles from './SecondModal.module.css'; // 스타일시트 경로는 동일하게 유지

const SecondModal = ({ isOpen, onClose }) => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    // 두 번째 모달의 폼 제출 처리
    console.log("제목:", title);
    console.log("내용:", content);
    onClose(); // 제출 후 모달 닫기
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        <h2>두 번째 폼</h2>
        <form onSubmit={handleSubmit}>
          <label>
            제목:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            내용:
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">제출</button>
        </form>
      </div>
    </div>
  );
};

export default SecondModal;
