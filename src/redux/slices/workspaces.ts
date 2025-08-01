import Folders from '@/components/global/folders'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'

type initialStateProps = {
    workspaces:{
        type: 'PERSONAL' | "PUBLIC"
        name: string
        id: string
    }[]
}

const initialState: initialStateProps = {
    workspaces: [],
}

export const Workspaces =  createSlice({
    name:'workspaces',
    initialState: initialState,
    reducers:{
        WORKSPACES: (state, action: PayloadAction<initialStateProps>) =>{
            return {...action.payload}
        }
    }
})
const {WORKSPACES} = Workspaces.actions

export default Workspaces.reducer

