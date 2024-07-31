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
    selectedMember: null,
    setMembers: (members) => set({ members }),
    setSelectedMember: (member) => set({ selectedMember: member }),
  }));


/*하람*/
export const useCheckList = create((set) => ({
    chatSeq:0,
    emoticonDisplay: false,
    searchDisplay: true,
    setEmoticonDisplay: (emt) => set((state) => ({ emoticonDisplay: !state.emoticonDisplay })),
    setSearchDisplay: (search) => set({ searchDisplay: search }),
    setChatSeq:(seq)=>set({chatSeq:seq})
}));

export const useNotification =create((set)=>({
        maxCount:3,
        count:0,
        increment: () => set((state) => ({ count: state.count + 1 })),
        decrement: () => set((state) => ({ count: Math.max(state.count - 1, 0) })),
  
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

export const useApprovalLine = create((set)=>{
    return{
        approvalLine : [{id : '', order:''}],
        setApprovalLine : (approval)=>set((prev)=>({
           approvalLine : [...prev.approvalLine, approval] 
        }))
    }
})

