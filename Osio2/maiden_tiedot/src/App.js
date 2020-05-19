import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from './components/CountryList';

const App = () => {
  const [data, setData] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect');
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      console.log('promise fulfilled');
      setData(response.data);
    });
  }, []);

  const handleSearch = (event) => {
    setNewFilter(event.target.value.toLowerCase());
    console.log(newFilter);
  };

  const filter = data.filter((country) => country.name.toLowerCase().includes(newFilter));

  return (
    <div>
      <Filter handleSearch={handleSearch} />
      <CountryList filter={filter} />
    </div>
  );
};

export default App;
