import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Table, Col, InputGroup, FormControl } from 'react-bootstrap';

import Layout from '../component/Layout';

class Attendance extends Component {
    state = {
        members: [],
        nickname : ''
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ members: res.items }))
            .catch(err => console.log(err));
    }

    callApi = async () => {
        const response = await axios.get('http://young24y.dothome.co.kr/php/attend_list.php?adate=20190923');
        const body = response.data;
        console.log(body);
        return body;
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }

    handleChange = (e) => {
        this.setState({
            nickname: e.target.value,
            //members: this.state.members.filter(data => (data.nickname === e.target.value))
        });
    }

    _getList = () => {
        this.setState({
            members: (this.state.nickname === '') ? this.state.members : this.state.members.filter(data => (data.nickname === this.state.nickname))
        });
    }

    render() {
        return (
            <div>
                <Layout>
                    <Form className='attendance_form' onSubmit={this.handleSubmit}>
                        <Form.Group controlId="nick">
                            <Form.Row>
                                <Col xs={5.5}>
                                    <Form.Control type='date' value={new Date().toISOString().slice(0, 10)} />
                                </Col>
                                <Col>
                                    <InputGroup>
                                        {/* <InputGroup.Prepend>
                                            <InputGroup.Text><i class="fa fa-search"></i></InputGroup.Text>
                                        </InputGroup.Prepend> */}
                                        <Form.Control type="text" placeholder="닉네임" autocomplete="off" 
                                            // ref={(input) => {this.textInput = input}}
                                            value={this.state.nickname} 
                                            onChange={this.handleChange} />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" type="submit">검색</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                    <Table bordered hover size='sm'>
                        <thead>
                            <tr className='text-center'>
                                {/* <th width='50px'>no</th> */}
                                <th>닉네임</th>
                                {/* <th width='100px'>회원구분</th> */}
                                <th width='50px'>출석</th>
                                <th width='50px'>회비</th>
                                <th width='80px'>콕판매</th>
                                <th>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.members.map((member, i) => (
                                <tr className='text-center' key={i}>
                                    {/* <td>{i + 1}</td> */}
                                    <td className='text-left'>{member.nickname}</td>
                                    {/* <td>{member.grade}</td> */}
                                    <td><Button variant={(member.adate) ? 'dark' : 'outline-secondary'} size="sm"><i class='fa fa-user'></i></Button></td>
                                    <td><Button variant={(member.amount > 0) ? 'dark' : 'outline-secondary'} size="sm"><i class='fa fa-krw'></i></Button></td>
                                    <td>
                                        <i class='fa fa-minus'></i>
                                        <span>&nbsp;&nbsp;&nbsp;&nbsp;{member.unit}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                        <i class='fa fa-plus'></i>
                                    </td>
                                    <td className='text-left'></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Layout>
            </div>
        );
    }
}

export default Attendance;