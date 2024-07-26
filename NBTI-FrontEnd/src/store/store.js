import {create} from 'zustand';
/*하람*/ 
export const useAuthStore= create((set)=>{
    return{
        loginID:null,
        setLoginID:(loginID)=>{
            return set({loginID:loginID});
        }
    }
});
export const useCheckList = create((set) => ({
    emoticonDisplay: true,
    searchDisplay: true,
    setEmoticonDisplay: (emt) => set({ emoticonDisplay: emt }),
    setSearchDisplay: (search) => set({ searchDisplay: search })
  }));

/**/