import React from "react";
import axios from "axios";

import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
} from "reactstrap";

import LastAcessos from "components/Tables/Acessos";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acessos : []
        };
    }

    componentDidMount() {

        var token = localStorage.getItem("smartRoom_JWT");


        axios.get('https://iesapi.herokuapp.com/access/today', {headers: {"Authorization": `Bearer ${token}`}})
            .then(res => {
                var access = [];
                access = res.data;
                if (access.length === 0) {
                    access = []
                }

                this.setState({acessos: access});
            });
    }

    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <h3 className="title">
                                                Análise de acessos
                                            </h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody  className="all-icons">>
                                    <div>
                                        <LastAcessos acessosX={this.state.acessos}/>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>


        );
    }
}

export default Home;
