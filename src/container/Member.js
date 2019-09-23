import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Form, Table } from 'react-bootstrap';

import Layout from '../component/Layout';

class Member extends Component {
    state = {
        members: []
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

    render() {
        return (
            <div>
                <Layout>
                    <Table striped bordered hover>
                        <thead>
                            <tr className='text-center'>
                                <th width='50px'>#</th>
                                <th>닉네임</th>
                                <th width='100px'>회원구분</th>
                                <th width='60px'>출석</th>
                                <th width='60px'>회비</th>
                                <th width='120px'>콕판매</th>
                                <th width='100px'>비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.members.map((member, i) => (
                            <tr className='text-center' key={i}>
                                <td>{i + 1}</td>
                                <td className='text-left'>{member.nickname}</td>
                                <td>{member.grade}</td>
                                <td><Button variant="dark" size="sm"><i class='fa fa-user'></i></Button></td>
                                <td><Button variant="outline-secondary" size="sm"><i class='fa fa-krw'></i></Button></td>
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

export default Member;