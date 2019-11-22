import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch } from "react-router-dom";
import * as serviceWorker from 'serviceWorker';
import { createStore, applyMiddleware} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import jwt from 'jsonwebtoken';
import {userLoggedIn} from "actions/auth.js";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "rootReducer";
import routes from "routes/routes_index";
import routesProtected from "routes/routesProtected_index";
import Auth from "components/Routes/Auth"
import NoAuth from "components/Routes/NoAuth"

import "assets/css/smart-room.css";

var token = localStorage.getItem("smartRoom_JWT");

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

if (token != null) {
    try {
        var decoded = jwt.verify(token, 'ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave512bitsKeySize');
        console.log(decoded)
        const user = {
            email: decoded.email
        }
        store.dispatch(userLoggedIn(user));
    } catch (err) {
        console.log(err)
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                {
                    routesProtected.map(
                        (prop,key) => {
                            return (
                                <Auth path={prop.path} component={prop.component} key={key}/>
                            )
                        }
                    )
                }
                {
                    routes.map(
                        (prop,key) => {
                            return (
                                <NoAuth path={prop.path} component={prop.component} key={key}/>
                            )
                        }
                    )
                }
            </Switch>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
