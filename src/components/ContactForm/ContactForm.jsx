import React, { useState, useEffect } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import shortid from 'shortid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, getContacts } from '../../store/contactsSlise';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import styles from './ContactForm.module.css';

const nameRegex = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/;

export const ContactForm = () => {
  const [user, setUser] = useState({ name: '', number: '' });
  const [isDisabled, setIsDisabled] = useState(true);
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const resetForm = () => {
    setUser({ name: '', number: '' });
    setIsDisabled(true);
  };

  const formSubmitHandler = e => {
    e.preventDefault();
    const contact = {
      id: shortid.generate(),
      name: user.name,
      number: user.number,
    };
    dispatch(addContact(contact));
    resetForm();
  };

  const formChangeNameHandler = e => {
    const { name, value } = e.currentTarget;
    if (value) {
      const contactFinder = contacts.find(
        contact =>
          contact.name.toLowerCase() ===
          value.toLowerCase().replace(/ +/g, ' ').trim()
      );
      if (contactFinder) {
        setIsDisabled(true);
        return Notify.warning(`${value} is already in contacts.`);
      }
    }
    setUser(user => ({ ...user, [name]: value }));
  };
  const formChangePhoneHandler = phone => {
    setUser(user => ({ ...user, number: phone }));
  };

  useEffect(() => {
    if (user.name && user.number) setIsDisabled(false);
  }, [user.name, user.number]);

  const formCheckValueHandler = e => {
    const { value } = e.currentTarget;
    if (value.length === 0) {
      return Notify.failure(
        'Enter valid name.The name can not be empty. Try again'
      );
    }
    if (!nameRegex.test(value)) {
      return Notify.failure(
        'Enter valid name.The name should to contain only Alphabet letter. Try again'
      );
    }
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles.form}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={user.name}
          onChange={e => formChangeNameHandler(e)}
          onBlur={e => formCheckValueHandler(e)}
        />
      </label>

      <label>
        Number:
        <PhoneInput
          country={'ua'}
          regions={'europe'}
          inputProps={{
            name: 'number',
            required: true,
            autoFocus: true,
          }}
          value={user.number}
          onChange={number => formChangePhoneHandler(number)}
        />
      </label>
      <button
        className={styles.submitButton}
        type="submit"
        disabled={isDisabled}
      >
        add contact
      </button>
    </form>
  );
};
