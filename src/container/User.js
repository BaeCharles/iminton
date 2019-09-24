import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';

import Layout from '../component/Layout';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Layout>
                    <h3>회원 상세보기</h3>
                    <Form className='member_form' noValidate validated={this.state.validated} onSubmit={this.handleSubmit} autoComplete="off">
                        <Form.Group controlId="nick">
                            <Form.Label>* 닉네임</Form.Label>
                            <Form.Row>
                                <Col>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" required />
                                        <Form.Control.Feedback type="invalid">
                                            닉네임을 입력하세요.
                                    </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col xs={3}><Button variant="warning">중복체크</Button></Col>
                            </Form.Row>
                        </Form.Group>
                        <Form.Row>
                            <Col>
                                <Form.Group controlId="password">
                                    <Form.Label>* 비밀번호</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fa fa-lock"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" placeholder="4자리 이상" required />
                                        <Form.Control.Feedback type="invalid">
                                            비밀번호를 입력하세요.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group controlId="rePassword">
                                    <Form.Label>* 비밀번호 확인</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fa fa-lock"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" placeholder="4자리 이상" required />
                                        <Form.Control.Feedback type="invalid">
                                            입력한 비밀번호를 다시 입력해주세요.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="phone">
                            <Form.Label required>* 휴대폰번호</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fa fa-phone"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="tel" pattern="010\d{3,4}\d{4}" placeholder="숫자만 입력" maxLength="11" required />
                                <Form.Control.Feedback type="invalid">
                                    휴대폰번호를 입력하세요(010~).
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>이메일주소</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fa fa-at"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="email" />
                            </InputGroup>
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

export default User;