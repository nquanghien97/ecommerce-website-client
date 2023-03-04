import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOADING, UPDATE_USER, OPEN_SNACK_BAR } from './user.type';

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, isLoading: false, user , message_login: '', message_register: '', openSnackbar: false }
  : { isLoggedIn: false, isLoading: false, user: null, message_login: '', message_register: '', openSnackbar: false };
  
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
        user: action.payload,
        message_register: ''
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        isLoading: false,
        message_register: action.payload
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        isLoading: false,
        message_login: '',
        openSnackbar: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        isLoading: false,
        message_login: action.payload
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
    case UPDATE_USER:
      return {
        user: action.payload
      }
    case OPEN_SNACK_BAR:
      return {
        ...state,
        openSnackbar: action.payload
      }
    default:
      return state;
  }
}

export default userReducer;