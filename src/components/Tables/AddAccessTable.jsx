import React from "react";

import {Button} from 'reactstrap';

// react component for creating dynamic tables
import ReactTable from "react-table";
import SweetAlert from 'react-bootstrap-sweetalert';

class AddAccessTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            acessos: props.dados,
            colums: [
                {
                    Header: 'Nome',
                    accessor: 'nome',
                    sortable: true,
                    filterable: true,
                    minWidth: 400,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }, {
                    Header: 'ID',
                    accessor: 'id',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        height: "50px"
                    }
                }, {
                    Header: 'Casa',
                    accessor: 'casa',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        height: "50px"
                    }
                }, {
                    Header: 'Ação',
                    accessor: 'actions',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        height: "50px"
                    }
                },
            ]
        };
        this.warningAlert = this.warningAlert.bind(this)
    }

    handleEdit = (acesso) => {
        this.props.edit(acesso)
    }

    handleRemove = (acesso) => {
        this.setState({alert: null})
        this.props.remove(acesso)
    }

    componentDidMount() {
        this.setState({acessos: this.props.dados});
    }

    componentDidUpdate(prevProps) {
        if (this.props.dados !== prevProps.dados) {
            this.setState({acessos: this.props.dados});
        }
    }

    warningAlert(acesso) {
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
                    onConfirm={() => this.handleRemove(acesso)}
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
                    data={this.state.acessos.map((acesso, index) => {
                        return ({
                            nome: acesso["user"],
                            id: acesso["cart_id"],
                            casa: acesso["home"],
                            actions: (
                                <div className="actions-center">
                                    <Button
                                        onClick={() => this.handleEdit(acesso)}
                                        color="warning"
                                        size="sm"
                                        className="btn-icon btn-link edit"
                                    >
                                        <i className="fa fa-edit"/>
                                    </Button>{" "}
                                    <Button
                                        onClick={() => this.warningAlert(acesso['cart_id'])}
                                        color="danger"
                                        size="sm"
                                        className="btn-icon btn-link remove"
                                    >
                                        <i className="fa fa-times"/>
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

export default AddAccessTable;
