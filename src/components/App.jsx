import React from 'react';

import styles from './App.module.css';
import { ContactForm } from './ContactForm';
import { ContactFilter } from './ContactFilter';
import { ContactList } from './ContactList';
import { Title } from './ui/Title';

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
