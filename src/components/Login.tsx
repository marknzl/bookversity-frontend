import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AuthService from '../services/AuthService';

import { useHistory } from 'react-router-dom';
import ILoginProps from '../types/Props/ILoginProps';

function Login(props: ILoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMsg, setLoginMsg] = useState("");

    const history = useHistory();

    const onChangeEmail = (e: any) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e: any) => {
        const password = e.target.value;
        setPassword(password);
    };

    const login = (e: any) => {
        e.preventDefault();

        AuthService.login(email, password).then((res) => {
            localStorage.setItem("jwt", res.data.jwtToken);
            localStorage.setItem("userId", res.data.userId);
            props.setLoggedInStatus(true);
            history.push('/');
        },
        (error) => {
            setLoginMsg("Invalid login!")
            console.log(error);
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="card mt-5">
                        <h5 className="card-header">Login</h5>
                        <div className="card-body">
                            <form onSubmit={login} className="mt-3">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={onChangeEmail} type="text" className="form-control" required></input>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={password} onChange={onChangePassword} type="password" className="form-control" required></input>
                                </div>

                                <button type="submit" className="btn btn-success btn-lg btn-block">Login</button>
                                <p className="text-danger mt-3">{loginMsg}</p>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;