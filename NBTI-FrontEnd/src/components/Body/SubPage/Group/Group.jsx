import styles from './Group.module.css';
import { useNavigate } from 'react-router-dom';
import  Side  from './Side/Side';
import Content from './Content/Content' 
const Group=()=>{
    const navi=useNavigate();
    return(
        <div className={styles.container}>
            <Side></Side>
        </div>
    );
}
export default Group;