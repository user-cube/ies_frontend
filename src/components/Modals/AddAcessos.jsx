import React from "react";

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import axios from "axios";
import jwt from "jsonwebtoken";

class AddAcessos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: props.status,
            nome: "",
            acessoID : "",
            home : 0,
            componentes: {},
        }
        this.handleSave = this.handleSave.bind(this);
    }

    componentDidMount() {
        var token = localStorage.getItem("smartRoom_JWT");
        var decoded = jwt.verify(token, 'ThisIsSecretForJWTHS512SignatureAlgorithmThatMUSTHave512bitsKeySize');

        this.setState({home : decoded.home})
        this.setState({
            modal: this.props.status,
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.status !== prevProps.status) {
            var token = localStorage.getItem("smartRoom_JWT");

            axios.get('https://iesapi.herokuapp.com/access/unauthorizedAccess', {headers: {"Authorization": `Bearer ${token}`}})
                .then(res => {
                    var acessos= [];
                    acessos = res.data;
                    console.log(acessos)
                    acessos.forEach(valor => {
                        console.log(valor['cart_id'])
                        this.setState({acessoID : valor['cart_id'] })
                    })
                });
            this.setState({modal: this.props.status});
        }
    }

    handleNome = event => {
        this.setState({nome: event.target.value, emptyNome: false});
    }

    handleSave() {
        console.log(this.state.nome)
        if (this.state.nome === "") {
            this.setState({emptyNome: true})
        }  else {
            const data = {
                'cart_id': this.state.acessoID,
                'home': this.state.home,
                'user':this.state.nome
            };
            this.props.handleSave(data)
        }
    }

    render() {
        return (
            <>
                <Modal isOpen={this.state.modal} toggle={this.props.handleClose}>
                    <ModalHeader className="justify-content-center" toggle={this.props.handleClose}>
                        Adicionar acesso
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <FormGroup>
                                <Label for="nome">Nome</Label>
                                <Input type="text" name="nome" id="nome" placeholder="Nome da pessoa"
                                       value={this.state.nome} onChange={this.handleNome}/>
                            </FormGroup>
                            <div hidden={!this.state.emptyNome} className="alert-danger mt-2 p-2"
                                 style={{borderRadius: 30}}>
                                Field can't be empty!
                            </div>
                            <FormGroup>
                                <Input type="text" name="logo" id="logo" placeholder="ID do cartão" disabled hidden value={this.state.acessoID}/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="number" name="ano" id="ano" placeholder="Permissões" value={this.state.home} disabled hidden/>
                            </FormGroup>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button color="primary" onClick={this.handleSave}>
                            Save changes
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default AddAcessos;
