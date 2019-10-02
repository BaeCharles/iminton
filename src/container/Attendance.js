import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, InputGroup, Table } from 'react-bootstrap';

import * as Api from '../lib/Api';
import Layout from '../component/Layout';
import ButtonAct from '../component/ButtonAct';
import Shuttlecock from '../component/Shuttlecock';

class Attendance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            adate: new Date().toISOString().slice(0, 10),
            nickname: ''
        }
    }

    callApi = async (func) => {
        const params = {
            adate: this.state.adate,
        };

        try {
            const response = await func(params);
            //console.log(response.data);
            this.setState({
                members: response.data.items
            });
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        this.callApi(Api.getAttendList);
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
        this.callApi(Api.getAttendList);
    }

    outputEvent = () => {
        this.callApi(Api.getAttendList);
    }

    render() {
        const memberArr = this.state.members.filter(member => (member.nickname.indexOf(this.state.nickname) > -1));
        // console.log(memberArr);

        return (
            <div>
                <Layout>
                    <h5>출석부</h5>
                    <Form onSubmit={this.handleSubmit} autoComplete='off'>
                        <Form.Group controlId="nick">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Form.Control type='date' name="adate" value={this.state.adate} onChange={this.handleChange} />
                                </InputGroup.Prepend>
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
                            {memberArr.map((member, i) => (
                                <tr className='text-center' key={i}>
                                    {/* <td>{i + 1}</td> */}
                                    <td className='text-left'>
                                        <Link to={{
                                            pathname: '/user',
                                            state: {
                                                nickname: member.nickname,
                                                pathname: this.props.location.pathname
                                            }
                                        }}>{member.nickname}</Link>
                                    </td>
                                    {/* <td>{member.grade}</td> */}
                                    <td>
                                        <ButtonAct 
                                            data={member} 
                                            gubun={1} 
                                            adate={this.state.adate}
                                            runFunc={this.outputEvent} />
                                    </td>
                                    <td>
                                        <ButtonAct 
                                            data={member} 
                                            gubun={2} 
                                            adate={this.state.adate}
                                            runFunc={this.outputEvent} />
                                        </td>
                                    <td>
                                        <Shuttlecock 
                                            data={member}
                                            adate={this.state.adate}
                                            runFunc={this.outputEvent} />
                                    </td>
                                    <td className='text-center'><i className="fa fa-comment-o" title='작성하기'></i></td>
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