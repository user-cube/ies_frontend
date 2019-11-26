import React from "react";

// reactstrap components
import {Card, CardHeader, CardBody, Row, CardTitle} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import {Line} from "react-chartjs-2";
import axios from "axios";

class Temperatura extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp_labels : [],
            temp_values : []
        };
    }

    componentDidMount() {

        var token = localStorage.getItem("smartRoom_JWT");

        axios.get('https://iesapi.herokuapp.com/temperature/averageWeek', { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                const temp = res.data;
                let lista_labels = [];
                let lista_values = [];
                temp.forEach(valor => {
                    if (valor['average'] !== "null") {
                        lista_labels.push(valor["period"])
                        lista_values.push(valor["average"])
                    }
                })
                this.setState({temp_labels: lista_labels, temp_values: lista_values});
            });
    }

    render() {
        return (
            <>
                <NotificationAlert ref="notificationAlert"/>
                <div className="content">
                    <Row>
                        <Card className="card-chart" style={{height: 700}}>
                            <CardHeader>
                                <h5 className="card-category">Quarto de brinquedos</h5>
                                <CardTitle tag="h3">
                                    <i className="tim-icons icon-bell-55 text-info"/>{" "}
                                    Temperatura
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                    <div className="chart-area" style={{height: 500}}>
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
                            </CardBody>
                        </Card>
                    </Row>
                </div>
            </>
        );
    }
}

export default Temperatura;
