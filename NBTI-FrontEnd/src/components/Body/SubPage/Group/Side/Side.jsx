import styles from "./Side.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Side = () => {
    useEffect(() => {
        // 외부 스타일시트를 동적으로 추가
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
        document.head.appendChild(link);

        // 컴포넌트가 언마운트될 때 스타일시트를 제거
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    const navi = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.menus}>
                <ul>
                    <li onClick={() => { navi("") }}>
                        조직도
                    </li>
                </ul>
                <ul>
                    <li onClick={() => { navi("") }}>
                        조직도
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default Side;