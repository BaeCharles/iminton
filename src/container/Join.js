import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col, InputGroup } from 'react-bootstrap';

import * as Api from '../lib/Api';
import Layout from '../component/Layout';

class Join extends Component {
    state = ({
        nickname: '',
        passwd: '',
        rePasswd: '',
        hp: '',
        email: '',
        nickChk: '',
        validated: false
    });

    async procJoin(params) {
        try {
            const { data } = await Api.procJoin(params);

            if (data.status === 'success') {
                // 로컬스토리지에 로그인정보 저장
                alert('회원가입 성공');
                this.props.history.push('/login');
            } else {
                console.log(data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async chkNickname(params) {
        if (!this.state.nickname) {
            alert('닉네임 입력 후 체크 바랍니다.');
            return;
        }

        try {
            const { data } = await Api.chkNickname(params);

            if (data.status === 'success') {
                alert('사용하실 수 있습니다.');
                this.setState({
                    nickChk: true
                });
            } else {
                alert('다른 닉네임을 사용하시기 바랍니다.');
                console.log(data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = (event) => {
        event.preventDefault();

        const params = new FormData();
        params.append('nickname', this.state.nickname);
        this.chkNickname(params);
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
        
        if (!this.state.nickChk && this.state.nickname) {
            alert('닉네임 중복체크를 하시기 바랍니다.');
            return;
        }

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
                    <h5>회원가입</h5>
                    <Form className='member_form' noValidate autoComplete="off"
                        validated={this.state.validated} 
                        onSubmit={this.handleSubmit}>
                        <Form.Group controlId="nick">
                            <Form.Label>* 닉네임</Form.Label>
                            <Form.Row>
                                <Col>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control type="text" name="nickname" required 
                                            value={this.state.nickname}
                                            onChange={this.handleChange} />
                                        <Form.Control.Feedback type="invalid">
                                            닉네임을 입력하세요.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col xs={3}><Button variant="warning" onClick={this.handleClick}>체크</Button></Col>
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
                                        <Form.Control type="password" name="passwd" required
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
                                        <Form.Control type="password" name="rePasswd" required
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