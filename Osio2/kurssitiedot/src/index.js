import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  };
  console.log({ course });
  return (
    <div>
      <Course name={course.name} parts={course.parts} />
    </div>
  );
};

const Course = ({ name, parts }) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
const Header = ({ name }) => {
  return (
    <div>
      <h1> {name}</h1>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part part={parts[0]} />
      <Part part={parts[1]} />
      <Part part={parts[2]} />
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name} {part.exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  const count = parts.reduce(function (total, currentValue) {
    return total + currentValue.exercises;
  }, 0);

  return (
    <div>
      <p>
        <strong>Total of exercises {count}</strong>
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
