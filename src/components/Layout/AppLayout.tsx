import { Col, Image, Layout, Menu, Row, Space, Typography } from 'antd';
import { useState } from 'react';
import { AiFillFile, AiOutlineDeploymentUnit, AiOutlineLogout, AiOutlineSolution } from 'react-icons/ai';
import { FaShippingFast } from 'react-icons/fa';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { TbBrandBooking } from 'react-icons/tb';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import imageUrl from '../../assets/images/ajex_logo.png';
import { useContextHook } from '../../hooks/useContextHook';
import { ILoginState } from '../../model/LoginModel';
import { SessionStorage } from '../../services/storage';
import { useLoginStore } from '../../stores/LoginStore';
import { USER_CUSTOMER_TYPE, USER_ROLES } from '../../utils/common';
import { language } from "../../utils/language";
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

    const mapFunction = ({ path, label, key, icon, hidden = true }: 
        { path: string, label: string, key: string, icon: JSX.Element, hidden: boolean}) => ({
        pathname: path,
        name: label,
        key: key,
        label: path ? <NavLink to={path} key={key} replace>{label}</NavLink> : label,
        icon: icon,
        hidden: hidden
    })
    const items = [
        { label: `${language.en.booking} ${language.ar.booking}`, key: '1', path: '/booking', icon: <TbBrandBooking size={17} /> }, // remember to pass the key prop
        {
            label: `${language.en.report}  ${language.ar.report}`,
            key: '2',
            path: '',
            icon: <HiOutlineDocumentReport size={17} />,
            hidden: false,
            // hidden: ([USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) ?
            //     !([USER_ROLES.ADMIN, USER_ROLES.SUPER_USER
            //     ].includes(customerDetail?.customerRoleId!)) : true),
            children: [
                {
                    label: `${language.en.report}  ${language.ar.report}`,
                    key: '3',
                    path: '/report',
                    icon: <HiOutlineDocumentReport size={17} />,
                    hidden: false
                    // hidden: ([USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) ?
                    //     !([USER_ROLES.ADMIN, USER_ROLES.SUPER_USER
                    //     ].includes(customerDetail?.customerRoleId!)) : true),
                },
                {
                    label: `${language.en.customerReport}  ${language.ar.customerReport}`,
                    key: '4',
                    path: '/customer-report',
                    icon: <AiOutlineSolution size={17}
                    />,
                    hidden: ([USER_CUSTOMER_TYPE.LS_POSS].includes(customerDetail?.customerTypesId!) ?
                        !([USER_ROLES.ADMIN, USER_ROLES.SUPER_USER].includes(customerDetail?.customerRoleId!)) : true),
                },
            ].map(({path, label, key, icon, hidden }) => ({
                pathname: path,
                name: label,
                key: key,
                label: path ? <NavLink to={path} key={key} replace>{label}</NavLink> : label,
                icon: icon,
                hidden: hidden
            }))
        },
        { label: `${language.en.podFiles} ${language.ar.podFiles}`, key: '5', path: '/pod-files', icon: <AiFillFile size={17} /> },
        {
            label: 'Masters',
            key: 9,
            path: '',
            hidden: !([USER_ROLES.ADMIN].includes(customerDetail?.customerRoleId!)),
            icon: <AiOutlineDeploymentUnit size={18} />,
            children: [
                {
                    label: 'Shippers', key: 39, path: '/shippers', icon: <FaShippingFast size={17} />,
                    hidden: !([USER_ROLES.ADMIN].includes(customerDetail?.customerRoleId!))
                }, {
                    label: 'Consignee', key: 37, path: '/consignee', icon: <FaShippingFast size={17} />,
                    hidden: !([USER_ROLES.ADMIN].includes(customerDetail?.customerRoleId!))
                }
            ].map(({path, label, key, icon, hidden }) => ({
                pathname: path,
                name: label,
                key: key,
                label: path ? <NavLink to={path} key={key} replace>{label}</NavLink> : label,
                icon: icon,
                hidden: hidden
            }))
        },
    ].map((item) => {
        return {
            pathname: item?.path,
            name: item?.label,
            key: item?.key,
            label: item?.path ? <NavLink to={item?.path} reloadDocument={false} replace>{item?.label}</NavLink> : item?.label,
            icon: item?.icon,
            children: item?.children,
            hidden: item?.hidden
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
                        <FontSize>{`${language.en.customerPortal} \n ${language.ar.customerPortal} : `}</FontSize>
                    </Space>
                    <Row align={'middle'} style={{ gap: '1rem' }} gutter={{ xs: 24, sm: 20, md: 24, lg: 32 }}>
                        <Col xs={24} sm={20} md={20} lg={24} xxl={24}>
                            <Space align='center' size={10}>
                                <Typography.Title level={5}  >
                                    {`${language.en.welcome} \n ${language.ar.welcome} : `}
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

