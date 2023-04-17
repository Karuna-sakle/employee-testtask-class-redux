import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "@reduxjs/toolkit";
import EmployeeSlice from './Slices/EmployeeSlice'

const RootReducer = combineReducers({
    user: EmployeeSlice,
   
})

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
    
})
export const persistor = persistStore(store)