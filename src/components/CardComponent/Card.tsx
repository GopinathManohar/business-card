import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'antd';
import CardTemplateSelector from './CardTemplateSelector';
import PersonalDetailsForm from './PersonalDetailsForm';
import BusinessCardPreview from './BusinessCardPreview';
import QRCodeGenerator from './QRCodeGenerator';
import TemplateOne from './SVGComponent';
import VCardDownload from './vcf';
import VCard from './vcf';
import DownloadContact from './Download';

const App: React.FC = () => {
  const [form] = Form.useForm();
  // const [template, setTemplate] = useState('rectangle');
  const [details, setDetails] = useState({
    name: '',
    position: '',
    mobile: '',
    phone: '',
    email: '',
    address: '',
  });

  const onFinish = (values: any) => {
    setDetails(values);
  };

  return (
    <div className="full-screen" >
      <h1>AJEX Business Card Generator</h1>

      {/* <Row gutter={16}>
       <Col xs={24} sm={24} md={12} lg={8}>
         <Form form={form} onFinish={onFinish} layout="vertical">
            <PersonalDetailsForm form={form} />
            <Button type="primary" onClick={() => form.submit()} style={{ marginTop: '16px' }}>
              Generate Card
            </Button>
          </Form>
        </Col>

       <Col xs={24} sm={24} md={12} lg={16}>
         <div style={{ textAlign: 'center' }}>
            <TemplateOne details={details} />
          </div>
        </Col>
     
      </Row> */}

      <div >
        {/* <QRCodeGenerator value={details} /> */}
        <VCard />
      </div>
      {/* <DownloadContact/> */}
    </div>
  );
};

export default App;
