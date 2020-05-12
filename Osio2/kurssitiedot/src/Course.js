import React from 'react';

const Course = ({ allCourses }) => {
  return (
    <div>
      <h1>Header</h1>
      {allCourses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  );
};
const Header = ({ name }) => {
  return (
    <div>
      <h2> {name}</h2>
    </div>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <div key={part.id}>
          <Part part={part} />
        </div>
      ))}
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

export default Course;
