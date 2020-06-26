import React, {Component , useContext} from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NotFound from './containers/NotFound/NotFound'
import Home from './containers/Home/Home';
import Orders from './containers/Orders/Orders';
import Layout from './components/Layout';
import  Login  from './containers/Login/Login';
import  SignUp  from './containers/Login/SignUp';
import { Account, AccountContext } from './components/Accounts';
import UserPool from './components/UserPool';
import { loginRequest } from "./actions";
import { connect } from 'react-redux';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLogger: false,
        }
    }

  

  handleClick(id) {
    // console.log(selectedTab);
    this.props.history.push(`/checkout/${id}`);
    // console.log(this.props);
  }

  componentDidMount() {
    console.log("LOGGERD USER DATA", this.props);
      
      const cognitoUser = UserPool.getCurrentUser();
      let validSession = false;
      if(cognitoUser) {
         cognitoUser.getSession((err, result) => {
            if (!err) {
              validSession = true;
              const authData = {};
              authData.idToken = result.idToken;
              authData.refreshToken = result.refreshToken;
              this.props.loginRequest(authData);
            } 
         });
      }

      this.setState(prevState => ({
        ...prevState,
        userLogger: validSession,
      }));
   

   
  }


    render(){
    var _this = this;
    const {userLogger} = this.state;
    return (
     <BrowserRouter>
     <Account>
        <Layout>
            {
                userLogger ? (
                    
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/login' component={Login} />
                        <Route exact path='/orders' component={Orders} />
                        <Route exact path="*"  component={NotFound} />
                    </Switch>
                ):(
                    <Switch>
                        <Route exact path='/register' component={SignUp} />
                        <Route exact path='*' component={Login} />
                    </Switch>
                )
            }

       </Layout>
      </Account>
    </BrowserRouter> 
    );
  }
}


const mapStateToProps = (reducer) => {
  return reducer;
};

const mapDispatchToProps = {
  loginRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

