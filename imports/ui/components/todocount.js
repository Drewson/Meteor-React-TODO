import React from 'react';
import PropTypes from 'prop-types';

const ToDoCount = ({numb}) => {
  return (
    <p>{numb} {numb === 1 ? 'todo' : 'todos'}</p>
  );
}

ToDoCount.propTypes = {
  numb: PropTypes.number.isRequired
}

export default ToDoCount;