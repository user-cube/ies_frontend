import React from "react";
import axios from "axios";
import {Line, Bar} from "react-chartjs-2";
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
    chartExample3,
} from "../variables/charts.jsx";


import LastGamesTables from "components/Tables/LastAccessTable.jsx";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            co2_labels : [],
            co2_values : [],
            temp_labels : [],
            temp_values : []
        };
    }

    componentDidMount() {

        var token = localStorage.getItem("smartRoom_JWT");

        axios.get('http://deti-engsoft-02.ua.pt:3000/co2/today', { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                var co2 = [];
                co2 = res.data;
                if (co2.length === 0){
                    co2 = []
                }
                let lista_labels = [];
                let lista_values = [];
                co2.forEach(valor => {
                    lista_labels.push(valor["time"].split(".")[0])
                    lista_values.push(valor["co2"])
                })
                this.setState({co2_labels: lista_labels, co2_values: lista_values});
            });

        axios.get('http://deti-engsoft-02.ua.pt:3000/temperature/today', { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                var temp = [];
                temp = res.data;
                if (temp.length === 0){
                    temp = []
                }
                let lista_labels = [];
                let lista_values = [];
                temp.forEach(valor => {
                    lista_labels.push(valor["time"].split(".")[0])
                    lista_values.push(valor["temp"])
                })
                this.setState({temp_labels: lista_labels, temp_values: lista_values});
            });
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
                                        <i className="tim-icons icon-bell-55 text-info"/>{" "}
                                        Temperatura
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <div className="chart-area">
                                            <Line
                                                data={canvas => {
                                                    let ctx = canvas.getContext("2d");

                                                    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                                                    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
                                                    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
                                                    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

                                                    return {
                                                        labels: this.state.temp_labels,
                                                        datasets: [
                                                            {
                                                                label: "Temperatura",
                                                                fill: true,
                                                                backgroundColor: gradientStroke,
                                                                borderColor: "#00d6b4",
                                                                borderWidth: 2,
                                                                borderDash: [],
                                                                borderDashOffset: 0.0,
                                                                pointBackgroundColor: "#00d6b4",
                                                                pointBorderColor: "rgba(255,255,255,0)",
                                                                pointHoverBackgroundColor: "#00d6b4",
                                                                pointBorderWidth: 20,
                                                                pointHoverRadius: 4,
                                                                pointHoverBorderWidth: 15,
                                                                pointRadius: 4,
                                                                data: this.state.temp_values
                                                            }
                                                        ]
                                                    };
                                                }}
                                                options={{
                                                    maintainAspectRatio: false,
                                                    legend: {
                                                        display: false
                                                    },

                                                    tooltips: {
                                                        backgroundColor: "#f5f5f5",
                                                        titleFontColor: "#333",
                                                        bodyFontColor: "#666",
                                                        bodySpacing: 4,
                                                        xPadding: 12,
                                                        mode: "nearest",
                                                        intersect: 0,
                                                        position: "nearest"
                                                    },
                                                    responsive: true,
                                                    scales: {
                                                        yAxes: [
                                                            {
                                                                barPercentage: 1.6,
                                                                gridLines: {
                                                                    drawBorder: false,
                                                                    color: "rgba(29,140,248,0.0)",
                                                                    zeroLineColor: "transparent"
                                                                },

                                                            }
                                                        ],

                                                        xAxes: [
                                                            {
                                                                barPercentage: 1.6,
                                                                gridLines: {
                                                                    drawBorder: false,
                                                                    color: "rgba(0,242,195,0.1)",
                                                                    zeroLineColor: "transparent"
                                                                },

                                                            }
                                                        ]
                                                    }
                                                }}

                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="4">
                            <Card className="card-chart">
                                <CardHeader>
                                    <h5 className="card-category">Quarto de brinquedos</h5>
                                    <CardTitle tag="h3">
                                        <i className="tim-icons icon-delivery-fast text-primary"/>{" "}
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
                                        <i className="tim-icons icon-send text-success"/> Níveis de CO2
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="chart-area">
                                        <Line
                                            data={canvas => {
                                                let ctx = canvas.getContext("2d");

                                                let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

                                                gradientStroke.addColorStop(1, "rgba(66,134,121,0.15)");
                                                gradientStroke.addColorStop(0.4, "rgba(66,134,121,0.0)"); //green colors
                                                gradientStroke.addColorStop(0, "rgba(66,134,121,0)"); //green colors

                                                return {
                                                labels: this.state.co2_labels,
                                                    datasets: [
                                            {
                                                label: "C02",
                                                fill: true,
                                                backgroundColor: gradientStroke,
                                                borderColor: "#00d6b4",
                                                borderWidth: 2,
                                                borderDash: [],
                                                borderDashOffset: 0.0,
                                                pointBackgroundColor: "#00d6b4",
                                                pointBorderColor: "rgba(255,255,255,0)",
                                                pointHoverBackgroundColor: "#00d6b4",
                                                pointBorderWidth: 20,
                                                pointHoverRadius: 4,
                                                pointHoverBorderWidth: 15,
                                                pointRadius: 4,
                                                data: this.state.co2_values
                                            }
                                                ]
                                            };
                                            }}
                                            options={{
                                                maintainAspectRatio: false,
                                                legend: {
                                                display: false
                                            },

                                                tooltips: {
                                                backgroundColor: "#f5f5f5",
                                                titleFontColor: "#333",
                                                bodyFontColor: "#666",
                                                bodySpacing: 4,
                                                xPadding: 12,
                                                mode: "nearest",
                                                intersect: 0,
                                                position: "nearest"
                                            },
                                                responsive: true,
                                                scales: {
                                                yAxes: [
                                            {
                                                barPercentage: 1.6,
                                                gridLines: {
                                                drawBorder: false,
                                                color: "rgba(29,140,248,0.0)",
                                                zeroLineColor: "transparent"
                                            },
                                            }
                                                ],

                                                xAxes: [
                                            {
                                                barPercentage: 1.6,
                                                gridLines: {
                                                drawBorder: false,
                                                color: "rgba(0,242,195,0.1)",
                                                zeroLineColor: "transparent"
                                            },
                                            }
                                                ]
                                            }
                                            }}
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
