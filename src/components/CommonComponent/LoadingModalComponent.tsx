import { Spin } from 'antd'

type ILoadingModal = {
    children: JSX.Element,
    isLoading: boolean,
}

const LoadingModalComponent = ({ children, isLoading }: ILoadingModal) => {

    return (
        <>
            <Spin spinning={isLoading} size="default" tip="Loading..." style={{ height: '100vh' }} >
                {children}
            </Spin>

        </>

    )
}

export default LoadingModalComponent