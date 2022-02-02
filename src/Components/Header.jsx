import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../Context/Context';
import Profile from '../images/profileIcon.svg';
import Search from '../images/searchIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';

function Header({ history, title, showSearchButton }) {
  const { showInput, setShowInput, searchInput, setSearchInput } = useContext(context);
  const inputVisibility = () => {
    if (showInput) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };
  const headerUp = () => (
    <div className="headerUp">
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
          src={ Profile }
        >
          <img src={ Profile } alt="Perfil" />
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
              <img src={ Search } alt="Procurar" />
            </button>
          )
          : (
            null
          )
      }
    </div>

  );
  return (
    <>
      <header>
        {headerUp()}
        {showInput && showSearchButton
          ? (
            <>
              <br />
              <input
                type="search"
                data-testid="search-input"
                onChange={ ({ target }) => setSearchInput(target.value) }
                value={ searchInput }
              />
            </>
          )
          : (
            null
          )}
      </header>

      {
        showInput && showSearchButton
          ? (
            <SearchBar history={ history } title={ title } searchInput={ searchInput } />
          )
          : (
            null
          )
      }

    </>
  );
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.func,
    pathname: PropTypes.func,
  }),
}.isRequired;

export default Header;
