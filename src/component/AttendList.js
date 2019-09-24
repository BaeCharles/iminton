import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';

import * as Api from '../lib/Api';
import ButtonAct from './ButtonAct';

class AttendList extends Component {
    callApi = async (func) => {
        const params = new FormData();
        params.append('adate', '2019-09-24');
        params.append('nickname', '철수');
        params.append('gubun', '1');

        try {
            const response = await func(params);
            console.log(response.data);
            window.location = '/attendance';
        } catch (e) {
            console.log(e);
        }
    }

    handleClick = (event) => {
        event.preventDefault();
        this.callApi(Api.procAttend);
    }

    render() {
        return (
            <div>
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
                        {this.props.members.map((member, i) => (
                            <tr className='text-center' key={i}>
                                {/* <td>{i + 1}</td> */}
                                <td className='text-left'>{member.nickname}</td>
                                {/* <td>{member.grade}</td> */}
                                <td>
                                    <ButtonAct data={member} gubun={1} />
                                </td>
                                <td><Button variant={(member.amount > 0) ? 'dark' : 'outline-secondary'} size="sm"><i className='fa fa-krw'></i></Button></td>
                                <td>
                                    <i className='fa fa-minus'></i>
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;{member.unit}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <i className='fa fa-plus'></i>
                                </td>
                                <td className='text-left'></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default AttendList;