import React from 'react';

const Notification = ({ message }) => {
  if (message.msg === '') {
    return null;
  }

  const notificationStyle = {
    color: message.color,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={notificationStyle}>{message.msg}</div>;
};

export default Notification;
