import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';

function Foods({ history }) {
  return (
    <>
      <h1>Foods</h1>
      <Footer history={ history } />
    </>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Foods;
