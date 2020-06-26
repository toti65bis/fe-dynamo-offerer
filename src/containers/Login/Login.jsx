import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { loginRequest } from "../../actions";
import "../../assets/styles/components/Login.scss";
import UserPool from "../../components/UserPool";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";

const Login = props => {
  const [form, setValues] = useState({
    email: ""
  });

  const [password, setPassword] = useState("");

  const user = new CognitoUser ({
      Username: form.email,
      Pool: UserPool
  })

  const authDetails = new AuthenticationDetails ({
        Username: form.email,
        Password: password
  });

  const handleInput = event => {
    setValues({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
 
    event.preventDefault();
    user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log("onSuccess:", data);
          let authData = {}
          authData.idToken = data.idToken;
          authData.refreshToken = data.refreshToken;
          props.loginRequest(authData);
          props.history.push("/orders");  
        },
  
        onFailure: err => {
          console.error("onFailure:", err);
        },
  
        newPasswordRequired: data => {
          console.log("newPasswordRequired:", data);
        }
      });
    
    
  };

  return (
    <>
       <section className="login">
        <section className="login__container">
          <h2>Inicia sesión</h2>
          <form className="login__container--form" onSubmit={handleSubmit}>
            <input
              name="email"
              className="input"
              type="text"
              placeholder="Correo"
              onChange={handleInput}
            />
            <input
              name="password"
              className="input"
              type="password"
              placeholder="Contraseña"
              onChange={event => {setPassword(event.target.value)}}
            />
            <button className="button">Iniciar sesión</button>
            <div className="login__container--remember-me">
              <label>
                <input type="checkbox" id="cbox1" value="first_checkbox" />{" "}
                Recuérdame
              </label>
              <a href="/">Olvidé mi contraseña</a>
            </div>
          </form>
          <p className="login__container--register">
            No tienes ninguna cuenta <Link to="/register">Regístrate</Link>
          </p>
        </section>
      </section>
    </>
  );
};

const mapDispatchToProps = {
  loginRequest
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
