import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../../Components/Footer';

function ExploreFoods({ history }) {
  return (
    <>
      <h1>ExploreFoods</h1>
      <Footer history={ history } />
    </>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default ExploreFoods;
