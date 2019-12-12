import React from "react";

// reactstrap components
import {Card, CardHeader, CardBody, Row, CardTitle} from "reactstrap";
import NotificationAlert from "react-notification-alert";
import {Line} from "react-chartjs-2";
import axios from "axios";

class AnaliseCO2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            co2_labels : [],
            co2_values : []
        };
    }

    componentDidMount() {

        var token = localStorage.getItem("smartRoom_JWT");

        axios.get('https://iesapi.herokuapp.com/co2/average/week', { headers: {"Authorization" : `Bearer ${token}`} })
            .then(res => {
                const co2 = res.data;
                let lista_labels = [];
                let lista_values = [];
                co2.forEach(valor => {
                    if (valor['average'] !== null) {
                        lista_labels.push(valor["period"])
                        lista_values.push(valor["average"])
                    }
                })
                this.setState({co2_labels: lista_labels, co2_values: lista_values});
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
                                    CO2
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <div className="chart-area" style={{height: 500}}>
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
                    </Row>
                </div>
            </>
        );
    }
}

export default AnaliseCO2;
