import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Layout from '../component/Layout';

class Login extends Component {
    state = ({
        validated: false
    });

    handleSubmit = (e) => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({
            validated: true
        });
    };

    render() {
        return (
            <div>
                <Layout>
                    <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>닉네임</Form.Label>
                            <Form.Control type="text" required autocomplete="off" />
                            <Form.Control.Feedback type="invalid">
                                닉네임을 입력하세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" required />
                            <Form.Control.Feedback type="invalid">
                                비밀번호를 입력하세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="자동로그인" defaultChecked />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit">로그인</Button>{' '}
                            <Button variant="primary" as={Link} to="/join">회원가입</Button>
                        </div>
                    </Form>
                </Layout>
            </div>
        );
    }
}

export default Login;