
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ChatsProvider } from './Context/ChatsContext';
import Chat from './components/Chat/Chat';
import Home from './components/Home/Home';
import axios from 'axios';
import styles from './ChatApp.module.css';

axios.defaults.withCredentials = true;
 
const ChatApp = () => {
    return (
        <ChatsProvider>
            <div className={styles.container}>
                <Router>
                    <Routes>
                        <Route path='/*' element={<Home />} />
                        <Route path='/chat' element={<Chat />} />
                    </Routes>
                </Router>
            </div>
        </ChatsProvider>


    );

}

export default ChatApp;