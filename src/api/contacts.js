import axios from 'axios';

const instanceContacts = axios.create({
  baseURL: 'https://635acceaaa7c3f113dafc26f.mockapi.io/contacts/',
});

export const getContacts = async () => {
  const { data } = await instanceContacts.get('/');
  console.log('getContacts', data);
  return data;
};

export const addContact = async data => {
  const { data: result } = await instanceContacts.post('/', data);
  console.log('getContacts', data);
  return result;
};

export const removeContact = async id => {
  const { data } = await instanceContacts.delete(`/${id}`);
  console.log('getContacts', data);
  return data;
};
