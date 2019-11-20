import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, Button} from "reactstrap";
import TemperaturaTables from "components/Tables/TemperaturaTable";
import EditTemperatura from "components/Modals/EditTemp";
import NotificationAlert from "react-notification-alert";
import AddTemperatura from "components/Modals/AddTemp";

class Temperatura extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modalAdd: false,
      modalEdit: false,
      Temperatura: [],
      color: "navbar-transparent",
    };
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


  render() {
    return (
      <>
        <NotificationAlert ref="notificationAlert" />
          <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <h3 className="title">
                        Políticas de Temperatura
                      </h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="all-icons">
                    <TemperaturaTables dados={this.state.Temperatura} edit={this.editTemperatura} remove={this.removeTemperatura}/>
                    <Button icon round color="primary" onClick={this.toggleModalAdd} size="lg">
                      <i class="fas fa-2x fa-plus"></i>
                    </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        <AddTemperatura status={this.state.modalAdd} handleClose={this.toggleModalAdd} handleSave={this.saveTemperarura} />
        <EditTemperatura status={this.state.modalEdit} handleClose={this.toggleModalEdit} handleUpdate={this.updateTemperatura} info={this.state.Temperatura} />
      </>
    );
  }
}

export default Temperatura;