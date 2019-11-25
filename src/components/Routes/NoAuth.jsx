import React from "react";
import {Route} from "react-router-dom";

const NoAuth = ({component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            <Component {...props} />
        }
    />
);

export default NoAuth;
