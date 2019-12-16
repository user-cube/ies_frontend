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
                            href="http://deti-engsoft-02.ua.pt:5000"
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
