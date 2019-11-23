import React from "react";
import {connect} from "react-redux";
import {Route, Redirect} from "react-router-dom";

const Auth = ({isAuthenticated, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated ?
                <Component {...props} />
                : (
                    <Redirect to="/"/>
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
import React from "react";
import classNames from "classnames";
import taca_logo from "assets/img/smart-room.png"

import {
  NavbarBrand,
  Navbar,
  Container,
} from "reactstrap";

class MainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalSearch: false,
      color: "navbar-transparent"
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateColor);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateColor);
  }

  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: "bg-white"
      });
    } else {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };

  render() {
    return (
      <>
        <Navbar
          className={classNames("navbar-absolute", this.state.color)}
          expand="lg"
        >
          <Container fluid>
            <div className="navbar-wrapper">
              <div
                className={classNames("navbar-toggle d-inline", {
                  toggled: this.props.sidebarOpened
                })}
              >
                <button
                  className="navbar-toggler"
                  type="button"
                  aria-label="Menu"
                  onClick={this.props.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
              <NavbarBrand href="/home">
                {this.props.brandText}
              </NavbarBrand>
            </div>
            <div>
            </div>
              <div className="mx-right ml-auto navbar-nav">
                <h3
                  className="logo-text align-middle"
                >
                  <div className="photo">
                    <img src={taca_logo} className="mr-3" alt="taça UA logo" />
                  </div>
                  Smart Room
                </h3>
              </div>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default MainNavbar;
