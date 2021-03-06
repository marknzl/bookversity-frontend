import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthService from '../services/AuthService';

import { useHistory } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [button, setButton] = useState<JSX.Element>(<button type="submit" className="btn btn-success btn-lg btn-block">Register</button>);

    const [message, setMessage] = useState<JSX.Element>();

    let history = useHistory();

    const onChangeEmail = (e: any) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeFirstName = (e: any) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };

    const onChangeLastName = (e: any) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };

    const register = (e: any) => {
        e.preventDefault();
        setMessage(undefined);
        setButton(<button type="submit" className="btn btn-success btn-lg btn-block" disabled>Registering...</button>)
        AuthService.register(email, firstName, lastName, password).then(() => {
            history.push('/login');
        },
        (error) => {
            setMessage(<p className="text-danger mt-3">Failed to register!</p>);
            setButton(<button type="submit" className="btn btn-success btn-lg btn-block">Register</button>);
        });
    };

    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="card mt-5 border-dark">
                            <h5 className="card-header bg-dark text-white">Register</h5>
                            <div className="card-body">
                                <form onSubmit={register} className="mt-3">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={onChangeEmail} type="email" className="form-control" required></input>
                                    </div>

                                    <div className="form-group">
                                        <label>Password (Min 5 chars)</label>
                                        <input value={password} onChange={onChangePassword} type="password" minLength={5} className="form-control" required></input>
                                    </div>

                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input value={firstName} onChange={onChangeFirstName} type="text" className="form-control" required></input>
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input value={lastName} onChange={onChangeLastName} type="text" className="form-control" required></input>
                                    </div>

                                    {button}
                                    {message}
                                    <p className="text-danger mt-3"></p>
                                </form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;