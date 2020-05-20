import React, { useState } from 'react';
import Country from './Country';

const CountryList = ({ filter }) => {
  const [selected, setSelected] = useState([]);
  console.log(selected);
  if (selected.length !== 0)
    return selected.map((country, i) => <Country country={country} key={i} />);
  else if (filter.length < 10 && filter.length > 1) {
    return filter.map((country, i) => (
      <p key={i}>
        {country.name} <button onClick={() => setSelected(selected.concat(country))}>show</button>
      </p>
    ));
  } else if (filter.length > 10) return <p>Too many matches, specify another filter</p>;
  else return filter.map((country, i) => <Country country={country} key={i} />);
};

export default CountryList;
