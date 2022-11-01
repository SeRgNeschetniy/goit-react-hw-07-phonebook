//export const getContacts = ({ contacts }) => contacts.items;

export const getState = ({ contacts }) => ({
  loading: contacts.loading,
  error: contacts.error,
});

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    console.log('contacts.items', contacts.items);
    return contacts.items;
  }

  const normalizedFilter = filter.toLocaleLowerCase();
  const filteredContacts = contacts.items.filter(({ name, number }) => {
    const normalizedTitle = name.toLocaleLowerCase();
    const result =
      normalizedTitle.includes(normalizedFilter) ||
      number.includes(normalizedFilter);
    return result;
  });

  return filteredContacts;
};

export const getLoadingStatus = state => state.contacts.loading;
