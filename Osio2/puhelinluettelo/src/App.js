import React, { useState } from 'react';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addName = (event) => {
    const a = persons.map((i) => i.name);
    if (a.includes(newName)) window.alert(`${newName} is already added to phonebook`);
    else {
      event.preventDefault();
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }
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

  const handleSearch = (event) => {
    setNewFilter(event.target.value.toLowerCase());
  };

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleSearch} />
      <h3>add a new</h3>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {newFilter.length > 0
        ? filter.map((person) => <Person key={person.name} person={person} />)
        : persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  );
};

export default App;
