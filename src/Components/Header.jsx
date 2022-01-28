import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import context from '../Context/Context';

function Header({ history, title, showSearchButton }) {
  console.log(history);
  const { showInput, setShowInput } = useContext(context);
  const inputVisibility = () => {
    if (showInput) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };
  return (
    <div>
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ Profile }
        >
          <img src={ Profile } alt="a" />
        </button>
      </Link>
      <h1 data-testid="page-title">{ title }</h1>
      {
        showSearchButton
          ? (
            <button
              type="button"
              data-testid="search-top-btn"
              src={ Search }
              onClick={ () => inputVisibility() }
            >
              <img src={ Search } alt="b" />
            </button>
          )
          : (
            null
          )
      }
      {
        showInput && showSearchButton
          ? (
            <input
              type="search"
              data-testid="search-input"
            />
          )
          : (
            null
          )
      }
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
