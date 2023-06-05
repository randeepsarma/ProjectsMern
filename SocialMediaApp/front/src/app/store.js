import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query"
import counterSliceReducer from "counter/CounterSlice"
import {
  persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST,
  PURGE, REGISTER
} from 'redux-persist'
import storage from "redux-persist/lib/storage"
//combining the userAuthApi.js and counterSliceReducer
const reducers = combineReducers({
  counterSliceReducer,
})
const persistConfig = { key: 'root', storage, version: 1 }
const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: { ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], },
    }),
})
setupListeners(store.dispatch)