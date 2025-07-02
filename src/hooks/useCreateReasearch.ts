
import { createReverch } from "@/app/JHAMBUDWEEPA/Research/research";
import { useMutationData } from "./useMutationData";


export const useCreateReverch = (code: string, date: string) => {
    const { mutate } = useMutationData(
        ["create-reverch"],
        () => createReverch(code, date),
        "uncheck-reverch"
    );
    
    const onCreateNewReverch = () => {
        mutate({ date: '2025', id: 'odd' }) //untitled
        // //console.log(mutate({ name: 'Untitled', id: 'optimitsitc--id' }), 'mutate ka bhai')
    }
    //console.log('ONCREATEUIONNEWFOLDER')
    return {onCreateNewReverch}
};