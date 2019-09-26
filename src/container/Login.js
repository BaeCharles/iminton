import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';

import * as Api from '../lib/Api';
import Layout from '../component/Layout';

class Login extends Component {
    state = ({
        validated: false,
        nickname: (localStorage.getItem('nickname')) ? localStorage.getItem('nickname') : '',
        passwd: '',
        autoNick: true
    });

    async procLogin(params) {
        try {
            const { data } = await Api.procLogin(params);

            if (data.status === 'success') {
                // 로컬스토리지에 로그인정보 저장
                localStorage.setItem('isLogin', true);
                if (this.state.autoNick) {
                    localStorage.setItem('nickname', this.state.nickname);
                } else {
                    localStorage.removeItem('nickname');
                 }

                this.props.history.push('/');
            } else {
                this.setState({
                    validated: false,
                    nickname: '',
                    passwd: ''
                });
                console.log(data);
                alert('로그인정보가 틀립니다.');
            }
        } catch (e) {
            console.log(e);
        }
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

        this.setState({
            validated: true
        });

        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const params = new FormData();
            params.append('nickname', this.state.nickname);
            params.append('passwd', this.state.passwd);

            this.procLogin(params);
        }
    };

    render() {
        return (
            <div>
                <Layout>
                    <h5>로그인</h5>
                    <Form className='member_form' noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                        <Form.Group controlId="nick">
                            <Form.Label>닉네임</Form.Label>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control type="text" name="nickname" required autoComplete="off"
                                    value={this.state.nickname}
                                    onChange={this.handleChange} />
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
                                <Form.Control type="password" name="passwd" required
                                    value={this.state.passwd}
                                    onChange={this.handleChange} />
                                <Form.Control.Feedback type="invalid">
                                    비밀번호를 입력하세요.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="autoNick">
                            <Form.Check type="checkbox" name="autoNick" label="닉네임 저장"
                                checked={this.state.autoNick}
                                onChange={this.handleChange} />
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