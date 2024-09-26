import { Col, Image, Layout, Menu, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { TbDashboard, TbCards } from 'react-icons/tb';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import imageUrl from '../../assets/images/ajex_logo.png';
import { useContextHook } from '../../hooks/useContextHook';
import { ILoginState } from '../../model/LoginModel';
import { SessionStorage } from '../../services/storage';
import { useLoginStore } from '../../stores/LoginStore';
import FooterComponent from './FooterComponent';

const { Header, Content, Sider } = Layout;

const ImageDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 0.2rem;
    padding:0.5rem;
`
const FontSize = styled.h1`
    font-size: 2rem;
    padding-left: 1rem;
`

const SignOutComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const ClearLoginStore = useLoginStore((state: ILoginState) => state?.ClearLoginStore);
    const onSignOut = () => {
        ClearLoginStore();
        SessionStorage.clear();
        navigate('/', { replace: true, state: { from: location } });
    }
    return (
        <Space align='end'>
            <AiOutlineLogout onClick={onSignOut} size={17} title='Sign Out' className='cursor-pointer' />
        </Space>
        // <Button type="default" title='Sign Out' icon={} onClick={onSignOut} />
    )
}
const AppLayout = () => {

    const [collapsed, setCollapsed] = useState(true);

    const location = useLocation();

    const { customerDetail } = useContextHook();


    const items = [
        { label: `Dashboard`, key: '1', path: '/dashboard', icon: <TbDashboard size={17} /> }, // remember to pass the key prop
        { label: `Create Cards`, key: '2', path: '/create-card', icon: <TbCards size={17} /> }, // remember to pass the key prop

    ].map((item) => {
        return {
            pathname: item?.path,
            name: item?.label,
            key: item?.key,
            label: item?.path ? <NavLink to={item?.path} reloadDocument={false} replace>{item?.label}</NavLink> : item?.label,
            icon: item?.icon
        };
    });



    const getCurrentIndex = () => {
        return (items.findIndex(item => item?.pathname === location?.pathname) + 1).toString()
    }


    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)} theme={'light'}>
                <ImageDiv>
                    <Image
                        preview={false}
                        alt='ajex_logo'
                        width={100}
                        src={imageUrl}
                    />
                </ImageDiv>
                <Menu defaultSelectedKeys={[getCurrentIndex()]} mode="inline" theme={'light'} items={items}>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{
                    width: '100%',
                    padding: 0,
                    backgroundColor: '#F6F5F7',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingRight: '3rem',
                }} >
                    <Space align='start'>
                        <FontSize>{`Ajex Business Cards`}</FontSize>
                    </Space>
                    <Row align={'middle'} style={{ gap: '1rem' }} gutter={{ xs: 24, sm: 20, md: 24, lg: 32 }}>
                        <Col xs={24} sm={20} md={20} lg={24} xxl={24}>
                            <Space align='center' size={10}>
                                <Typography.Title level={5}  >
                                    {`Welcome : `}
                                    {customerDetail?.subClientName}
                                </Typography.Title>
                                <SignOutComponent />
                            </Space>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ padding: '1rem', backgroundColor: '#F6F5F7' }}>
                    <Outlet />
                </Content>
                <FooterComponent />
            </Layout>
        </Layout >
    );
}

export default AppLayout

