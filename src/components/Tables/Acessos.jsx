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
                    sortable: true,
                    minWidth: 400,
                    style: {
                        textAlign: "center",
                        height: "50px",
                    }
                }, {
                    Header: 'Responsável',
                    accessor: 'user',
                    sortable: false,
                    filterable: true,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        height: "50px",
                    }
                }, {
                    Header: 'Ação',
                    accessor: 'action',
                    sortable: false,
                    filterable: true,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        height: "50px",
                    }
                }, {
                    Header: 'Fonte',
                    accessor: 'origin',
                    sortable: false,
                    filterable: true,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
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
                    showPaginationTop={true}
                    showPaginationBottom={false}
                    defaultPageSize={10}
                    defaultFilterMethod={this.filterMethod}
                    resizable={false}
                    className="-striped -highlight -pagination"
                />
            </>
        );
    }
}

export default LastAccessTable;
