import styles from './ContactList.module.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  deleteContact,
  getContacts,
  getFilter,
} from '../../redux/contactsSlise';
import {
  useGetContactsQuery,
  useDeleteContactMutation,
} from '../../redux/contactsApi';
import { contactsApi } from '../../redux/contactsApi';

export const ContactList = () => {
  // const contacts = useSelector(getContacts);
  // const dispatch = useDispatch();
  // const filterValue = useSelector(getFilter);
  const filterValue = '';
  const { data: contacts, isLoading } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  console.log(contacts);
  console.log(isLoading);
  // const contacts = {};
  const filteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  };
  let renderedData = filterValue === '' ? contacts : filteredContacts();
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
              onClick={event =>
                deleteContact(event.currentTarget.parentNode.id)
              }
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );

  // return contacts.length !== 0 ? renderList : "You have no contacts";
  return isLoading ? <div>loading...</div> : renderList;
};
