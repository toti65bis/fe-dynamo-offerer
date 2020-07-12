import React from 'react';
import {
  Login,
} from 'react-cognito';
import LoginForm from '../containers/Login/LoginForm';


const CognitoLogin = () => (
    <Login>
        <LoginForm />
    </Login>
);

export default CognitoLogin;