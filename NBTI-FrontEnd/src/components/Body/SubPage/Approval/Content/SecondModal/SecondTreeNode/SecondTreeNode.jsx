import { useState } from 'react';
import styles from './SecondTreeNode.module.css';
// import { useDocFormStore } from '../../../../../../../store/store';

export const SecondTreeNode = ({ node }) => {

    // const {setDocForm} = useDocFormStore();
    const [isOpen, setIsOpen] = useState(false);
 
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleShowData = (event) => {
        const name = event.currentTarget.querySelector('input[name="name"]').value;
        const id = event.currentTarget.querySelector('input[name="id"]').value;
        const period = event.currentTarget.querySelector('input[name="period"]').value;
        console.log({ name, id, period });
        // setDocForm({name:name, id:id, period:period});
      };


    return(
        <li className={styles.tree}>
        <div onClick={toggleOpen} className={styles.nodeName}>
            {isOpen ? "- " : "+ "} {node.name}
        </div>
        {isOpen && node.children && node.children.length > 0 && (
            <ul className={styles.childList}>
                {node.children.map((child) => (
                    <SecondTreeNode key={child.id} node={child} />
                ))}
            </ul>
        )}
        {node.children && node.children.length === 1 && (
            <ul className={styles.childList}>
                <li className={styles.treeList}>
                    ㄴ{node.name}
                    <input type='hidden' name="name" value={node.name} />
                    <input type='hidden' name="id" value={node.id} />
                    <input type='hidden' name="period" value={node.period} />
                </li>
            </ul>
        )}
    </li>
    );   

};


    // <li className={styles.tree}>
    //   <div onClick={toggleOpen} className={styles.nodeName}>
    //     {isOpen ? "- " : "+ "} {node.name}
    //   </div>
    //   {isOpen && node.children && node.children.length > 0 && (
    //     <ul className={styles.childList}>
    //       {node.children.map((child) => (
    //         <li className={styles.treeList} key={child.id} onClick={handleShowData}>ㄴ{child.name}
    //             <input type='hidden' name="name" value={child.name}></input>
    //             <input type='hidden' name="id" value={node.name}></input>
    //             <input type='hidden' name="period" value={child.period}></input>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </li>