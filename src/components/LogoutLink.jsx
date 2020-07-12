import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LogoutLink = ({ onClick, path, legend }) => (
  <Link to={path} onClick={onClick}>{legend}</Link>
);

LogoutLink.propTypes = {
  onClick: PropTypes.func,
};

export default LogoutLink;
