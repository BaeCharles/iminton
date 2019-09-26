import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, InputGroup, Image, Card } from 'react-bootstrap';

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
                    <Card>
                        <Card.Header>
                            <Row>
                                <Col><b>회원 상세보기</b></Col>
                                <Col className='text-right'><i className="fa fa-close"></i></Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form className='member_form' noValidate validated={this.state.validated} onSubmit={this.handleSubmit} autoComplete="off">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="photo" className='text-center'>
                                        <Image src="https://placeimg.com/150/100/any" rounded /><br />
                                        {/* <p><Image src="https://placeimg.com/500/300/any" rounded /></p> */}
                                        <label className="fileContainer">
                                            <button>사진선택</button>
                                            <input type="file" accept="image/*" />
                                        </label>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="nick">
                                        <br /><h5>철수</h5>
                                        <Form.Control as="select" style={{ width: '120px' }}>
                                            <option>일회원</option>
                                            <option>월회원</option>
                                            <option>일회원</option>
                                            <option>운영진</option>
                                            <option>게스트</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Group controlId="password">
                                    <Form.Label>비밀번호</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fa fa-lock"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" value='' readOnly />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="phone">
                                    <Form.Label required>휴대폰번호</Form.Label>
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
                                    <Button variant="primary" type="submit">수정</Button>{' '}
                                    <Button variant="secondary" as={Link} to="/login">닫기</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Layout>
            </div>
        );
    }
}

export default User;