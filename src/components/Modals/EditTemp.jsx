import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';


class EditModalidade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: props.status,
            modalidade: props.info,
            nome: "",
            logo: "",
            componentes: {},
            ano: 0,
            tipo: "Coletiva",
            emptyNome: false,
            emptyLogo: false,
            emptyAno: false,
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
        if(this.props.info !== prevProps.info) {
            this.setState({modalidade: this.props.info});
            this.handleData()
        }
    }
    handleData() {
        this.setState({
          nome: this.props.info.modalidade,
          logo: this.props.info.logo,
          componentes: this.props.info.componentes,
          ano: this.props.info.ano,
          tipo: this.props.info.tipo,        
        });
      }

    handleNome = event => {
        this.setState({ nome : event.target.value, emptyNome: false });
    }

    handleLogo = event => {
        this.setState({ logo : event.target.value, emptyLogo: false });
    }

    handleAno = event => {
        this.setState({ ano : parseInt(event.target.value), emptyAno: false });
    }

    handleTipo = event => {
        this.setState({ tipo : event.target.value });
    }

    handleUpdate() {
        if (this.state.nome===""){
            this.setState({emptyNome: true})
        }
        else if (this.state.logo===""){
            this.setState({emptyLogo: true})
        }
        else if (this.state.ano===""){
            this.setState({emptyAno: true})
        }
        else {
            const data = {data_antiga: this.state.modalidade, data_nova: {modalidade: this.state.nome, logo: this.state.logo, componentes: this.state.componentes, tipo: this.state.tipo, ano: this.state.ano}};
            this.props.handleUpdate(data)
        }
      }

  render() {
    return (
      <>
        <Modal isOpen={this.state.modal} toggle={this.props.handleClose}>
            <ModalHeader className="justify-content-center" toggle={this.props.handleClose}>
                Editar Temperatura
            </ModalHeader>
            <ModalBody>
                <form>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" name="nome" id="nome" placeholder="Nome da Modalidade" value={this.state.nome} onChange={this.handleNome} />
                    </FormGroup>
                    <div hidden={!this.state.emptyNome} className="alert-danger mt-2 p-2" style={{borderRadius: 30}}>
                        Field can't be empty!
                    </div>
                    <FormGroup>
                        <Label for="logo">Valor de Temperatura</Label>
                        <Input type="number" name="logo" id="logo" placeholder="Link do Logo" value={this.state.logo} onChange={this.handleLogo} />
                    </FormGroup>
                    <div hidden={!this.state.emptyLogo} className="alert-danger mt-2 p-2" style={{borderRadius: 30}}>
                        Field can't be empty!
                    </div>
                    <FormGroup>
                        <Label for="ano">Ação</Label>
                        <Input type="number" name="ano" id="ano" placeholder="Ano" value={this.state.ano} onChange={this.handleAno} />
                    </FormGroup>
                    <div hidden={!this.state.emptyAno} className="alert-danger mt-2 p-2" style={{borderRadius: 30}}>
                        Field can't be empty!
                    </div>
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

export default EditModalidade;