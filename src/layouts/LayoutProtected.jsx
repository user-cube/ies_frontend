import React, {Suspense} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import {Swipeable} from "react-swipeable";

import Navbar from "components/Navbars/Navbar.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import TopPlugin from "components/TopPlugin/TopPlugin.jsx";

import routes from "routes/routesProtected.jsx";

import logo from "assets/img/smart-room.png";

var ps;

function WaitingComponent(Component) {
    return props => (
        <Suspense fallback={
            <div class="full-page-loader">
                <img width="200" src="smart-room.png" alt="Smart Room"/>
            </div>
        }>
            <Component {...props} />
        </Suspense>
    );
}

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: "orange",
            sidebarOpened:
                document.documentElement.className.indexOf("nav-open") !== -1,
        };
    }


    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
            ps = new PerfectScrollbar(this.refs.mainPanel, {suppressScrollX: true});
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
            document.documentElement.className += " perfect-scrollbar-off";
            document.documentElement.classList.remove("perfect-scrollbar-on");
        }
    }

    componentDidUpdate(e) {
        if (e.history.action === "PUSH") {
            if (navigator.platform.indexOf("Win") > -1) {
                let tables = document.querySelectorAll(".table-responsive");
                for (let i = 0; i < tables.length; i++) {
                    ps = new PerfectScrollbar(tables[i]);
                }
            }
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
    }

    // this function opens and closes the sidebar on small devices
    toggleSidebar = () => {
        document.documentElement.classList.toggle("nav-open");
        this.setState({sidebarOpened: !this.state.sidebarOpened});
    };

    scrollToTop() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainPanel.scrollTop = 0;
    }

    getRoutes = routes => {
        return routes.map((prop, key) => {
            if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key}/>;
            return (
                <Route
                    path={prop.path}
                    component={WaitingComponent(prop.component)}
                    key={key}
                />
            );
        });
    };

    handleBgClick = color => {
        this.setState({backgroundColor: color});
    };

    getBrandText = path => {
        for (let i = 0; i < routes.length; i++) {
            if (
                this.props.location.pathname.indexOf(
                    routes[i].path
                ) !== -1
            ) {
                return routes[i].name;
            }
        }
        return "Brand";
    };

    render() {
        return (
            <>
                <div className="wrapper wrapper-full-page" onScroll={this.handleScroll}>
                    <Sidebar
                        {...this.props}
                        routes={routes}
                        bgColor={this.state.backgroundColor}
                        logo={{
                            innerLink: "/home",
                            text: "Painel de Gestão",
                            imgSrc: logo
                        }}
                        toggleSidebar={this.toggleSidebar}
                    />
                    <div
                        className="main-panel"
                        ref="mainPanel"
                        data={this.state.backgroundColor}
                    >
                        <Swipeable
                            trackMouse
                            preventDefaultTouchmoveEvent
                            onSwipedRight={this.toggleSidebar}
                            style={{
                                position: "fixed",
                                left: 0,
                                width: 30,
                                height: "100%",
                                zIndex: 1031
                            }}
                        >
                            <div
                                onClick={(this.state.sidebarOpened) ? this.toggleSidebar : null}
                                style={{
                                    position: "fixed",
                                    left: 0,
                                    width: 30,
                                    height: "100%",
                                }}
                            >
                            </div>
                        </Swipeable>
                        <Navbar
                            {...this.props}
                            brandText={this.getBrandText(this.props.location.pathname)}
                            toggleSidebar={this.toggleSidebar}
                            sidebarOpened={this.state.sidebarOpened}
                        />
                        <Switch>{this.getRoutes(routes)}</Switch>
                        <Footer fluid/>
                    </div>
                </div>
                <TopPlugin scrollToTop={this.scrollToTop}/>
            </>
        );
    }
}

export default Layout;
