import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';
import css from 'components/App.module.css';

const defaultContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const localStorageTarget = JSON.parse(
      window.localStorage.getItem('contacts')
    );
    return localStorageTarget && localStorageTarget.length > 0
      ? localStorageTarget
      : defaultContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = data => {
    if (checkName(data.name)) {
      alert(`${data.name} is already in contacts`);
      return;
    } else {
      setContacts(prevState => [
        { id: nanoid(), name: data.name, number: data.number },
        ...contacts,
      ]);
    }
  };

  const getVisiableContacts = () => {
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const checkName = filterName => {
    const arr = contacts.filter(({ name }) => name === filterName);
    if (arr.length > 0) {
      return true;
    }
    return false;
  };

  return (
    <div className={css.app}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />

      <h2>Contacts</h2>

      <Filter
        filterValue={filter}
        onChange={e => setFilter(e.currentTarget.value)}
      />

      <ContactList
        contacts={getVisiableContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
