import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

function Drinks({ history }) {
  return (
    <>
      <Header history={ history } title="Drinks" showSearchButton />
      <Footer history={ history } />
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Drinks;
