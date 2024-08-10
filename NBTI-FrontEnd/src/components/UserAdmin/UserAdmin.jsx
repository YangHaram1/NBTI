
import styles from './UserAdmin.module.css';
import { Side } from './Side/Side';
import { Contents } from './Contents/Contents'
export const UserAdmin = () => {
    return (
        <div className={styles.container}>
            <Side />
            <Contents />


        </div>
    );
};