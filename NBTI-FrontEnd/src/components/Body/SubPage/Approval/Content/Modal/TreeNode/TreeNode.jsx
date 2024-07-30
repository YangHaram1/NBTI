import { useState } from 'react';
import styles from './TreeNode.module.css';
import { useDocFormStore } from '../../../../../../../store/store';

export const TreeNode = ({ node }) => {

    const {setDocForm} = useDocFormStore();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleShowData = (event) => {
        const name = event.currentTarget.querySelector('input[name="name"]').value;
        const id = event.currentTarget.querySelector('input[name="id"]').value;
        const period = event.currentTarget.querySelector('input[name="period"]').value;
        console.log({ name, id, period });
        setDocForm({name:name, id:id, period:period});
      };


    return(
    <li>
      <div onClick={toggleOpen} className={styles.nodeName}>
        {isOpen ? "- " : "+ "} {node.name}
      </div>
      {isOpen && node.children && node.children.length > 0 && (
        <ul className={styles.childList}>
          {node.children.map((child) => (
            <li className={styles.treeList} key={child.id} onClick={handleShowData}>ㄴ{child.name}
                <input type='hidden' name="name" value={child.name}></input>
                <input type='hidden' name="id" value={node.name}></input>
                <input type='hidden' name="period" value={child.period}></input>
            </li>
          ))}
        </ul>
      )}
    </li>
    );   

};