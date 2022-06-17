import React from 'react';

import styles from './App.module.css';
import { ContactForm } from './ContactForm';
import { ContactFilter } from './ContactFilter';
import { ContactList } from './ContactList';
import { Title } from './ui/Title';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  { id: 'id-5', name: 'Tome Cruse', number: '224-91-26' },
];

export const App = () => {
  return (
    <div className={styles.ContactForm}>
      <ContactForm />
      <Title className={styles.contact} title="Contacts" />
      <ContactFilter />
      <ContactList />
    </div>
  );
};
