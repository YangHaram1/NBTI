import { create } from 'zustand';

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

/*은미*/
/*side - 캘린더 List*/
export const useCalendarList = create((set) => ({
    selectedItem: [], // 선택된 항목 상태
    setSelectedItem: (item) => set({ selectedItem: item }), // 선택된 항목 업데이트 함수

    calendarList: [],
    setCalendarList: (item) => set({ calendarList: item }), // 캘린더 전체 목록 

    calendarSelectList: [],
    setCalendarSelectList: (item) => set({ calendarSelectList: item }), // 캘린더 선택 목록 

    sharedCalendarName: [], // 공유 캘린더 이름 상태
    setSharedCalendarName: (item) => set((state) => ({
        sharedCalendarName: [...state.sharedCalendarName, item], // 기존 배열에 새로운 항목 추가
    })),
    membersList:[],
    setMembersList: (item) => set({ membersList: item }),

    // 제목 (개인/공유)
    privateList:[],
    setPrivateList: (item) => set({ privateList: item }),
    publicList:[],
    setPublicList: (item) => set({ publicList: item }),
}));
// 예약
export const useReservationList = create((set) => ({
    reservations: [],
    setReservations: (items) => set({ reservations: items }),
    wait: [],
    setWait: (items) => set({ wait: items }),
    approve: [],
    setApprove: (items) => set({ approve: items }),
    reject: [],
    setReject: (items) => set({ reject: items }),

    modalOpen: false, // 모달 상태
    setModalOpen: (open) => set({ modalOpen: open }),
    selectedDate: null, // 선택한 날짜
    setSelectedDate: (date) => set({ selectedDate: date }),
}));


/*하람*/
export const useCheckList = create((set) => ({
    webSocketCheck:false,
    chatSeq:0,
    onMessage:false,
    emoticonDisplay: false,
    searchDisplay: true,
    chatController:false,
    setEmoticonDisplay: ()=>set((state) => ({ emoticonDisplay: !state.emoticonDisplay })),
    setSearchDisplay: (search) => set({ searchDisplay: search }),
    setChatSeq:(seq)=>set({chatSeq:seq}),
    setOnmessage:() => set((state) => ({ onMessage: !state.onMessage  })),
    setWebSocketCheck:() => set((state) => ({ webSocketCheck: !state.webSocketCheck})),
    setChatController:()=>set((state) => ({ chatController: !state.chatController}))
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

// 결재라인
export const useApprovalLine = create((set) => {
    return {
        approvalLine: [],
        setApprovalLine: (approval) => set((prev) => {
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
        }),
        resetApprovalLine: () => set({ approvalLine: [] })
    }
});

// 참조라인
export const useReferLine = create((set) => {
    return {
        referLine: [],
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
        }),
        resetReferLine: () => set({ referLine: [] })
    }
});

// 휴가 신청서
export const useDocVacation = create((set)=>{
    return{
        docVacation:{category:'', start:'', halfStart:'', halfStartAP:'' ,end:'',halfEnd:'', halfEndAP:'' },
        setDocVacation:(vacation)=>set(()=>({
            docVacation: vacation
        }))
    }
});

// 휴직 신청서
export const useDocLeave = create((set)=>{
    return{
        docLeave:{start:null, end:null, reason:'', address:'', phone:''},
        setDocLeave:(leave)=>set(()=>({
            docLeave: leave
        }))
    }
});