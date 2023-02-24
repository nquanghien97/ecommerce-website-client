import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOADING, SET_MESSAGE } from './user.type';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, isLoading: false, user , message: ''}
  : { isLoggedIn: false, isLoading: false, user: null, message: '' };
  
const userReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isLoading: false,
        user: action.payload.user,
        message: ''
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        message: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isLoading: false,
        message: ''
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
        message: action.payload
      };
    // case SET_MESSAGE:
    //   return {
    //     ...state,
    //     message: action.payload
    //   }
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
      };
    
    default:
      return state;
  }
}

export default userReducer;