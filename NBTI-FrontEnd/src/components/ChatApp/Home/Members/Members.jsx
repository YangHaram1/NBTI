import { useState, useEffect, useRef, React } from 'react';
import styles from './Members.module.css';
import axios from 'axios';
import Modal from './Modal/Modal';

const Members = () => {
    const [list, setList] = useState(['양하람', '전은미', '송유나', '김지연', '서상혁']);
    const [modalDisplay, setModalDisplay] = useState(null);
    const modalRef = useRef([]);
    useEffect(() => {
        /* axios.post('',)
             .then(response => {
                 setList(response);
             })
             .catch(error => {
                 console.error('There was an error posting the data!', error);
             });*/
    }, [])

    const handleRightClick = (index) => (e) => {
        const { clientX: x, clientY: y } = e;
        console.log(`${x}:${y}`);
        e.preventDefault();
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            modalRef.current[index].style.display = 'flex';
            modalRef.current[index].style.top=y+'px';
            modalRef.current[index].style.left=x;
            return modalRef.current[index];
        });
    };

    const handleClick = () => {
        setModalDisplay((prev) => {
            if (prev != null) {
                prev.style.display = 'none'
            }
            return null;
        })
    }
    return (
        <div className={styles.container} onClick={handleClick}>
            {
                list.map((item, index) => {
                    return (
                        <div onContextMenu={handleRightClick(index)} key={index} >
                            {item}<Modal modalRef={modalRef} index={index} item={item}></Modal>
                        </div>
                    );
                })
            }
        </div>
    );
}
export default Members;