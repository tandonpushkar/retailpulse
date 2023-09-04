import {configureStore} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Slices
import rootReducer from '../reducers';
import {reducers} from '@constants';

// const logger: any = [];
const persistConfig = {
  debounce: 1000,
  key: 'root',
  storage: AsyncStorage,
  whitelist: [reducers.ROOT, reducers.LOGIN, reducers.UPLOAD],
};

// if (__DEV__) {
//   const createDebugger = require('redux-flipper').default;
//   logger.push(createDebugger());
// }

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store: any = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
