import React from "react";
import classnames from "classnames";
import {login} from "actions/auth.js";
import {connect} from "react-redux";

// reactstrap components
import {
    Container,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Button
} from "reactstrap";

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    submit = () => {
        const submit = {email: this.state.email,password: this.state.password};
        this.props.login(submit).then(() => this.props.history.push("/auth/home"))
    };

    render() {
        return (
            <>
                <div className="content">
                    <Container>
                        <Col md="6" lg="4" className="ml-auto mr-auto">
                            <form className="form">
                                <Card className="card-login card-white">
                                    <CardHeader>
                                        <CardTitle>
                                            <span className="text-dark">Log In</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody>
                                        <InputGroup className={classnames({
                                            "input-group-focus": this.state.focus
                                        })}>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="fas fa-at"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                required
                                                id="email"
                                                type="email"
                                                placeholder="Email address"
                                                value={this.state.email}
                                                onChange={this.handleChange('email')}
                                                onFocus={e => this.setState({ focus: true })}
                                                onBlur={e => this.setState({ focus: false })}
                                            />
                                        </InputGroup>
                                        <InputGroup className={classnames({
                                            "input-group-focus": this.state.focus
                                        })}>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText><i className="fas fa-key"></i></InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                required
                                                id="password"
                                                type="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={this.handleChange('password')}
                                                onFocus={e => this.setState({ focus: true })}
                                                onBlur={e => this.setState({ focus: false })}
                                            />
                                        </InputGroup>
                                    </CardBody>
                                    <CardFooter>
                                        <Button color="primary" size="lg" onClick={this.submit} onSubmit={this.submit} className="mb-3 btn-block">
                                            Submit
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </form>
                        </Col>
                    </Container>
                </div>
            </>
        );
    }
}

export default connect(null, { login })(Login);
