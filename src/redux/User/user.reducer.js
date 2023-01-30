import userTypes from "./user.type";

const initState = {
    currentUser: null
};

const userReducer = (state=initState, action) => {
    switch(action.type) {
        case userTypes.SET_CURRENT_USER:
            return{
                ...state,
                currentUser: action.payload
            }
        default:
            return state;
    }
}

export default userReducer;