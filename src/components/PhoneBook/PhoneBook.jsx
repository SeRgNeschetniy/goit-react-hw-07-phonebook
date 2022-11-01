import FormAddContacts from './ContactForm/ContactForm';
import PhoneBookList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container } from './PhoneBook.module';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, fetchContacts } from 'redux/operations';
import { getFilteredContacts, getState } from 'redux/contactsSelector';
import { getFilter, setFilter } from 'redux/filterSlice';
import { useEffect } from 'react';

export default function PhoneBook() {
  const contacts = useSelector(getFilteredContacts);
  const { loading, error } = useSelector(getState);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onAddContact = data => {
    const action = addContact(data);
    dispatch(action);
  };

  const handleChange = e => {
    const value = e.target.value;
    dispatch(setFilter(value));
  };

  return (
    <Container>
      <div className="block">
        <h1>PhoneBook</h1>
        <FormAddContacts addContact={onAddContact} />
      </div>
      <div className="block">
        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={handleChange} />
        {!loading && contacts.length > 0 && <PhoneBookList items={contacts} />}
        {loading && <p>...loading</p>}
        {error && <p>oops, something went wrong</p>}
      </div>
    </Container>
  );
}
