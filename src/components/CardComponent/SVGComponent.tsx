import React, { useRef, useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import { Button,Image } from 'antd';
import { formatPhoneNumber } from '../../common/common';
import imageUrl from '../../assets/images/ajex_logo.png';

interface TemplateOneProps {
  details: {
    name: string;
    position: string;
    mobile: string;
    phone: string;
    email: string;
    address: string;
  };
}

;

const TemplateOne: React.FC<TemplateOneProps> = ({ details }) => {
  const { name, position, mobile, phone, email, address } = details;

  const [qrCodeValue, setQrCodeValue] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      html2canvas(cardRef.current, {
        scale: 2,
        useCORS: true,
        logging: true,
        width: 400,
        height: 250,
        scrollY: -window.scrollY,
      })
        .then((canvas) => {
          const imageURL = canvas.toDataURL('image/png');
          setQrCodeValue(imageURL); // Set QR code value as image URL
        })
        .catch((err) => {
          console.error('Failed to generate image:', err);
        });
    }
  }, [details]);

  const downloadCard = () => {
    if (cardRef.current === null) return;

    html2canvas(cardRef.current, {
      scale: 2,
      useCORS: true,
      logging: true,
      width: 400,
      height: 250,
      scrollY: -window.scrollY,
    })
      .then((canvas) => {
        const link = document.createElement('a');
        link.download = `${name || 'Business_Card'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      })
      .catch((err) => {
        console.error('Failed to generate image:', err);
      });
  };

  const formattedValue = `
    Name: ${details?.name}

    Position: ${details?.position}

    Mobile: ${formatPhoneNumber(details?.mobile)}

    Phone: ${formatPhoneNumber(details?.phone)}

    Email: ${details.email}
    
    Address: ${details.address}
  `;

  return (
    <>
      <div
        style={{
          position: 'relative',
          width: '400px',
          height: '250px',
          backgroundColor: '#2c2c2c',
          overflow: 'hidden', // Ensure content does not overflow the border-radius
        }}
        ref={cardRef}
      >
        <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
          <rect width="400" height="250" rx="5" ry="5" fill="#2c2c2c" />
          <text x="10" y="30" fontSize="13" fill="#F5004F" fontFamily="Arial, sans-serif">
            {name || 'Your Name'}
          </text>
          <text x="10" y="45" fontSize="13" fill="#EEEEEE" fontFamily="Arial, sans-serif">
            {position || 'Position'}
          </text>
        </svg>

        <div
  style={{
    position: 'absolute',
    top: '10px',
    left: '270px',
    backgroundColor: 'transparent', // Set background to transparent
    padding: '2px',
    borderRadius: '1px',
 }}
>
  <Image
    preview={false}
    alt='ajex_logo'
    width={115}
    src={imageUrl}
  />
</div>


    <div
            style={{
              position: 'absolute',
              top: '110px',
              left: '75px',
              backgroundColor: '#EEEEEE',
              padding: '2px',
              borderRadius: '1px',
            }}
          >
            {/* Use readable JSON format */}
            <QRCodeSVG value={formattedValue} size={75}  />
          </div>
        

        {/* Vertical Line */}
        <div
          style={{
            position: 'absolute',
            top: '110px',
            left: '165px',
            height: '85px',
            borderLeft: '3px solid #F5004F',
          }}
        />

        {/* Contact Info */}
        <div
          style={{
            position: 'absolute',
            top: '110px',
            left: '180px',
            color: '#EEEEEE',
            fontSize: '12px',
            fontFamily: 'Arial, sans-serif',
            textAlign: 'left',
            lineHeight: '1.3',
          }}
        >
          <div style={{ margin: '0' }}>
            <span style={{ color: '#F5004F' }}>M :</span> {formatPhoneNumber(mobile) || '000000000'}
          </div>
          {phone ? (
            <div style={{ margin: '0' }}>
              <span style={{ color: '#F5004F' }}>T :</span> {formatPhoneNumber(phone) || '0000000000'}
            </div>
          ) : null}
          <div style={{ margin: '0' }}>
            <span style={{ color: '#F5004F' }}>E :</span> <strong>{email || 'Email Address'}</strong>
          </div>
          <div style={{ margin: '0' }}>{address || 'P.O Address'}</div>
          <div style={{ color: '#F5004F', margin: '0' }}>www.aj-ex.com</div>
        </div>
      </div>

      {/* Download Button */}
      <Button onClick={downloadCard} style={{ marginTop: '20px' }}>
        Download
      </Button>
    </>
  );
};

export default TemplateOne;
