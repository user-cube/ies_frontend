import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const NoAuth = ({ isAuthenticated, component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !isAuthenticated ?
                <Component {...props} />
                : (
                    <Redirect to="/auth/home" />
                )
        }
    />
);
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    };
}

NoAuth.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(NoAuth);
