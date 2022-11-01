import { createSlice } from '@reduxjs/toolkit';
import { addContact, fetchContacts, removeContact } from 'redux/operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending](state) {
      state.loading = true;
    },
    [addContact.fulfilled](state, action) {
      console.log('addContact.fulfilled');
      state.items.push(action.payload);
    },
    [addContact.rejected](state, action) {
      console.log('addContact.rejected');
      state.isLoading = false;
      state.error = action.payload;
    },
    [removeContact.pending](state) {
      state.loading = true;
    },
    [removeContact.fulfilled](state, action) {
      state.isLoading = false;
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    [removeContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default contactsSlice.reducer;
