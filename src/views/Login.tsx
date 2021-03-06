import React, { useState, useEffect } from 'react';
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
    const [loginButton, setLoginButton] = useState<JSX.Element>();

    useEffect(() => {
        setLoginButton(<button type="submit" className="btn btn-success btn-lg btn-block">Login</button>);
    }, []);

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

        setLoginButton(<button type="submit" className="btn btn-success btn-lg btn-block" disabled>Logging in...</button>);

        AuthService.login(email, password).then((res) => {
            localStorage.setItem("jwt", res.data.jwtToken);
            localStorage.setItem("userId", res.data.userId);
            props.setLoggedInStatus(true);
            history.push('/');
        },
        (error) => {
            setLoginMsg("Invalid login!");
            setLoginButton(<button type="submit" className="btn btn-success btn-lg btn-block">Login</button>);
            console.log(error);
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <div className="card mt-5 border-dark">
                        <h5 className="card-header bg-dark text-white">Login</h5>
                        <div className="card-body">
                            <form onSubmit={login} className="mt-3">
                                <div className="form-group">
                                    <label>Email</label>
                                    <input value={email} onChange={onChangeEmail} type="email" className="form-control" required></input>
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input value={password} onChange={onChangePassword} type="password" className="form-control" required></input>
                                </div>

                                {loginButton}
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