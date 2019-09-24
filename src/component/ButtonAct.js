import React from 'react';
import { Button } from 'react-bootstrap';

import * as Api from '../lib/Api';

const ButtonAct = (props) => {
    //console.log('props : ' + JSON.stringify(props));
    const handleClick = (event) => {
        event.preventDefault();
        callApi(Api.procAttend);
    }

    const callApi = async (func) => {
        const params = new FormData();
        params.append('adate', props.adate);
        params.append('nickname', props.data.nickname);
        params.append('gubun', props.gubun);

        try {
            const response = await func(params);
            
            if (response.data.status === 'success') {
                props.runFunc();
            } else {
                console.log(response.data);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            {(props.gubun === 1) ? (
                <Button variant={(props.data.adate) ? 'dark' : 'outline-secondary'} size="sm" onClick={handleClick}>
                    <i className='fa fa-user'></i>
                </Button>
            ) : (
                <Button variant={(props.data.amount > 0) ? 'dark' : 'outline-secondary'} size="sm" onClick={handleClick}>
                    <i className='fa fa-krw'></i>
                </Button>
            )}
        </>
    );
};

export default ButtonAct;