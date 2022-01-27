import PropTypes from 'prop-types';
import React from 'react';
import Footer from '../../Components/Footer';

function Profile({ history }) {
  return (
    <>
      <h1>Profile</h1>
      <Footer history={ history } />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Profile;
