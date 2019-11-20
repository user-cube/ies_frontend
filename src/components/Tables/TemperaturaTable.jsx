import React from "react";

import { Button } from 'reactstrap';

// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from 'react-bootstrap-sweetalert';

class EquipasTables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            equipas: props.dados,
            colums: [
                {
                    Header: 'Nome',
                    accessor: 'team',
                    sortable: true,
                    filterable: true,
                    minWidth: 400,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }, {
                    Header: 'Valor de Temperatura',
                    accessor: 'logo',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        height: "50px"
                    }
                }, {
                    Header: 'Ação',
                    accessor: 'mod',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        height: "50px"
                    }
                },
            ]
        };
        this.warningAlert =this.warningAlert.bind(this)
    }

    handleEdit = (equipa) => {
        this.props.edit(equipa)
    }

    handleRemove = (equipa) => {
        this.setState({alert: null})
        this.props.remove(equipa)
    }

    componentDidMount() {
        this.setState({ equipas: this.props.dados });
    }

    componentDidUpdate(prevProps) {
        if (this.props.dados !== prevProps.dados) {
            this.setState({equipas: this.props.dados});
        }
    }

    warningAlert(equipa){
        this.setState({
            alert: (
                <SweetAlert
                  warning
                  showCancel
                  style={{display: "block"}}
                  confirmBtnText="Yes, delete it!"
                  confirmBtnBsStyle="danger"
                  cancelBtnBsStyle="default"
                  title="Are you sure?"
                  onConfirm={() => this.handleRemove(equipa)}
                  onCancel={() => this.setState({alert: null})}
                >
                  You will not be able to recover!
                </SweetAlert>
            )
        });
      }

    filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
    }

  render() {
    return (
      <>
        <ReactTable
            data={this.state.equipas.map((equipa,index) => {
                return({
                    team: equipa["equipa"],
                    logo: equipa["logo"],
                    mod: equipa["modalidades"].join(", "),
                    nuc: equipa["nucleo"],
                    sige: equipa["siglaE"],
                    sign: equipa["siglaN"],
                    actions: (
                        <div className="actions-center">
                          <Button
                            onClick={() => this.handleEdit(equipa)}
                            color="warning"
                            size="sm"
                            className="btn-icon btn-link edit"
                          >
                            <i className="fa fa-edit" />
                          </Button>{" "}
                          <Button
                            onClick={() => this.warningAlert(equipa)}
                            color="danger"
                            size="sm"
                            className="btn-icon btn-link remove"
                          >
                            <i className="fa fa-times" />
                          </Button>{" "}
                        </div>
                      )
                })
            })}
            noDataText="Sem Dados"
            columns={this.state.colums}
            defaultPageSize={10}
            showPaginationTop={true}
            showPaginationBottom={false}
            defaultFilterMethod={this.filterMethod}
            resizable={false}
            className="-striped -highlight -pagination"
        />
        {this.state.alert}
      </>
    );
  }
}

export default EquipasTables;