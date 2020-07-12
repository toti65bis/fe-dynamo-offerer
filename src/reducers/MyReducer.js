import { MapsSatellite } from "material-ui/svg-icons";
import {CognitoState} from 'react-cognito';


const reducer = (state, action) => {
    console.log('STATE:', state);
    console.log('ACTION:', action);
    
  
    switch (action.type) {
      case 'COGNITO_AUTHENTICATED':
        return {
          ...state,
          state: CognitoState.LOGGED_IN
        };
      case 'COGNITO_CLEAR_CACHE':
          return {
            ...state,
            state: CognitoState.LOGGED_IN
          };  
      case 'COGNITO_LOGGING_IN':
            return {
              ...state,
              state: CognitoState.LOGGED_IN
            };      
      case 'COGNITO_LOGIN':
              return {
                ...state,
                state: CognitoState.LOGGED_IN
              };       
      case 'LOGIN_REQUEST':
      return {
          ...state,
          state: action.payload
        };
      case 'LOGOUT_REQUEST':
        console.log("REDUX",state,action);
        return {
          ...state,
          state: action.payload,
        };
      case 'GET_STATE':
        return {
          ...state
        }
      default:
        return {state: CognitoState.LOGGED_OUT};
    }
  };
  
  export default reducer;
  