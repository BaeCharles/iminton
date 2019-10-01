import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, Row, InputGroup, Image, Card } from 'react-bootstrap';

import * as Api from '../lib/Api';
import Layout from '../component/Layout';

class User extends Component {
    constructor(props) {
        super(props);

        const { member, location } = this.props.location.state;
        this.state = {
            nickname: (member.nickname) ? member.nickname : localStorage.getItem('nickname'),
            filename: '',
            passwd: '',
            rePasswd: '',
            hp: '',
            email: '',
            photo: '',
            validated: false,
            pathname: location.pathname
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
            // console.log(data);
            // console.log(data[0]);

            this.setState({
                photo: data[0].photo,
                hp: data[0].hp,
                email: data[0].email
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

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        
        if (this.state.passwd !== this.state.rePasswd) {
            this.setState({
                passwd: '',
                rePasswd: ''
            });
            alert('입력하신 비밀번호가 서로 다릅니다.');
            return;
        }
        
        this.setState({
            validated: true
        });

        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const params = new FormData();
            params.append('nickname', this.state.nickname);
            params.append('passwd', this.state.passwd);
            params.append('hp', this.state.hp);
            params.append('email', this.state.email);
            params.append('member_cd', '1');

            this.procJoin(params);
        }
    };

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
                                        <Form.Control as="select" style={{width: '120px'}}>
                                            <option value='1'>일회원</option>
                                            <option value='2'>월회원</option>
                                            <option value='3'>년회원</option>
                                            <option value='4'>운영진</option>
                                            <option value='9'>게스트</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                <hr />
                                <Form.Row>
                                    <Col>
                                        <Form.Group controlId="password">
                                            <Form.Label>* 비밀번호</Form.Label>
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text><i className="fa fa-lock"></i></InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control type="password" name="passwd"
                                                    value={this.state.passwd}
                                                    onChange={this.handleChange} />
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
                                                <Form.Control type="password" name="rePasswd"
                                                    value={this.state.rePasswd}
                                                    onChange={this.handleChange} />
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
                                        <Form.Control type="tel" name="hp" pattern="010\d{3,4}\d{4}" placeholder="숫자만 입력" maxLength="11" required
                                            value={this.state.hp}
                                            onChange={this.handleChange} />
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
                                        <Form.Control type="email" name="email"
                                            value={this.state.email}
                                            onChange={this.handleChange} />
                                    </InputGroup>
                                </Form.Group>
                                <div className="text-center">
                                    <Button variant="primary" type="submit">수정</Button>{' '}
                                    <Button variant="secondary" as={Link} to={this.state.pathname}>닫기</Button>
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