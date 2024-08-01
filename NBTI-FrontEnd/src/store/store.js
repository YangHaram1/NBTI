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
    webSocketCheck:false,
    chatSeq:0,
    onMessage:false,
    emoticonDisplay: false,
    searchDisplay: true,
    setEmoticonDisplay: ()=>set((state) => ({ emoticonDisplay: !state.emoticonDisplay })),
    setSearchDisplay: (search) => set({ searchDisplay: search }),
    setChatSeq:(seq)=>set({chatSeq:seq}),
    setOnmessage:() => set((state) => ({ onMessage: !state.onMessage  })),
    setWebSocketCheck:() => set((state) => ({ webSocketCheck: !state.webSocketCheck}))
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
});

export const useApprovalLine = create((set)=>{
    return{
        approvalLine : [{}],
        setApprovalLine : (approval)=>set((prev)=>{
            const exist = prev.approvalLine.findIndex(line => line.order === approval.order);
            let newApprovalLine;
            if(exist !== -1){
                newApprovalLine = prev.approvalLine.map((line, index)=>
                    index === exist ? {...line, ...approval} : line
            );} else{
                newApprovalLine = [...prev.approvalLine, approval];
            }
            console.log("저장소", newApprovalLine);
            return {approvalLine : newApprovalLine};
        })
    }
});

export const useReferLine = create((set)=>{
    return{
        referLine : [{}],
        // setReferLine : (refer)=>set((prev)=>({
        //     referLine: [...prev.referLine, refer]
        // })), 
        setReferLine : (refer) => set((prev)=>{
            const exist = prev.referLine.findIndex(line => line.id === refer.id);
            let newReferLine;
            if(exist !== -1) {
                newReferLine = prev.referLine.map((line, index)=>
                index === exist ? {...line, ...refer} : line
                );} else{
                    newReferLine = [...prev.referLine, refer];
                }
                console.log("저장소", newReferLine);
                return {referLine:newReferLine};
        })
    }
});
