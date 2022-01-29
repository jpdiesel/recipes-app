import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';

function Explore({ history }) {
  return (
    <div>
      <Header history={ history } title="Explore" showSearchButton={ false } />
      <Link to="/explore/foods">
        <button type="button" data-testid="explore-foods">Explore Foods</button>
      </Link>
      <Link to="/explore/drinks">
        <button type="button" data-testid="explore-drinks">Explore Drinks</button>
      </Link>
      <Footer history={ history } />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({
  }).isRequired,
};

export default Explore;
