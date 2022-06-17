import { createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const initialState = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    { id: 'id-5', name: 'Tome Cruse', number: '224-91-26' },
  ],
  filter: '',
};
const persistConfig = {
  key: 'contacts',
  storage,
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  reducers: {
    addContact: (state, { payload }) => {
      return {
        ...state,
        items: [...state.items, payload],
      };
    },
    deleteContact: (state, { payload }) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== payload),
      };
    },
    filterContact: (state, { payload }) => {
      return { ...state, filter: payload };
    },
  },
});

export const persistedReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact, filterContact } =
  contactsSlice.actions;

export const getContacts = state => state.items;
export const getFilter = state => state.filter;
