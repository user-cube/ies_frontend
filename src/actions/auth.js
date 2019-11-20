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
    api.user.login(credentials).then(user =>
        {
            localStorage.smartRoom_JWT = jwt.sign({"email":"ruicoelho@ua.pt"},"verysmart", {expiresIn:"1h"})
            //localStorage.taca_uaJWT = user["token"];
            try {
                var decoded = jwt.verify(localStorage.getItem("smartRoom_JWT"), 'verysmart');
                console.log(decoded)
                const user = {
                    email: decoded.email
                }
                dispatch(userLoggedIn(user));
            } catch(err) {
                console.log(err)
            }
        }
    );
    /*{
    localStorage.smartRoom_JWT = jwt.sign({"email":"ruicoelho@ua.pt"},"verysmart", {expiresIn:"1h"})
    //localStorage.taca_uaJWT = user["token"];
    try {
        var decoded = jwt.verify(localStorage.getItem("smartRoom_JWT"), 'verysmart');
        console.log(decoded)
        const user = {
            email: decoded.email
        }
        dispatch(userLoggedIn(user));
    } catch(err) {
        console.log(err)
    }
}*/
export const logout = () => dispatch =>
{
    localStorage.removeItem("smartRoom_JWT");
    dispatch(userLoggedOut())
};