
import vCard from 'vcf';
import { useState } from 'react';
import { Card, Button, Row, Col, Divider } from 'antd';
import './PreviewCard.css';
import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";
import { AiOutlinePhone, AiOutlineMail, AiOutlineGlobal, AiFillLinkedin } from "react-icons/ai";
import { ImMobile } from "react-icons/im";
import { MdOutlineDownload } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';
import { formatPhoneNumber } from '../../common/common';
import ajexLogo from '../../assets/images/ajex-logo.png';
import defaultDp from '../../assets/images/default-DP.png';



interface ContactProps {
    contact: {
        firstName: string;
        lastName: string;
        position: string;
        mobile: string;
        phone: string;
        email: string;
        linkedIn?: string;
        address: string;
        profileImage?: any;
    };
    flipped: boolean;
    onFlip: () => void; // Function to handle flip
}




const PreviewCard: React.FC<ContactProps> = ({ contact, flipped, onFlip }) => {


    const generateVCard = () => {
        const card = new vCard();
        card.set('fn', contact?.firstName);
        card.set('email', contact?.email);
        card.set('org', 'Ajex Logistics Services');
        card.set('title', contact?.position);
        card.set('url', 'https://www.aj-ex.com/');
        card.set('adr', contact?.address);

        const phoneNumbers = [];
        if (contact?.phone) {
            phoneNumbers.push({
                value: `tel:${contact.phone}`,
                type: ['work', 'voice']
            });
        }
        if (contact?.mobile) {
            phoneNumbers.push({
                value: `tel:${contact.mobile}`,
                type: ['home', 'cell']
            });
        }
        if (phoneNumbers.length > 0) {
            phoneNumbers.forEach(number => {
                card.set('tel', number.value, { type: number.type });
            });
        }
        if (contact?.profileImage) {
            card.set('photo', contact?.profileImage, { encoding: 'b' });
        }
        const vCardData = card.toString();
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // On mobile devices, opening the URL should prompt the user to save the contact
            const a = document.createElement('a');
            a.href = url;
            a.download = `${contact?.firstName} ${contact?.lastName}.vcf`;
            a.click();
            alert('The contact is ready. Please check your downloads to add it to your contacts.');
        } else {
            const a = document.createElement('a');
            a.href = url;
            a.download = `${contact?.firstName} ${contact?.lastName}.vcf`;
            a.click();
            window.open(url, '_blank');
        }
        return url;
    };

    return (
        <>
            <div className="scene scene--card">
                <div className={`card ${flipped ? 'is-flipped' : ''}`}>
                    <div className="card__face card__face--front">
                        <Card
                            hoverable
                            className="custom-card"
                            bodyStyle={{
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            {/* header */}
                            <Row className="card-row">
                                <Col span={19}>
                                    <div className="left-img">
                                        <img
                                            className="logo-img"
                                            src={ajexLogo}
                                            alt="Logo"
                                        />
                                    </div>
                                </Col>
                                <Col span={5}>
                                    <div className="right-text">
                                        <label className='label'>Business</label>
                                        <span title="Card">Card</span>
                                    </div>
                                </Col>
                            </Row>
                            {/* Name and Pic */}
                            <Row className="card-row">
                                <Col span={16}>
                                    <div className="name-section">
                                        <label className='label'>Name</label>
                                        <span title="Card">
                                            {contact?.firstName}
                                            <br /> {/* This will break the line between firstName and lastName */}
                                            {contact?.lastName}
                                        </span>
                                    </div>
                                </Col>

                                <Col span={8}>
                                    <div className="profile-img">
                                        <img
                                            className="profile-img-logo"
                                            src={contact?.profileImage || defaultDp}
                                            alt="Profile"
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className="card-row">
                                <Col span={14}>
                                    <div className="left-img">
                                        <label className='label'>Position</label>
                                        <span title="Card">{contact?.position}</span>
                                    </div>
                                </Col>
                                <Col span={10}>
                                    <div className="right-text">
                                        <label className='label'>Mobile</label>
                                        <span title="Card">{formatPhoneNumber(contact?.mobile)}
                                        </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="card-row">
                                <Col span={15}>
                                    <div className="left-img">
                                        <label className='label'>E-Mail </label>
                                        <span title="Card">{contact?.email}</span>
                                    </div>
                                </Col>
                                <Col span={9}>
                                    <div className="right-text">
                                        <label className='label'>FOR V-CARD</label>
                                        <span title="Card">turn the card ⤴ </span>
                                    </div>
                                </Col>
                            </Row>
                            <Row justify="center">
                                <div className='qr'>
                                    <QRCodeSVG value="https://file.io/V0eaXiFd96S2" size={100} bgColor="#EAEAEA" title="Scan me" />
                                    <div className='qr-tag'>Scan Here!</div>
                                </div>
                            </Row>


                            {/* https://drive.google.com/file/d/15LlQoO3No6Ay-8YwEJfw9v9rNIss_420/view?usp=sharing */}

                            {/* Button placed in the bottom-right corner */}
                            <Button
                                onClick={onFlip}
                                className="custom-ellipsis-btn"
                                icon={<HiArrowUturnRight />}
                                size='small'
                            />
                        </Card>
                    </div>
                    <div className="card__face card__face--back">
                        <Card
                            hoverable
                            className="custom-card"
                            bodyStyle={{ padding: 0, margin: 0 }} >
                            <Row className="card-row">
                                <Col span={19}>
                                    <div className="left-img">
                                        <img
                                            className="logo-img"
                                            src="https://yrps.s3.amazonaws.com/img/07/0bb9b0-50ff-4374-b62e-8f24d1d487dd.png"
                                            alt="Logo"
                                        />
                                    </div>
                                </Col>
                                <Col span={5}>
                                    <div className="right-text">
                                        <label className='label'>Business</label>
                                        <span title="Card">Card</span>
                                    </div>
                                </Col>
                            </Row>

                            <Card
                                className='contact-custom-card'
                                bodyStyle={{
                                    padding: 0,
                                    margin: 0,
                                    lineHeight: 2
                                }}>

                                <Row align="middle" justify={'center'}>
                                    <BiDetail size={20} style={{ margin: '0 10' }} /> Details
                                </Row>
                                <Row align="middle">
                                    <ImMobile size={20} style={{ margin: '0 10' }} />  <Link to={''}>{formatPhoneNumber(contact?.mobile)}</Link>
                                </Row>
                                <Row align="middle">

                                    <AiOutlinePhone size={20} style={{ margin: '0 10' }} />  <Link to={''}>{formatPhoneNumber(contact?.phone)}</Link>
                                </Row>
                                <Row align="middle">
                                    <AiOutlineMail size={20} style={{ margin: '0 10' }} />  <Link to={''}>{contact?.email}</Link>
                                </Row>
                                <Row align="middle">
                                    <AiFillLinkedin size={20} style={{ margin: '0 10' }} />  <Link to={contact?.linkedIn || ""}>{contact?.firstName}{contact?.lastName}</Link>
                                </Row>
                                <Row align="middle"  >
                                    <AiOutlineGlobal size={20} style={{ margin: '0 10' }} />  <Link to={''}>www.aj-ex.com</Link>
                                </Row>

                                <Row justify="center" align="middle" style={{ margin: 20 }}>
                                    <label className='label' style={{ lineHeight: '1.3' }}>
                                        {contact?.address}
                                    </label>
                                </Row>


                                <Divider />
                                <Row style={{ margin: 5 }} justify={'center'} align={'middle'}>
                                    <Button
                                        className="detail-custom-ellipsis-btn"
                                        onClick={generateVCard}
                                        icon={<MdOutlineDownload size={20} />}
                                    >Save my contact  </Button>
                                </Row>

                            </Card>

                            <Button
                                onClick={onFlip}
                                className="custom-ellipsis-btn"
                                icon={<HiArrowUturnLeft />}
                                size='small'
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </>

    );
};



export default PreviewCard;


