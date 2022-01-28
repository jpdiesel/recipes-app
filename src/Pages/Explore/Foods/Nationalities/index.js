import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../../Components/Footer';
import Header from '../../../../Components/Header';

function ExFooNationalities({ history }) {
  return (
    <>
      <Header history={ history } title="Explore Nationalities" showSearchButton />
      <Footer history={ history } />
    </>
  );
}

ExFooNationalities.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExFooNationalities;
