import React from 'react';
import Country from './Country';

const CountryList = ({ filter }) => {
  if (filter.length < 10 && filter.length > 1) {
    return filter.map((country) => <Country key={country.name} country={country} />);
  } else if (filter.length > 10) return <p>too many</p>;
  else {
    return filter.map((country, i) => (
      <div key={i}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((lan, i) => (
            <li key={i}>{lan.name} </li>
          ))}
        </ul>
        <img src={country.flag} alt={country.name} height="100" />
      </div>
    ));
  }
};

export default CountryList;
