import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,

  reducers: {
    filterContact: (state, { payload }) => {
      return { filter: payload };
    },
  },
});

export const { filterContact } = contactsSlice.actions;
export const getFilter = state => state.filter;
