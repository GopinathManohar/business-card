import { Button, Form, Input, Row } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import pac from '../../package.json';
import imageUrl from '../assets/images/ajex_logo.png';
import { useContextHook } from '../hooks/useContextHook';
import { ILogin, ILoginState } from '../model/LoginModel';
import { useLoginStore } from '../stores/LoginStore';
import { FOUR_ZERO_ONE, INVALID_USER_NAME_OR_PASSWORD_ERROR } from "../utils/common";
import { requiredValidation } from '../validation/validation';
import LoadingModalComponent from './CommonComponent/LoadingModalComponent';

const LoginHeader = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative;
height: 100vh;
`

const LoginParent = styled.div`
height: auto;
width: 40%;
border-style: solid;
border-width: 0.1rem;
border-top-color: rgb(249 115 22);
border-top-width: 0.2rem;
min-width: min-content;
max-width: 28rem;
border-radius: 1rem;
background: #FFF;
box-shadow: 1px 5px #c3c1c5;
`;


const Image = styled.div`
margin-top: 1rem;
display: flex;
justify-content: center;
align-items: center;
`

const LongInForm = styled.div`
padding: 1.5rem;
height: 15rem;
`

const LoginFooter = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
`

const ErrorMessage = styled.div`
display: flex;
justify-content: center;
align-items: center;
color: #FF0000;
`
const initialValues: ILogin = { username: '', password: '' };

export const LoginComponent = () => {

    const loginFormRef: React.MutableRefObject<any> = useRef(null)

    const navigate: NavigateFunction = useNavigate();
    const [message, setMessage] = useState('');
    const loginAction = useLoginStore((state: ILoginState) => state?.PostLoginAction)
    const loggedInDetails = useLoginStore((state: ILoginState) => state?.loggedInDetails);

    const { promiseInProgress } = usePromiseTracker({ area: 'login-area' })
    const { setCustomerDetailHandle, customerDetail } = useContextHook();

    const handleSubmit = useCallback((data: ILogin) => {
        trackPromise(loginAction(data), 'login-area')
    }, [loginAction])
    const navigateUrl = useCallback((url: any) => navigate(url), [navigate])

    useEffect(() => {
        if (loggedInDetails && Object?.keys(loggedInDetails)?.length) {
            if (loggedInDetails.status === FOUR_ZERO_ONE) {
                setMessage(INVALID_USER_NAME_OR_PASSWORD_ERROR);
                return;
            }
            setCustomerDetailHandle?.();
        }
    }, [loggedInDetails])

    useEffect(() => {
        if ((loggedInDetails && Object?.keys(loggedInDetails)?.length) && (customerDetail && Object?.keys(customerDetail)?.length)) {
            navigateUrl('/booking');
        }
    }, [customerDetail])

    return (
        <>
            <LoginHeader>
                <LoginParent>
                    <LoadingModalComponent isLoading={promiseInProgress}>
                        <>
                            <Image>
                                <img src={imageUrl} alt='logo' width={100} height={50} />
                            </Image>
                            <LongInForm>
                                <Form
                                    ref={loginFormRef}
                                    initialValues={initialValues}
                                    onFinish={handleSubmit}>
                                    <Form.Item name='username' rules={[{ ...requiredValidation, message: 'Please input your Username' }]}>
                                        <Input autoComplete={'off'} placeholder='Username' />
                                    </Form.Item>
                                    <Form.Item name='password' rules={[{ ...requiredValidation, message: 'Please input your Password' }]}>
                                        <Input.Password visibilityToggle={true} autoComplete={'off'} placeholder='Password' type='password' />
                                    </Form.Item>
                                    <Row justify='center' align='middle' >
                                        <Button block type="primary" htmlType='submit'>Login</Button>
                                    </Row>
                                </Form>
                                <ErrorMessage>
                                    {message}
                                </ErrorMessage>
                            </LongInForm>
                        </>
                    </LoadingModalComponent>
                    <LoginFooter>Version: {pac.version}</LoginFooter>
                </LoginParent>
            </LoginHeader>
        </>
    )
}