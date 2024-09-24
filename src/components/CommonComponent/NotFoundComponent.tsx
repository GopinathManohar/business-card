import styled from 'styled-components';
import {Button, Result} from 'antd';
import React from 'react';
import {useNavigate} from "react-router-dom";

const NotFoundComponent = () => {

    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, page  not found."
            extra={<Button type="primary" onClick={() => navigate('/booking')}>Back Home</Button>}
        />
    )
}

export default NotFoundComponent