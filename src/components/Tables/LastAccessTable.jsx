import React from "react";

// react component for creating dynamic tables
import ReactTable from "react-table";


class LastAccessTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            jogos: props.jogosLast,
            colums: [
                {
                    Header: 'Data',
                    accessor: 'data',
                    sortable: false,
                    minWidth: 130,
                    style: {
                        textAlign: "center",
                        height: "50px",
                    }
                }, {
                    Header: 'Hora',
                    accessor: 'hora',
                    sortable: false,
                    minWidth: 130,
                    style: {
                        textAlign: "center",
                        height: "50px",
                    }
                }, {
                    Header: 'Responsável',
                    accessor: 'team1',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }, {
                    Header: 'Ação',
                    accessor: 'team1',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }, {
                    Header: 'Fonte',
                    accessor: 'team1',
                    sortable: false,
                    minWidth: 200,
                    style: {
                        textAlign: "center",
                        wordBreak: "break-all",
                        height: "50px",
                    }
                }
            ],
            logos: props.logos,
        };
    }

    componentDidMount() {
        this.setState({
            jogos: this.props.jogosLast,
            logos: this.props.logos
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.jogosLast !== prevProps.jogosLast) {
            this.setState({jogos: this.props.jogosLast});
        }
    }

    render() {
        return (
            <>
                <ReactTable
                    noDataText="Sem Dados"
                    columns={this.state.colums}
                    ///pageSize={(this.state.jogos.length === 0) ? 3 : this.state.jogos.length + 1}
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
