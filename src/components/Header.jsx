import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link , Redirect} from 'react-router-dom';
import classNames from 'classnames';
import gravatar from '../utils/gravatar';
import { logoutRequest, getUser, getState } from '../actions';
//import * as myActions from '../actions';
import '../assets/styles/components/Header.scss';
import logo from '../assets/static/dynamo_logo_5.PNG';
import userIcon from '../assets/static/user-icon.png';
import { AccountContext } from './Accounts';


const Header = (props) => {
  const { user, isLogin, isRegister } = props;

  console.log("[i] REDUX: ", user);
  console.log("[i] props: ", props);

  const hasUser = Object.keys(user).length > 0;

  const [nickName, setNickName] = useState((user.idToken) ? user.idToken.payload.nickname:'');
  const [email, setEmail] = useState( (user.idToken) ? user.idToken.payload.email:'');
  const [status, setStatus] = useState((user.idToken) ? true : false);
  const { getSession, logout } = useContext(AccountContext);

  
  const handleLogout = () => {
    props.logoutRequest({})
    logout()
  };
  const headerClass = classNames('header', {
    isLogin,
    isRegister,
  });

  
  return (
    <header className={headerClass}>
      <Link to='/'>
        <img className='header__img' src={logo} alt='Platzi Video' />
      </Link>
      <div className='header__menu'>
        <div className='header__menu--profile'>
          {(user.idToken) ? (
            <img src={gravatar((user.idToken) ? user.idToken.payload.email:'')} alt={(user.idToken) ? user.idToken.payload.nickname:''} />
          ) : (
            <img src={userIcon} alt='' />
          )}
          <p>{(user.idToken) ? user.idToken.payload.nickname:''}</p>
        </div>
        <ul>
          {(user.idToken) ? (
            <li>
              <a href='/'>{(user.idToken) ? user.idToken.payload.name:''}</a>
            </li>
          ) : null}
          {(user.idToken) ? (
            <li>
              <Link to='/login' onClick={handleLogout}>Cerrar Sesion</Link>
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

const mapStateToProps = (reducer) => {
  return reducer;
};

const mapDispatchToProps = {
  logoutRequest,
  getUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);