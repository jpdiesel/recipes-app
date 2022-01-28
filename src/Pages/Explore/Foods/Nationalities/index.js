import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../../../Components/Header';
import Footer from '../../../../Components/Footer';

function ExFooNationalities({ history }) {
  return (
    <>
      <Footer history={ history } />
      <Header history={ history } title="Explore Nationalities" showSearchButton />
    </>
  );
}

ExFooNationalities.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExFooNationalities;
