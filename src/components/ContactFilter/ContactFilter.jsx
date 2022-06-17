import styles from './ContactFilter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { filterContact, getFilter } from '../../redux/contactsSlise';

export const ContactFilter = () => {
  const filterValue = useSelector(getFilter);
  const dispatch = useDispatch();
  return (
    <div className={styles.filter}>
      <p className={styles.text}>Find contacts by name</p>
      <input
        onChange={e => dispatch(filterContact(e.currentTarget.value))}
        value={filterValue}
      />
    </div>
  );
};
