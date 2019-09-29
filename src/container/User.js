import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, InputGroup, Image, Card } from 'react-bootstrap';

import * as Api from '../lib/Api';
import Layout from '../component/Layout';

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nickname: localStorage.getItem('nickname'),
            filename: '',
            passwd: '',
            hp: '',
            email: '',
            photo: 'https://placeimg.com/500/300/any'
        }
    }

    componentDidMount() {
        const params = {
            nickname: this.state.nickname
        };
        this.getUser(params);
    }

    async getUser(params) {
        try {
            const { data } = await Api.getUser(params);
            console.log(data);
            console.log(data[0]);
            
            this.setState({
                nickname: data[0].nickname,
                passwd: data[0].passwd,
                photo: data[0].photo
            });
        } catch (e) {
            console.log(e);
        }
    }

    async procUpload(params) {
        try {
            const { data } = await Api.procUpload(params);
            console.log(data);

            if (data.success === true) {
                this.setState({
                    photo: data.url
                });
            } else {
                this.setState({
                    filename: ''
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleChange = (event) => {
        event.preventDefault();

        this.setState({
            filename: ''
        });

        const params = new FormData();
        params.append('nickname', this.state.nickname);
        params.append('photo', event.target.files[0]);
        this.procUpload(params);
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
                            <Form className='member_form' noValidate autoComplete="off"
                                validated={this.state.validated} 
                                onSubmit={this.handleSubmit}>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="photo" className='text-center'>
                                        <Image src={this.state.photo} width="150" height="100" rounded /><br />
                                        {/* <p><Image src="https://placeimg.com/500/300/any" rounded /></p> */}
                                        <label className="fileContainer">
                                            <button>사진선택</button>
                                            <input type="file" name="photo" accept="image/*" 
                                                value={this.state.filename} 
                                                onChange={this.handleChange} />
                                        </label>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="nick">
                                        <br /><h5>{this.state.nickname}</h5>
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
                                        <Form.Control type="text" value={this.state.passwd} readOnly />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group controlId="phone">
                                    <Form.Label required>휴대폰번호</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fa fa-phone"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="tel" pattern="010\d{3,4}\d{4}" placeholder="숫자만 입력" maxLength="11" required
                                            value={this.state.hp} />
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
                                        <Form.Control type="email" name='email' value={this.state.email} />
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