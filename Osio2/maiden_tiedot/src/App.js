import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Country from './components/Country';

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

  console.log(data);

  const handleSearch = (event) => {
    setNewFilter(event.target.value.toLowerCase());
    console.log(newFilter);
  };

  const filter = data.filter((country) => country.name.toLowerCase().includes(newFilter));

  const joku = () => {
    if (filter.length < 10 && filter.length > 1) {
      return filter.map((country) => <Country key={country.name} country={country.name} />);
    } else if (filter.length > 10) return <p>too many</p>;
    else {
      return filter.map((country) => <h1>{country.name}</h1>);
    }
  };

  return (
    <div>
      <Filter handleSearch={handleSearch} />
      {joku()}
    </div>
  );
};

export default App;
