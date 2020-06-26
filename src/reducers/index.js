const reducer = (state, action) => {
    console.log('STATE:', state);
    console.log('ACTION:', action);
  
    switch (action.type) {
      case 'SET_FAVORITE':
        return {
          ...state,
          myList: [...state.myList, action.payload],
        };
      case 'DELETE_FAVORITE':
        return {
          ...state,
          myList: state.myList.filter(items => items.id !== action.payload),
        };
      case 'LOGIN_REQUEST':
      return {
          ...state,
          user: action.payload
        };
      case 'LOGOUT_REQUEST':
        return {
          ...state,
          user: action.payload,
        };
      case 'REGISTER_REQUEST':
        return {
          ...state,
          user: action.payload,
        };
      case 'GET_VIDEO_SOURCE':
        return {
          ...state,
          playing:
            state.trends.find(item => item.id === Number(action.payload)) ||
            state.originals.find(item => item.id === Number(action.payload)) ||
            [],
        };
      case 'GET_USER':
        return{
          ...state,
          user: action.payload,
        }
      default:
        return state;
    }
  };
  
  export default reducer;
  