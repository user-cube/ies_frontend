import React from "react";

// reactstrap components
import {Card, CardHeader, CardBody, Row, Col, Button} from "reactstrap";
import AddAccessTable from "components/Tables/AddAccessTable";
import editCredential from "components/Modals/EditAcessos";
import NotificationAlert from "react-notification-alert";
import axios from "axios";
import AddModalidade from "components/Modals/AddAcessos";
import EditAcessos from "../components/Modals/EditAcessos";
import jwt from "jsonwebtoken";

class Acessos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalAdd: false,
            modalEdit: false,
            acesso: {},
            acessos: [],
            color: "navbar-transparent",
        };
        this.toggleModalEdit = this.toggleModalEdit.bind(this);
        this.toggleModalAdd = this.toggleModalAdd.bind(this);
        this.addCredential = this.addCredential.bind(this);
        this.editCredential = this.editCredential.bind(this);
        this.removeCredential = this.removeCredential.bind(this);
        this.updateCredential = this.updateCredential.bind(this);
        this.notify = this.notify.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        var token = localStorage.getItem("smartRoom_JWT");
        var decoded = jwt.verify(token, 'ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave512bitsKeySize');
        var home = decoded.home
        axios.get('http://deti-engsoft-02.ua.pt:3000/acessos/' + home)
            .then(res => {
                const acessos = res.data;
                console.log(acessos)
                this.setState({acessos});
            });
    }

    notify = (msg) => {
        var type = "warning";
        var options = {};
        options = {
            place: "tc",
            message: (
                <div>
                    <div>
                        {msg}
                    </div>
                </div>
            ),
            type: type,
            icon: "fas fa-bell",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    }

    refresh(tipo, msg) {
        switch (tipo) {
            case "ADD":
                this.toggleModalAdd()
                this.notify("Utilizador adicionado com " + msg)
                this.componentDidMount()
                break
            case "REMOVE":
                this.notify("Modalidade removido com " + msg)
                this.componentDidMount()
                break
            case "EDIT":
                this.toggleModalEdit()
                this.notify("Modalidade atualizado com " + msg)
                this.componentDidMount()
                break
            case "ERROR":
                this.notify("ERROR: Impossível efetuar o pedido")
                this.componentDidMount()
                break
            default:
                this.notify("ERROR")
                break
        }
    }

    toggleModalAdd() {
        this.setState({
            modalAdd: !this.state.modalAdd
        });
    }

    toggleModalEdit() {
        this.setState({
            modalEdit: !this.state.modalEdit
        });
    }

    addCredential(data) {
        var token = localStorage.getItem("smartRoom_JWT");
        axios.post('http://deti-engsoft-02.ua.pt:3000/access/credential', data, {headers: {"Authorization": `Bearer ${token}`}}).then((res) => {
            this.refresh(res.status === 200 ? "ADD" : "ERROR", "sucesso")
        })
    }

    editCredential(modalidade) {
        this.setState({
            modalEdit: !this.state.modalEdit,
            modalidade: modalidade
        });
    }

    removeCredential(modalidade) {
        axios.post('https://taca-ua-nei.com/remove/modalidades/' + localStorage.getItem("taca_uaJWT"), modalidade)
            .then(res => {
                this.refresh(res.status === 200 ? "REMOVE" : "ERROR", res.data['Message'])
            });
    }

    updateCredential(data) {
        axios.post('https://taca-ua-nei.com/update/modalidades/' + localStorage.getItem("taca_uaJWT"), data)
            .then(res => {
                this.refresh(res.status === 200 ? "EDIT" : "ERROR", res.data['Message'])
            });
    }

    render() {
        return (
            <>
                <NotificationAlert ref="notificationAlert"/>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <h3 className="title">
                                                Acessos
                                            </h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="all-icons">
                                    <AddAccessTable dados={this.state.acessos} edit={this.editCredential}
                                                    remove={this.removeCredential}/>
                                    <Button icon round color="primary" onClick={this.toggleModalAdd} size="lg">
                                        <i class="fas fa-2x fa-plus"></i>
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <AddModalidade status={this.state.modalAdd} handleClose={this.toggleModalAdd}
                               handleSave={this.addCredential}/>
                <EditAcessos status={this.state.modalEdit} handleClose={this.toggleModalEdit}
                             handleUpdate={this.updateCredential} info={this.state.acesso}/>
            </>
        );
    }
}

export default Acessos;
