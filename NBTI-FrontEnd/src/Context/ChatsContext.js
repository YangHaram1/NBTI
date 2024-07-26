import React, { createContext, useState,useRef } from 'react';
export const ChatsContext = createContext();

export const ChatsProvider = ({ children }) => {
   const [chats,setChats]= useState([]);
   const ws = useRef(null); // WebSocket 객체 상태 추가
     
    return (
        <ChatsContext.Provider value={{ chats, setChats,ws}}>
            {children}
        </ChatsContext.Provider>
    );
};