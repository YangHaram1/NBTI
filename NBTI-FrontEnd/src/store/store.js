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




/**/