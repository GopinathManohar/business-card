import { Row, Spin } from 'antd'

const LoadingComponent = () => {
    return (
        <Row justify='center' align='middle' style={{ height: '100vh' }} >
            <Spin size="default" tip="Loading..." />
        </Row>
    )
}

export default LoadingComponent