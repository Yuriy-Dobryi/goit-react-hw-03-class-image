import { Component } from "react";
import { nanoid } from "nanoid";

import styles from './App.module.css'
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

const DEFAULT_CONTACTS = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Rosie Sompson', number: '145-23-65' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  { id: nanoid(), name: 'Jack Shepart', number: '345-53-81' },
]

const CONTACTS_KEY = 'contacts';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
    defaultContactBtn: false,
  }

  componentDidMount() {
    setTimeout(() => {
      const localContacts = JSON.parse(localStorage.getItem(CONTACTS_KEY));
  
      if (localContacts && localContacts.length > 0) {
        this.setState({ contacts: [...localContacts] });
      } else {
        this.setState({ defaultContactBtn: true });
      }
    }, 500);
  }

  componentDidUpdate(_, prevState) {
    const { contacts, filter } = this.state;
    const isContactsChanged = contacts.length !== prevState.contacts.length;
    const isFilterChanged = prevState.filter !== filter;

    const isContactsEmpty = contacts.length === 0;
    const isFilterFilled = filter !== '';


    if (isContactsChanged) {
      localStorage.setItem(CONTACTS_KEY, JSON.stringify([...contacts]));

      // Якщо контакти були змінені таким чином, що їх більше немає, то поле filter стає пустим (якщо цієї умови не буде, то при додаванні нового контакта/контактів, вони не відмалюються користувачу із-за старого фільтра до тих пір, поки filter не буде змінено)
      if (isContactsEmpty) {
        this.setState({ filter: '' });
      }

      // Якщо контакти в state були змінені, - то в localStorage записуються поточні контакти, а в state кнопки дефолтних контактів теж змінюється значення в залежності від кількості поточних контактів  
      setTimeout(() => {
        this.setState({ defaultContactBtn: isContactsEmpty });
      }, 500);

      // Якщо контакти в state не були змінені, а змінений був саме filter, то провіряємо чи є такий контакт (або контакти), якщо немає - виводимо повідомлення. Якщо умови isFilterFilled не буде, то якщо в state-контактах знаходиться лише один контакт, і в той же час він є відфільтрований, то після видалення буде повідомлення що такого контакту не було знайдено.
    } else if (isFilterChanged && isFilterFilled) {
      const filteredContacts = this.filterContacts();
      this.checkEmptyContacts(filteredContacts.length, 'filter');
    }
  }

  setDefaultContacts = () => {
    setTimeout(() => {
      this.setState({ contacts: [...DEFAULT_CONTACTS], filter: '' });
    }, 500);

    this.setState({ defaultContactBtn: false });
  }

  setFilter = (value) => {
    this.setState({ filter: value });
  };

  filterContacts = () => {
    const { contacts } = this.state;
    const filter = this.state.filter.toLocaleLowerCase();

    return filter
      ? contacts.filter(({ name }) => name.toLocaleLowerCase().includes(filter))
      : contacts
  }
  
  render() {
    const { contacts, filter, defaultContactBtn } = this.state;
    const filteredContacts = this.filterContacts();
    const isContactsEmpty = contacts.length === 0;

    return (
      <div className="container">
        <div className={styles.phonebook}>
          <h1 className={styles.title}>Phonebook</h1>
          <ContactForm
            addContact={this.addContact} />
        </div>

        <div>
          <h2 className={styles.title}>Contacts</h2>
          {isContactsEmpty
            ? defaultContactBtn
              ?
              <>
                <p>There is no contacts</p>
                <button className={styles.btn} onClick={this.setDefaultContacts}>Default Contacts</button>
              </>
              : <p>Loading . . .</p>
            : <Filter
              filter={filter}
              setFilter={this.setFilter} />}
          <ContactList
            contacts={filteredContacts}
            removeContact={this.removeContact} />
        </div>
      </div>
    )
  }
}