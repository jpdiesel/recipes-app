import PropTypes from 'prop-types';
import React from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';

function Foods({ history }) {
  return (
    <div>
      <Header history={ history } title="Foods" showSearchButton />
      <Footer history={ history } />
    </div>
  );
}

Foods.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Foods;
