import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../Components/Footer';
import Header from '../../../Components/Header';

function ExploreFoods({ history }) {
  return (
    <>
      <Footer history={ history } />
      <Header history={ history } title="Explore Foods" />
    </>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreFoods;
