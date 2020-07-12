import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link , Redirect} from 'react-router-dom';
import classNames from 'classnames';
import gravatar from '../utils/gravatar';
import { logoutRequest, getUser, getState } from '../actions';
//import * as myActions from '../actions';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/dynamo_logo_5.PNG';
import userIcon from '../assets/static/user-icon.png';
import { connect } from 'react-redux';
import { AccountContext } from './Accounts';
import {
  CognitoState,
  Logout,
  Login,
  NewPasswordRequired,
  EmailVerification,
  Confirm,
} from 'react-cognito';
import LogoutLink from './LogoutLink';
import { Auth } from 'aws-amplify';

const Header = (props) => {
  const { cognito, state, user, attributes, isLogin, isRegister} = props;

  console.log("[i] COGNITO: ", props);
  
  



  


  return (
    
    <header className={headerClass}>
   
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {(user) ? (
            <img src={gravatar((user) ? attributes.email:'')} alt={(user) ? attributes.nickname:''} />
          ) : (
            <img src={userIcon} alt='' />
          )}
          <p>{(user) ? attributes.nickname:''}</p>
        </div>
        <ul>
          {(user) ? (
            <li>
              <a href='/'>{(user) ? attributes.name:''}</a>
            </li>
          ) : null}
          {(user) ? (
            <li>
              <Logout>
                    <LogoutLink path={'/login'} legend={'Cerrar Sesion'} />
              </Logout> 
            </li>
          ) : (
            <li>
              <Link to='/login'>Iniciar sesión</Link>
            </li>
          )}
        </ul>
      </div> 
    </header>
  );


};

Header.propTypes = {
  user: PropTypes.object,
  attributes: PropTypes.object,
  state: PropTypes.string,
};

const mapStateToProps = state => ({
  state: state.cognito.state,
  user: state.cognito.user,
  attributes: state.cognito.attributes,
  cognito: state
});

export default connect(mapStateToProps, null)(Header);
/*
const BaseHeader = ({ state, user, attributes }) => {
  switch (state) {
    //case CognitoState.LOGGED_IN:
      //return loggedInPage(user, attributes);
    case CognitoState.AUTHENTICATED:
    case CognitoState.LOGGING_IN:
      return (
        <div>
          <img src="ajax-loader.gif" alt="" />
        </div>
        )
    case CognitoState.LOGGED_IN:    
    case CognitoState.LOGGED_OUT:
    case CognitoState.LOGIN_FAILURE:
      
    case CognitoState.MFA_REQUIRED:
      return mfaPage();
    case CognitoState.NEW_PASSWORD_REQUIRED:
      return newPasswordPage();
    case CognitoState.EMAIL_VERIFICATION_REQUIRED:
      return emailVerificationPage();
    case CognitoState.CONFIRMATION_REQUIRED:
      return confirmForm();
  /
    default:
      return (
        <div>
          <p>Unrecognised cognito state</p>
        </div>
      );
  }
};
*/





