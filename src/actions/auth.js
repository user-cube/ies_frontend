import {USER_LOGGED_IN, USER_LOGGED_OUT} from "types.js";
import api from "api.js";
import jwt from 'jsonwebtoken';

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
});

export const login = credentials => dispatch =>
    api.user.login(credentials).then(token => {
            localStorage.smartRoom_JWT = token;
            try {
                var decoded = jwt.verify(localStorage.getItem("smartRoom_JWT"), 'ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave512bitsKeySize');
                const user = {
                    email: decoded.email
                }
                dispatch(userLoggedIn(user));
            } catch (err) {
                //console.log(err)
            }
        }
    );
export const logout = () => dispatch => {
    localStorage.removeItem("smartRoom_JWT");
    dispatch(userLoggedOut())
};
