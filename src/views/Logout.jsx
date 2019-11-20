
import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as actions from "actions/auth.js";

const Logout = ({ isAuthenticated, logout }) => (
    <div>
        {isAuthenticated ? logout() : <h1>Already Logout</h1>}
    </div>
);

Logout.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.email
    };
}
export default connect(mapStateToProps, {logout: actions.logout})(Logout);