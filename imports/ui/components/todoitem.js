import React from 'react';
import PropTypes from 'prop-types';

const ToDoItem = ({item, toggleComplete, removeTodo}) => {
  console.log('TODOITEM')
  return (
    <li>{item.title}
      <input
        type="checkbox"
        id={item._id}
        checked={item.complete}
        onChange={toggleComplete}
      />
      <label htmlFor={item._id}></label>
      <button>
        <i className="fa fa-trash"
            onClick={removeTodo}
        ></i>
      </button>
    </li>
  );
}

ToDoItem.propTypes = {

  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    complete: PropTypes.bool
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired
}

export default ToDoItem;