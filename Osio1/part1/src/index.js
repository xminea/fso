/* eslint-disable */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/* const Hello = (props) => {
  const bornYear = () => {
    const yearNow = new Date().getFullYear();
    return yearNow - props.age;
  };
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably boen {bornYear()}</p>
    </div>
  );
};

const App = () => {
  const nimi = 'Pekka';
  const ika = 10;

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10} />
      <Hello name={nimi} age={ika} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
*/

const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);

  return (
    <div>
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>left</button>
        <button onClick={() => setRight(right + 1)}>right</button>
        {right}
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
