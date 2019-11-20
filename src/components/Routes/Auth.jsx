import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const Auth = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ?
                <Component {...props} />
                : (
                    <Redirect to="/" />
                )
        }
    />
);


function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    };
}
export default connect(mapStateToProps)(Auth);