import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from '../Context/Context';

function Provider({ children }) {
  const [showInput, setShowInput] = useState(false);
  const contextValue = {
    showInput,
    setShowInput,
  };
  return (
    <context.Provider value={ contextValue }>
      { children }
    </context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
