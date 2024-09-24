import React from 'react';
import styled from 'styled-components';

interface BusinessCardPreviewProps {
  template: string;
  details: {
    name: string;
    email: string;
    phone: string;
    website: string;
  };
}

const Card = styled.div<{ template: string }>`
  width: 350px;
  height: 200px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: ${(props) =>
    props.template === 'rounded' ? '20px' : props.template === 'circle' ? '50%' : '0'};
`;

const BusinessCardPreview: React.FC<BusinessCardPreviewProps> = ({ template, details }) => {
  return (
    <Card template={template}>
      <div>
        <h3>{details.name}</h3>
        <p>Email: {details.email}</p>
        <p>Phone: {details.phone}</p>
        <p>Website: {details.website}</p>
      </div>
    </Card>
  );
};

export default BusinessCardPreview;
