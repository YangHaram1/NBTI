import React, { createContext, useState,useRef } from 'react';
export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
   const [chats,setChats]= useState([]);
  // const [chatSeq,setChatSeq] =useState(0);
   const ws = useRef(null); // WebSocket 객체 상태 추가 
   const chatAppRef=useRef(null);
   const [chatNavi,setChatNavi] =useState('');
   const [chatNaviBody,setChatNaviBody]=useState('chats');

    return (
        <ChatsContext.Provider value={{ chats, setChats,ws,chatAppRef,chatNavi,setChatNavi,chatNaviBody,setChatNaviBody}}>
            {children}
        </ChatsContext.Provider>
    );
};