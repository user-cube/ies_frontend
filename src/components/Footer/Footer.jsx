import React from "react";

import {Container} from "reactstrap";

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <Container fluid>
                    <div className="copyright">
                        © {new Date().getFullYear()} made by{" "}
                        <a
                            href="https://iesfrontend.herokuapp.com/"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            SmartRoom
                        </a>{" "}
                    </div>
                </Container>
            </footer>
        );
    }
}

export default Footer;
