import styles from './ContactList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteContact,
  getContacts,
  getFilter,
} from '../../store/contactsSlise';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const filterValue = useSelector(getFilter);

  const removeContact = e => {
    const elemToRemove = e.currentTarget.parentNode.id;
    dispatch(deleteContact(elemToRemove));
  };
  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };
  let renderedData = filterValue === '' ? contacts : filteredContacts();
  const renderList = (
    <ul className={styles.contactsList}>
      {renderedData.map(({ name, id, number }) => (
        <li className={styles.listItem} key={id} id={id}>
          <div className={styles.info}>
            <span className={styles.contactName}>{name}: </span>
            <span className={styles.phoneNumber}>{number}</span>
          </div>
          <button
            className={styles.buttons}
            onClick={event => removeContact(event)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );

  return contacts.length !== 0 ? renderList : 'You have no contacts';
};
