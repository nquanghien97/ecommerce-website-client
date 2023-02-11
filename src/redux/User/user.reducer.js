import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOADING } from './user.type';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, isLoading: false, user }
  : { isLoggedIn: false, isLoading: false, user: null };
  
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
      };
      case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        isLoading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
      };
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