import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, InputGroup } from 'react-bootstrap';

import * as Api from '../lib/Api';
import Layout from '../component/Layout';
import AttendList from '../component/AttendList';

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

    render() {
        const memberArr = this.state.members.filter(member => (member.nickname.indexOf(this.state.nickname) > -1));
        // console.log(memberArr);

        return (
            <div>
                <Layout>
                    <Form className='attendance_form' onSubmit={this.handleSubmit} autoComplete='off'>
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
                                    <Button variant="outline-secondary" type="submit">검색</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                    <AttendList members={memberArr} />
                </Layout>
            </div>
        );
    }
}

export default Attendance;