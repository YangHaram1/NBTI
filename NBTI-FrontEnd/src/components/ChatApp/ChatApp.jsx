
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ChatsProvider } from '../../Context/ChatsContext';
import Chat from './Chat/Chat';
import Home from './Home/Home';
import axios from 'axios';
import styles from './ChatApp.module.css';

axios.defaults.withCredentials = true;
 
const ChatApp = () => {
    return (
        <ChatsProvider>
            <div className={styles.container}>
                    <Routes>
                        <Route path='/*' element={<Home />} />
                        <Route path='/chat' element={<Chat />} />
                    </Routes>
            </div>
        </ChatsProvider>


    );

}

export default ChatApp;