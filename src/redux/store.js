import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from './contactsSlise';
import { contactsApi } from './contactsApi';

const rootReducer = combineReducers({
  filter: contactsSlice.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
