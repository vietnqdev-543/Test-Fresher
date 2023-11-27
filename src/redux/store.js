import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accountReducer from '../redux/account/accountSlice'
import counterReducer from '../redux/counter/counterSlice'
import orderReducer from '../redux/order/orderSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'




const persistConfig = {
  key: 'root',
  version: 1,
  storage :storage ,
  blacklist : ['account' ] // sẽ không được lưu trên localstorage
}

const rootReducer = combineReducers({
  account : accountReducer , 
  counter: counterReducer ,  
  order : orderReducer 
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
   
})


const  persistor = persistStore(store)
export {store , persistor}