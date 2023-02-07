import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, SET_MESSAGE } from './user.type';
import { loginUser } from '../../api/auth/loginServices';
import { registerUser } from '../../api/auth/registerServices';
import { logOut } from '../../api/auth/logoutServices';

export const register = (username, password, fullName) => (dispatch) => {
  return registerUser(username, password, fullName)
    .then(
      (res) => {
      dispatch({
        type: REGISTER_SUCCESS,
      })

      dispatch({
        type: SET_MESSAGE,
        payload: res.data.message,
      });
      return Promise.resolve();
    },
      (err) => {
        const message = err.response?.data?.message;

        dispatch({
          type: REGISTER_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
        return Promise.reject();
      }
      )
}

export const login = (username, password) => {
  return (dispatch) => {
    return loginUser(username, password).then(
      (data) => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
  
        return Promise.resolve();
      },
      (err) => {
        const message = err.response?.data?.message;
  
        dispatch({
          type: LOGIN_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  }
};

export const logout = () => (dispatch) => {
  logOut()

  dispatch({
    type: LOGOUT,
  });
};