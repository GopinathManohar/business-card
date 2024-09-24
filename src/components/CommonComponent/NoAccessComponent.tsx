import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";

const NoAccessComponent = () => {

    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="You Don't Have Permission to Access. Please contact administrator."
            extra={<Button type="primary" onClick={() => navigate('/booking')}>Back Home</Button>}
        />
    )
}

export default NoAccessComponent