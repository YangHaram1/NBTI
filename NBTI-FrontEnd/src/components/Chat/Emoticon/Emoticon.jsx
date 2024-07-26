import styles from './Emoticon.module.css';
import { useRef } from 'react';

const Emoticon = ({ sidebarRef, editorRef }) => {

    const defualtEmoticon = [
        '😃', '😃', '😄', '😁', '😆', '😅', '🤣', '😂',
        '🥰', '😍', '😌', '😉', '🙃', '🙂', '😇', '😊',
        '😏', '🥳', '🤩', '😎', '🤓', '🧐', '🤨', '🤪',
        '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
        '😤', '😮‍💨', '😭', '😢', '🥺', '😩', '😫', '😖',
        '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱',
        '😘', '😗', '😙', '😚', '😋', '😝', '😛', '😜',
        '🤫', '🤭', '🤔', '🤗', '😓', '😥', '😰', '😨',
        '🤥', '😶', '😶‍🌫️', '😐', '😑', '😬', '🙄', '😯',
        '😪', '🤤', '😴', '🥱', '😲', '😮', '😧', '😦',
        '😵', '😵‍💫', '🤐', '🥴', '🤢', '🤮', '🤧', '😷',
        '👺', '👹', '👿', '😈', '🤠', '🤑', '🤕', '🤒',
        '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖',
        '🙀', '😽', '😼', '😻', '😹', '😸', '😺', '🎃',
        '😿', '😾', '👶', '🧒', '👦', '🧑', '👧', '👱',
        '👩‍🦰', '👩', '👨‍🦲', '👨‍🦳', '👨‍🦱', '👨‍🦰', '🧔', '👨'
    ];
    const handleCancel = () => {
        sidebarRef.current.style.display = 'none';
    }
    const handleEmoticon = (e) => {
        const text = e.target.textContent.trim();
        const prev = removeHtmlTags(editorRef.current.getContent()).trim();
        if (editorRef.current) {
            const result = prev + text;
            editorRef.current.setContent(result);
        }
    }

    const removeHtmlTags = (html) => {
        // 정규 표현식으로 HTML 태그 제거
        return html.replace(/<\/?[^>]+(>|$)/g, "").trim();
    };


    return (
        <div className={styles.container} ref={sidebarRef}>
            <div className={styles.div1}>
                <button onClick={handleCancel}>❌</button>
            </div>
            <div>
                {
                    defualtEmoticon.map((item, index) => {
                        return (
                            <span key={index} style={{ margin: '10px', paddingBottom: '10px', cursor: 'pointer' }} onClick={handleEmoticon}>
                                {item}
                            </span>
                        );
                    })
                }
            </div>
        </div>
    );
}
export default Emoticon;