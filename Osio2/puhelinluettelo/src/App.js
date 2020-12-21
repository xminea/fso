import React, { useState, useEffect } from 'react';
import Person from './components/Person';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personsService from './services/persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [message, setMessage] = useState({ msg: '', color: '' });

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);
  console.log(persons);
  console.log('render', persons.length, 'persons');

  const addName = (event) => {
    const a = persons.map((i) => i.name);
    event.preventDefault();
    const newObject = {
      name: newName,
      number: newNumber,
    };

    if (a.includes(newName)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((item) => item.name === newName);
        const changedPerson = { ...person, number: newNumber };
        personsService
          .update(person.id, changedPerson)
          .then(() => {
            const temp = persons.filter((item) => item.name !== newName);
            setPersons([...temp, changedPerson]);
            setNewName('');
            setNewNumber('');
            setMessage({
              msg: `Updated name ${newObject.name} `,
              color: 'green',
            });
            setTimeout(() => {
              setMessage({ msg: '', color: '' });
            }, 5000);
            console.log(persons);
          })
          .catch((error) => {
            setMessage({
              msg: `${error.response.data}`,
              color: 'red',
            });
            setTimeout(() => {
              setMessage({ msg: '', color: '' });
            }, 5000);
          });
      }
      console.log(persons.find((item) => item.name === newObject.name));
    } else {
      personsService.create(newObject).then((response) => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
        setMessage({
          msg: `Added name ${newObject.name} `,
          color: 'green',
        });
        setTimeout(() => {
          setMessage({ msg: '', color: '' });
        }, 5000);
      });
    }
    console.log(persons);
  };

  const removeName = (id, deleteName) => {
    if (window.confirm(`Do you really want to remove ${deleteName.name}`))
      personsService.remove(id, deleteName).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage({
          msg: `Removed name ${deleteName.name} `,
          color: 'green',
        });
        setTimeout(() => {
          setMessage({ msg: '', color: '' });
        }, 5000);
      });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const filter = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(newFilter) ||
      person.number.toLowerCase().includes(newFilter)
  );

  console.log(persons);
  const handleSearch = (event) => {
    setNewFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter handleSearch={handleSearch} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {newFilter.length > 0
        ? filter.map((person, i) => (
            <div key={i}>
              <Person key={person.name} person={person} />{' '}
              <button onClick={() => removeName(person.id, person)}>delete</button>{' '}
            </div>
          ))
        : persons.map((person, i) => (
            <div key={i}>
              <Person key={person.name} person={person} />{' '}
              <button onClick={() => removeName(person.id, person)}>delete</button>{' '}
            </div>
          ))}
    </div>
  );
};

export default App;
