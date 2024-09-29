import React, { useState } from 'react';
import { Button, Form, Row } from 'antd';
import ContactDetailsForm from './ContactDetailsForm';
import VCard from './PreviewCard';

interface ContactProps {
  contact: {
    firstName: string;
    lastName: string;
    position: string;
    mobile: string;
    email: string;
    phone: string;
    linkedIn: string;
    address: string;
    profileImage?: any;
  };
}

const App: React.FC = () => {
  const [form] = Form.useForm();

  const [details, setDetails] = useState<ContactProps['contact']>({
    firstName: '',
    lastName: '',
    position: '',
    mobile: '',
    email: '',
    phone: '',
    linkedIn: '',
    address: '',
    profileImage: ''
  });

  // Update form details on every change
  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log(changedValues);

    // Check if one of the keys is phone, address, or linkedIn
    if (changedValues.phone || changedValues.address || changedValues.linkedIn) {
      setFlipped(true);
    } else {
      setFlipped(false);
    }

    setDetails(allValues); // Updates the details object in real-time
  };

  const onFinish = (values: any) => {
    setDetails(values); // This will update when the form is submitted
  };
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 1 45%', margin: '10px' }}>
          <Form
            form={form}
            onFinish={onFinish}
            onValuesChange={onValuesChange}
            layout="vertical"
          >
            <ContactDetailsForm form={form} />
            <Button type="primary" onClick={() => form.submit()} style={{ marginTop: '16px' }}>
              Generate Card
            </Button>
          </Form>
        </div>

        <div className='height100per'
          style={{
            flex: '0 1 45%',
            margin: '0 0 30px0',
            display: 'flex',
            justifyContent: 'center', alignItems: 'center'
          }}
        >
          <VCard flipped={flipped} onFlip={handleFlip} contact={details} />
        </div>
      </div>

    </div>

  );
};

export default App;

