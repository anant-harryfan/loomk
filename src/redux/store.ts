"use client"
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import WorkSpaceReducer from './slices/workspaces'
import FolderReducer from './slices/folders'
 
const rootReducer = combineReducers({
    FolderReducer,
    WorkSpaceReducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) =>
        getDefaultMiddleWare({
            serializableCheck: false
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector