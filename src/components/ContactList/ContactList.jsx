import styles from './ContactList.module.css';
import { useSelector } from 'react-redux';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsApi';
import { getFilter } from '../../redux/contactsSlise';
import React from 'react';

export const ContactList = () => {
  const { data: contacts, isLoading } = useGetContactsQuery();
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();
  const { filter } = useSelector(getFilter);

  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  let renderedData = filter === '' ? contacts : filteredContacts();
  const renderList = (
    <ul className={styles.contactsList}>
      {contacts &&
        renderedData.map(({ name, id, phone }) => (
          <li className={styles.listItem} key={id} id={id}>
            <div className={styles.info}>
              <span className={styles.contactName}>{name}: </span>
              <span className={styles.phoneNumber}>{phone}</span>
            </div>
            <button
              className={styles.buttons}
              onClick={event => {
                deleteContact(event.currentTarget.parentNode.id);
                console.log(event.currentTarget.innerHTML);
                console.log(isDeleting);
                if (!isDeleting) {
                  event.currentTarget.innerHTML = 'Deleting ...';
                }
              }}
            >
              Delete contact
            </button>
          </li>
        ))}
    </ul>
  );

  // return contacts.length !== 0 ? renderList : "You have no contacts";
  return isLoading ? <div>loading...</div> : renderList;
};
