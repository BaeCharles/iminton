import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, InputGroup, Table, Col } from 'react-bootstrap';

import Layout from '../component/Layout';

class Daily extends Component {
    constructor(props) {
        super(props);

        this.state = {
            day: new Date().toISOString().slice(0, 10),
            isView: true
        }
    }

    render() {
        return (
            <div>
                <Layout >
                    <h5>일별 회계내역</h5>
                    <Form autoComplete='off'>
                        <Form.Row>
                            <Form.Group as={Col} controlId="day">
                                <Form.Control type='date' name="day" value={this.state.day} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group as={Col} controlId="gubun">
                                <Form.Control as="select" name='gubun' onChange={this.handleChange}>
                                    <option value='0'>전체</option>
                                    <option value='1'>수입</option>
                                    <option value='2'>지출</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <div className={this.state.isView ? '' : 'display-none'}>
                        <h6>[ 수입 ]</h6>
                        <Table hover size='sm'>
                            <tbody>
                                <tr>
                                    <td>
                                        일회비
                                </td>
                                    <td className='text-right'>
                                        5,000 × 20 = 100,000
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        콕판매(어러아아얼)
                                </td>
                                    <td className='text-right'>
                                        16,000 × 2 = 32,0000
                                </td>
                                </tr>
                            </tbody>
                        </Table>
                        <h6 className='text-right'>소계 : 132,000원</h6>
                    </div>
                    <div className={this.state.isView ? '' : 'display-none'}>
                        <h6>[ 지출 ]</h6>
                        <Table hover size='sm'>
                            <tbody>
                                <tr>
                                    <td>
                                        일회비
                                </td>
                                    <td className='text-right'>
                                        5,000 × 20 = 100,000
                                </td>
                                </tr>
                                <tr>
                                    <td>
                                        콕판매(어러아아얼)
                                </td>
                                    <td className='text-right'>
                                        16,000 × 2 = 32,0000
                                </td>
                                </tr>
                            </tbody>
                        </Table>
                        <h6 className='text-right'>소계 : 132,000원</h6>
                    </div>
                    <br />
                    <Table hover size='sm'>
                        <thead>
                            <tr className='text-center'>
                                <th></th>
                                <th>클럽운영비</th>
                                <th>콕관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>이월</td>
                                <td className='text-right'>400,000</td>
                                <td className='text-right'>30</td>
                            </tr>
                            <tr>
                                <td>수입(+)</td>
                                <td className='text-right'>400,000</td>
                                <td className='text-right'>30</td>
                            </tr>
                            <tr>
                                <td>지출(-)</td>
                                <td className='text-right'>400,000</td>
                                <td className='text-right'>30</td>
                            </tr>
                            <tr>
                                <td>전체합계</td>
                                <td className='text-right'>400,000</td>
                                <td className='text-right'>30</td>
                            </tr>
                        </tbody>
                    </Table>
                </Layout>
            </div>
        );
    }
}

export default Daily;