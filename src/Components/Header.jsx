import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';

function Header({ history }) {
  useEffect(() => {
    console.log(history);
  }, []);

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src={ Profile } alt="a" />
      </button>
      <h1 data-testid="page-title">a</h1>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src={ Search } alt="b" />
      </button>
    </div>
  );
}

export default Header;

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
    pathname: PropTypes.func,
  }),
}.isRequired;
