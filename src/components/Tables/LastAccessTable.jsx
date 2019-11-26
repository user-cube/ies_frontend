import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";


class LastAccessTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acessos: props.acessosX,
            colums: [
                {
                    Header: 'Ocorrência',
                    accessor: 'timestamp',
                    sortable: false,
                    minWidth: 130,
                    style: {
                        textAlign: "center",
                        height: "50px",
                    }
                }, {
                    Header: 'Responsável',
                    accessor: 'user',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }, {
                    Header: 'Ação',
                    accessor: 'action',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }, {
                    Header: 'Fonte',
                    accessor: 'origin',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }
            ],
        };
    }

    componentDidMount() {
        this.setState({
            acessos: this.props.acessosX,
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.acessosX !== prevProps.acessosX) {
            this.setState({acessosX: this.props.acessosX});
        }
    }

    render() {
        return (
            <>
                <ReactTable
                    noDataText="Sem Dados"
                    data={this.props.acessosX}
                    columns={this.state.colums}
                    pageSize={(this.state.acessos.length === 0) ? 5 : this.state.acessosX.length + 1}
                    showPaginationTop={false}
                    showPaginationBottom={false}
                    resizable={false}
                    className="-striped -highlight primary-pagination"
                />
            </>
        );
    }
}

export default LastAccessTable;
