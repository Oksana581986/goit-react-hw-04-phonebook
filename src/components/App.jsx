import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'
import { ContactForm } from 'components/contactForm/ContactForm';
import { Filter } from 'components/filter/Filter';
import { ContactList } from 'components/contactList/ContactList';

export const App = () => {
  
    const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);

   const [filter, setFilter] = useState('');
   const [name, setName] = useState('');
   const [number, setNumber] = useState('');

  useEffect(() => {
  loadContactsFromLocalStorage();
  }, []);


  useEffect(() => {
  saveContactsToLocalStorage();
  }, [contacts]);

  const loadContactsFromLocalStorage = () => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }

  const saveContactsToLocalStorage = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();

    const lowerCaseName = name.toLowerCase();

    if (contacts.some((contact) => contact.name.toLowerCase() === lowerCaseName)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };
    setContacts((prevContacts) => [...prevContacts, newContact]);
      setName('');
      setNumber('');
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

      const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

 return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleSubmit} name={name} number={number} onChange={handleChange} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactList contacts={filteredContacts} onDeleteContact={handleDeleteContact} />
      </div>
    );
   }

  
   