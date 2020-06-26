export const setFavorite = payload => ({
    type: 'SET_FAVORITE',
    payload,
  });
  
  export const deleteFavorite = payload => (
   {
    type: 'DELETE_FAVORITE',
    payload,
  });
  
  export const loginRequest = payload => ({
    type: 'LOGIN_REQUEST',
    payload,
  });
  
  export const logoutRequest = payload => ({
    type: 'LOGOUT_REQUEST',
    payload,
  });
  
  export const registerRequest = payload => ({
    type: 'REGISTER_REQUEST',
    payload,
  });
  
  export const getVideoSource = payload => ({
    type: 'GET_VIDEO_SOURCE',
    payload,
  });

  /*export const getUser = payload => ({
    type: 'GET_USER',
    payload,
  });*/

  export const getUser = () => (dispatch, getState) => {

    const { user } = getState().user;
    user.test = "test";
      dispatch({
        type: 'GET_USER',
        payload: user
      });
  }

  /*export const getState = () => ({
    type: 'GET_STATE'
  });*/
  