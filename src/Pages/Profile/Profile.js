import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

function Profile({ history }) {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const removeFromLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <>
      <Header history={ history } title="Profile" showSearchButton={ false } />
      <h3 data-testid="profile-email">{ email }</h3>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => removeFromLocalStorage() }
      >
        Logout
      </button>
      <Footer history={ history } />
    </>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
