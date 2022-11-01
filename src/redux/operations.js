import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from 'api/contacts';

const isDublicate = ({ name, number }, contacts) => {
  const normalizedName = name.toLowerCase();

  const result = contacts.find(item => {
    return (
      normalizedName === item.name.toLowerCase() &&
      number === item.number.toLowerCase()
    );
  });
  return Boolean(result);
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetch',
  async (_, thunkApi) => {
    try {
      const data = await api.getContacts();
      return data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.addContact(data);
      return result;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
  {
    condition: (data, { getState }) => {
      const { contacts } = getState();
      if (isDublicate(data, contacts.items)) {
        return alert(`${data.name} - ${data.number} is already exist`);
      }
    },
  }
);

export const removeContact = createAsyncThunk(
  'contacts/remove',
  async (id, { rejectWithValue }) => {
    try {
      await api.removeContact(id);
      return id;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
