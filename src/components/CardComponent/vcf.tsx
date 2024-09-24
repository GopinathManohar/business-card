
import vCard from 'vcf';
import { useState } from 'react';
import { Card, Button, Row, Col, Divider } from 'antd';
import './VCard.css';
import { HiArrowUturnLeft, HiArrowUturnRight } from "react-icons/hi2";
import { AiOutlinePhone, AiOutlineMail, AiOutlineBuild, AiOutlineGlobal, AiFillLinkedin } from "react-icons/ai";
import { ImMobile } from "react-icons/im";
import { MdOutlineDownload } from "react-icons/md";
import { BiDetail } from "react-icons/bi";
import { QRCodeSVG } from 'qrcode.react';
import { Link } from 'react-router-dom';

const VCardDownload = () => {
    const generateVCard = () => {
        const card = new vCard();
        card.set('fn', 'John Doe');
        card.set('email', 'john.doe@example.com');
        card.set('tel', '+1234567890');
        card.set('url', 'http://example.com');
        card.set('adr', '');

        const vCardData = card.toString();

        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'contact.vcf';
        a.click();
    };

    const downloadPass = () => {
        const url = 'https://example.com/pass.pkpass';
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pass.pkpass';
        a.click();
    };

    const downloadGooglePass = () => {
        const url = 'https://jsonplaceholder.typicode.com/todos/1'; // Sample JSON file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'pass.json';
        a.click();
    };


    return (
        <div>
            <button onClick={generateVCard}>Download vCard</button>
            <button onClick={downloadPass}>Download for Apple Wallet</button>
            <button onClick={downloadGooglePass}>Download for Google Pay</button>
        </div>
    );
};


const contact = {
    fullName: "Gopinath Manohar",
    company: "Ajex Logistics Services ",
    position: "Admin Specialist",
    mobile: "+966 50 360 6512",
    telePhone: "+966 50 360 12",
    linkedIn: "https://www.linkedin.com/",
    email: "Nourah.AlSobei@aj-ex.com",
    website: "https://www.aj-ex.com/",
    profilePic: "https://yrps.s3.amazonaws.com/img/0f/f92df2-a6d9-4aae-b1af-32fe86ec527a.png",
    address: "  AJEX Logistics Services P. O. Box 42468 Riyadh 11541 🇸🇦 Kingdom of Saudi Arabia"

}

const VCard = () => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    const generateVCard = () => {
        const card = new vCard();
        card.set('fn', contact?.fullName);
        card.set('email', contact?.email);
        card.set('org', contact?.company);
        card.set('title', contact?.position);
        card.set('url', contact?.website);
        card.set('adr', contact?.address);
    
        const phoneNumbers = [];
        if (contact?.telePhone) {
            phoneNumbers.push({
                value: `tel:${contact.telePhone}`,
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
    
        if (contact?.profilePic) {
            card.set('photo', contact.profilePic, { encoding: 'b' });
        }
    
        const vCardData = card.toString();
        
        // Create a Blob for the vCard
        const blob = new Blob([vCardData], { type: 'text/vcard' });
        const url = window.URL.createObjectURL(blob);
        
        // Check if the platform is mobile (iOS, Android) and handle download differently
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // On mobile devices, opening the URL should prompt the user to save the contact
            const a = document.createElement('a');
            a.href = url;
            a.download = `${contact?.fullName}.vcf`;
            a.click();
            alert('The contact is ready. Please check your downloads to add it to your contacts.');
        } else {
            // On desktop or other platforms, trigger the download and open the file in a new tab
            const a = document.createElement('a');
            a.href = url;
            a.download = `${contact?.fullName}.vcf`;
            a.click();
    
            // Open the file in a new tab (optional for desktop)
            window.open(url, '_blank');
        }
    
        // Return the vCard URL
        return url;
    };
    
    
    // In your QRCodeSVG component
    // <QRCodeSVG value={generateVCard()} size={100} bgColor="#EAEAEA" title="Scan me" />
    
    
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
                            {/* Name and Pic */}
                            <Row className="card-row">
                                <Col span={16}>
                                    <div className="name-section">
                                        <label className='label'>Name</label>
                                        <span title="Card">{contact?.fullName}</span>
                                    </div>
                                </Col>
                                <Col span={8}>
                                    <div className="profile-img">
                                        <img
                                            className="profile-img-logo"
                                            src={contact?.profilePic}
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
                                        <span title="Card">{contact?.mobile}
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
                                onClick={handleFlip}
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
                                    <ImMobile size={20} style={{ margin: '0 10' }} />  <Link to={''}>{contact?.mobile}</Link>
                                </Row>
                                <Row align="middle">

                                    <AiOutlinePhone size={20} style={{ margin: '0 10' }} />  <Link to={''}>{contact?.telePhone}</Link>
                                </Row>
                                <Row align="middle">
                                    <AiOutlineMail size={20} style={{ margin: '0 10' }} />  <Link to={''}>{contact?.email}</Link>
                                </Row>
                                <Row align="middle">
                                    <AiFillLinkedin size={20} style={{ margin: '0 10' }} />  <Link to={contact?.linkedIn}>Nourah.AlSobei@aj-ex.com</Link>
                                </Row>
                                <Row align="middle"  >
                                    <AiOutlineGlobal size={20} style={{ margin: '0 10' }} />  <Link to={contact?.website}>www.aj-ex.com</Link>
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
                                onClick={handleFlip}
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



export default VCard;



