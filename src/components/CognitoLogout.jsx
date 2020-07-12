import React from 'react';
import {
  Logout,
} from 'react-cognito';
import LoginForm from '../containers/Login/LoginForm';
import LogoutLink from './LogoutLink';
import PropTypes from 'prop-types';

const CognitoLogout = ({onClick, path, legend}) => (
    <Logout>
        <LogoutLink onClick={onClick} path={path}  legend={legend}/>
    </Logout>
);

CognitoLogout.propTypes = {
   onClick: PropTypes.func,
};

export default CognitoLogout;