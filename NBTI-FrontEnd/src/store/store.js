import { create } from 'zustand';
import { host } from '../config/config';
import axios from 'axios';

/*공통*/
export const useAuthStore = create((set) => {
    return {
        loginID: null,
        setLoginID: (loginID) => {
            return set({ loginID: loginID });
        }
    }
});

export const useMemberStore = create((set) => ({
    members: [],
    setMembers: (members) => set({ members }),
  }));


/*하람*/
export const useCheckList = create((set) => ({
    emoticonDisplay: false,
    searchDisplay: true,
    setEmoticonDisplay: (emt) => set((state) => ({ emoticonDisplay: !state.emoticonDisplay })),
    setSearchDisplay: (search) => set({ searchDisplay: search })
}));


/*유나*/
export const useBoardStore = create((set) => {
    return {
        boardType: '자유',
        boardSeq: -1,
        setBoardType: (type) => set({ boardType: type }),
        setBoardSeq: (seq) => set({ boardSeq: seq })


    }
});


/*지연*/
export const useDocFormStore = create((set)=>{
    return{
        docForm : {name:'', id:'', period:''},
        setDocForm : (form)=> set(()=>({
            docForm : form
        }))
    }
})