import React from 'react';
import PropTypes from 'prop-types';

const ClearButton = ({removeCompleted}) => {
  return (
    <button onClick={removeCompleted} >Remove Completed</button>
  );
}

ClearButton.propTypes = {
  removeCompleted: PropTypes.func.isRequired
}

export default ClearButton;