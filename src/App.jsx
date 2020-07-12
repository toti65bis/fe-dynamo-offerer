import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import {
  PasswordReset
} from 'react-cognito';

import Dashboard from './containers/Dashboard';
import RegisterForm from './containers/Login/SignUp';


const changePassword = () => (
    <div>
      <ChangePasswordForm />
      <Link to="/">Home</Link>
    </div>
);

const updateEmail = () => (
    <div>
      <UpdateEmailForm />
      <Link to="/">Home</Link>
    </div>
);

const passwordReset = () => (
  <PasswordReset>
      <PasswordResetForm/>
    </PasswordReset>
);

const registerForm = () => (
    <div>
      <p>Complete this form</p>
      <RegisterForm />
      <Link to="/">Home</Link>
    </div>
);


class App extends Component {

  render() {
    return (
      <div>
          <Router>
              <Route exact path="/"  component={Dashboard}/>
              <Route exact path="/register" component={RegisterForm}/>
          </Router>
      </div>
    
    );
  }
}



export default App;
