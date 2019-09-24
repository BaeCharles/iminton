import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';

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
                    <Form className='member_form' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="nick">
                            <Form.Label>닉네임</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                                </InputGroup.Prepend>                                
                                <Form.Control type="text" required autoComplete="off" />
                                <Form.Control.Feedback type="invalid">
                                    닉네임을 입력하세요.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>비밀번호</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fa fa-lock"></i></InputGroup.Text>
                                </InputGroup.Prepend>   
                                <Form.Control type="password" required />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 입력하세요.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="autoLogin">
                            <Form.Check type="checkbox" label="자동 로그인" defaultChecked />
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