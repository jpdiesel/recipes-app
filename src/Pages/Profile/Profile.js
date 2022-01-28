import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

function Profile({ history }) {
  return (
    <>
      <Header history={ history } title="Profile" showSearchButton={ false } />
      <Footer history={ history } />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Profile;
