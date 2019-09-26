import React from 'react';

import * as Api from '../lib/Api';

const Shuttlecock = (props) => {
    const handleClick1 = (event) => {
        event.preventDefault();
        callApi(Api.procAttend, 3);
    }

    const handleClick2 = (event) => {
        event.preventDefault();
        callApi(Api.procAttend, 4);
    }

    const callApi = async (func, gubun) => {
        const params = new FormData();
        params.append('adate', props.adate);
        params.append('nickname', props.data.nickname);
        params.append('gubun', gubun);

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
            <button type='button' onClick={handleClick1}><i className='fa fa-minus' onClick={handleClick1}></i></button>
            <span>&nbsp;&nbsp;{props.data.unit}&nbsp;&nbsp;</span>
            <button type='button' onClick={handleClick2}><i className='fa fa-plus' onClick={handleClick2}></i></button>
        </>
    );
};

export default Shuttlecock;