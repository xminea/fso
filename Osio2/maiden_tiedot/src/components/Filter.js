import React from 'react';

const Filter = ({ handleSearch }) => {
  return (
    <div>
      find countries <input onChange={handleSearch} />
    </div>
  );
};

export default Filter;
