import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

// core components
import {
  chartExample2,
  chartExample3,
  chartExample4
} from "../variables/charts.jsx";


import LastGamesTables from "components/Tables/LastAccessTable.jsx";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeTab: 'data1',
        jogosLast: [],
        jogosDoDia: [],
        logos: {},
        game: null,
        loading: true,
        isFirst: true,
        endpoint: "https://taca-ua-nei.com/livescore"
    };
  }

  render() {
    return (
      <>
        <div className="content">
          
          <Row>
            <Col lg="12" md="12">
              <Card className="card-calendar">
                <CardHeader>
                  <h5 className="card-category">Painel de acessos</h5>
                  <CardTitle tag="h3">
                    <i class="far fa-futbol text-primary mr-2"></i>
                    Acessos no quarto de brinquedos
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <LastGamesTables jogosLast={this.state.jogosLast} logos={this.state.logos} />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Quarto de brinquedos</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-bell-55 text-info" />{" "}
                    Temperatura
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Quarto de brinquedos</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                    Acessos ao quarto
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Bar
                      data={chartExample3.data}
                      options={chartExample3.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Quarto de brinquedos</h5>
                  <CardTitle tag="h3">
                    <i className="tim-icons icon-send text-success" /> Níveis de CO2
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <div className="chart-area">
                    <Line
                      data={chartExample4.data}
                      options={chartExample4.options}
                    />
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
