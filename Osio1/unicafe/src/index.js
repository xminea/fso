import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const total = good + neutral + bad;
  const average = () => {
    if (total !== 0) {
      return (good - bad) / (good + neutral + bad);
    } else return 0;
  };
  const positive = () => {
    if (total !== 0) return (good / total) * 100;
    else return 0;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}> good </button>
      <button onClick={() => setNeutral(neutral + 1)}> neutral </button>
      <button onClick={() => setBad(bad + 1)}> bad </button>
      <h2>statistics</h2>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average()}
        positive={positive()}
      />
    </div>
  );
};

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) return <p>No feedback given</p>;
  else
    return (
      <div>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {total}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
