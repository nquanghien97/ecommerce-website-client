import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, LOADING, UPDATE_USER, OPEN_SNACK_BAR } from './user.type';
import { loginUser } from '../../api/auth/loginServices';
import { registerUser } from '../../api/auth/registerServices';
import { logOut } from '../../api/auth/logoutServices';

export const loading = () => {
  return {
    type: LOADING
  }
}

export const register = (email, password, fullName) => {
  return async (dispatch) => {
    try {
      dispatch(loading())
      const data = await registerUser(email, password, fullName)
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      })
    } catch(err) {
      const message = err.response?.data?.message;
      dispatch({
        type: REGISTER_FAIL,
        payload: message
      });
    } 
  }
}


export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch(loading())
      const data = await loginUser(email, password)
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (err) {
      const message = err.response?.data?.message;
      dispatch({
        type: LOGIN_FAIL,
        payload: message
      });
    }
  }
};

export const logout = () => (dispatch) => {
  dispatch(loading())
  logOut()

  dispatch({
    type: LOGOUT,
  });
};

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload
  }
}

export function openSnackBar(payload) {
  return {
    type: OPEN_SNACK_BAR,
    payload
  }
}
