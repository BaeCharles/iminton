import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';
import Layout from '../component/Layout';

class Join extends Component {
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
                        <Form.Group controlId="Nick">
                            <Form.Label>* 닉네임</Form.Label>
                            <Form.Control type="text" required autocomplete="off" />
                            <Form.Control.Feedback type="invalid">
                                닉네임을 입력하세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="Password">
                                    <Form.Label>* 비밀번호</Form.Label>
                                    <Form.Control type="password" placeholder="4자리 이상" required />
                                    <Form.Control.Feedback type="invalid">
                                        비밀번호를 입력하세요.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col> 
                                <Form.Group controlId="RePassword">
                                    <Form.Label>* 비밀번호 확인</Form.Label>
                                    <Form.Control type="password" placeholder="4자리 이상" required />
                                    <Form.Control.Feedback type="invalid">
                                        입력한 비밀번호를 다시 입력해주세요.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>   
                        </Form.Row>
                        <Form.Group controlId="phone">
                            <Form.Label required>* 휴대폰번호</Form.Label>
                            <Form.Control type="tel" pattern="010\d{3,4}\d{4}" placeholder="숫자만 입력" maxlength="11" required autocomplete="off" />
                            <Form.Control.Feedback type="invalid">
                                휴대폰번호를 입력하세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="Email">
                            <Form.Label>이메일주소</Form.Label>
                            <Form.Control type="email" autocomplete="off" />
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="primary" type="submit">확인</Button>{' '}
                            <Button variant="secondary" as={Link} to="/login">취소</Button>
                        </div>
                    </Form>
                </Layout>
            </div>
        );
    }
}

export default Join;