import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { formatPhoneNumber } from '../../common/common';

interface QRCodeGeneratorProps {
  value: {
    name: string;
    position: string;
    mobile: string;
    phone: string;
    email: string;
    address: string;
  };
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ value }) => {

  const formattedValue = `
    Name: ${value?.name}

    Position: ${value?.position}

    Mobile: ${formatPhoneNumber(value?.mobile)}

    Phone: ${formatPhoneNumber(value?.phone)}

    Email: ${value.email}
    
    Address: ${value.address}
  `;

  return (
    <div>
      <h3>QR Code</h3>
      <QRCodeSVG  value={formattedValue} size={150} />
    </div>
  );
};

export default QRCodeGenerator;
