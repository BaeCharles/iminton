import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';

import * as Api from '../lib/Api';
import Layout from '../component/Layout';

class Member extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            nickname: ''
        }
    }

    callApi = async (func) => {
        try {
            const response = await func(null);
            //console.log(response.data);
            this.setState({
                members: response.data.items
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.callApi(Api.getMemberList);
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        const memberArr = this.state.members.filter(member => (member.nickname.indexOf(this.state.nickname) > -1));
        // console.log(memberArr);

        return (
            <div>
                <Layout>
                    <h5>회원 리스트</h5>
                    <Form autoComplete='off'>
                        <Form.Group controlId="nick">
                            <InputGroup>
                                {/* <InputGroup.Prepend>
                                    <Form.Control type='date' name="adate" value={this.state.adate} onChange={this.handleChange} />
                                </InputGroup.Prepend> */}
                                <Form.Control type="text" name="nickname" placeholder="닉네임"
                                    // ref={(input) => {this.textInput = input}}
                                    value={this.state.nickname}
                                    onChange={this.handleChange} />
                                <InputGroup.Append>
                                    <Button variant="secondary" type="submit">검색</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <Table bordered hover striped size='sm'>
                        <thead>
                            <tr className='text-center'>
                                <th>닉네임</th>
                                <th>휴대폰번호</th>
                                <th>구분</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberArr.map((member, i) => (
                                <tr className='text-center' key={i}>
                                    <td className='text-left'>
                                        <Link to='/user'>{member.nickname}</Link>
                                    </td>
                                    <td>
                                        {'01091624598'.replace(/(\d\d\d)(\d\d\d\d)(\d\d\d\d)/, '$1-$2-$3')}
                                    </td>
                                    <td>{member.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Layout>
            </div>
        );
    }
}

export default Member;