import React from 'react';
import { Form, Input } from 'antd';
import { emailValidation, phoneNumberValidation } from '../../validation/validation';

interface PersonalDetailsFormProps {
  form: any;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ form }) => {
  return (
    <>
     <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
        <Input />
      </Form.Item>
     <Form.Item name="position" label="Position/Role" rules={[{ required: true, message: 'Please enter your Position/Role' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="mobile" label="Mobile Number" rules={phoneNumberValidation}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone Number" rules={phoneNumberValidation}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email Address" rules={emailValidation}>
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your Address' }]}>
        <Input />
      </Form.Item>
      
    </>
   
   
  );
};

export default PersonalDetailsForm;
