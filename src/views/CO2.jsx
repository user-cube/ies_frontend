import React from "react";

// reactstrap components
import {Card, CardHeader, CardBody, Row, Col, Button} from "reactstrap";
import ModalidadesTables from "components/Tables/CO2Table";
import EditModalidade from "components/Modals/EditCO2";
import NotificationAlert from "react-notification-alert";
import AddModalidade from "components/Modals/AddCO2";

class Modalidades extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalAdd: false,
            modalEdit: false,
            modalidade: {},
            modalidades: [],
            color: "navbar-transparent",
        };
        this.toggleModalEdit = this.toggleModalEdit.bind(this);
        this.toggleModalAdd = this.toggleModalAdd.bind(this);
        this.saveModalidade = this.saveModalidade.bind(this);
        this.editModalidade = this.editModalidade.bind(this);
        this.removeModalidade = this.removeModalidade.bind(this);
        this.updateModalidade = this.updateModalidade.bind(this);
        this.notify = this.notify.bind(this);
        this.refresh = this.refresh.bind(this);
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
                this.notify("Modalidade adicionado com " + msg)
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
                this.notify("ERROR: " + msg)
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


    editModalidade(modalidade) {
        this.setState({
            modalEdit: !this.state.modalEdit,
            modalidade: modalidade
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
                                                Políticas de CO2
                                            </h3>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody className="all-icons">
                                    <ModalidadesTables dados={this.state.modalidades} edit={this.editModalidade}
                                                       remove={this.removeModalidade}/>
                                    <Button icon round color="primary" onClick={this.toggleModalAdd} size="lg">
                                        <i class="fas fa-2x fa-plus"></i>
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
                <AddModalidade status={this.state.modalAdd} handleClose={this.toggleModalAdd}
                               handleSave={this.saveModalidade}/>
                <EditModalidade status={this.state.modalEdit} handleClose={this.toggleModalEdit}
                                handleUpdate={this.updateModalidade} info={this.state.modalidade}/>
            </>
        );
    }
}

export default Modalidades;
