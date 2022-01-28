import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';

function ExFooNationalities({ history }) {
  return (
    <>
      <h1>ExFooNationalities</h1>
      <Footer history={ history } />
    </>
  );
}

ExFooNationalities.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExFooNationalities;
