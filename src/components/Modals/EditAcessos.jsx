import React from "react";

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';

class EditAcessos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: props.status,
            acesso: props.info,
            nome : "",
            id : "",
            casa : ""
        }
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleData = this.handleData.bind(this);
    }

    componentDidMount() {
        this.setState({
            modal: this.props.status,
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.status !== prevProps.status) {
            this.setState({modal: this.props.status});
        }
        if (this.props.info !== prevProps.info) {
            this.setState({acesso: this.props.info});
            this.handleData()
        }
    }

    handleData() {
        console.log(this.props.info)
        this.setState({
            nome: this.props.info.user,
            id : this.props.info.cart_id,
            casa : this.props.info.home
        });
    }

    handleNome = event => {
        this.setState({nome: event.target.value, emptyNome: false});
    }

    handleLogo = event => {
        this.setState({logo: event.target.value, emptyLogo: false});
    }

    handleAno = event => {
        this.setState({ano: parseInt(event.target.value), emptyAno: false});
    }

    handleTipo = event => {
        this.setState({tipo: event.target.value});
    }

    handleUpdate() {
        if (this.state.nome === "") {
            this.setState({emptyNome: true})
        } else if (this.state.logo === "") {
            this.setState({emptyLogo: true})
        } else if (this.state.ano === "") {
            this.setState({emptyAno: true})
        } else {
            const data = {
                    user : this.state.nome,
                    cart_id : this.state.id
            };
            this.props.handleUpdate(data)
        }
    }

    render() {
        return (
            <>
                <Modal isOpen={this.state.modal} toggle={this.props.handleClose}>
                    <ModalHeader className="justify-content-center" toggle={this.props.handleClose}>
                        Editar acesso
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup>
                                <Label for="nome">Nome</Label>
                                <Input type="text" name="nome" id="nome" placeholder="Nome"
                                       value={this.state.nome} onChange={this.handleNome}/>
                            </FormGroup>
                            <div hidden={!this.state.emptyNome} className="alert-danger mt-2 p-2"
                                 style={{borderRadius: 30}}>
                                Field can't be empty!
                            </div>
                            <FormGroup>
                                <Input type="text" name="logo" id="logo" placeholder="Link do Logo" disabled
                                       value={this.state.casa} onChange={this.handleLogo}/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="ano" id="ano" placeholder="Ano" value={this.state.id} disabled
                                       onChange={this.handleAno}/>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={this.handleUpdate}>
                            Save changes
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default EditAcessos;
