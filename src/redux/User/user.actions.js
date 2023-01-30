import userTypes from './user.type';

export const setCurrentUser = payload => {
    return {
        type: userTypes.SET_CURRENT_USER,
        payload
    }
}