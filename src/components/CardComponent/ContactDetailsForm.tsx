import React from 'react';
import { Button, Col, Form, Input, message, Row, Upload } from 'antd';
import { emailValidation, phoneNumberValidation } from '../../validation/validation';
import { AiOutlineUpload } from 'react-icons/ai';
interface PersonalDetailsFormProps {
  form: any;
}

const beforeUpload = (file: any) => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    message.error('You can only upload image files!');
    return false;
  }
  const isMinSize = file.size / 1024 >= 100;
  if (!isMinSize) {
    message.error('Image must be at least 100KB!');
    return false;
  }

  return true;
};


const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList.filter((file: any) => file.type.startsWith('image/'));
};

const ContactDetailsForm: React.FC<PersonalDetailsFormProps> = ({ form }) => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please enter your first name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="position"
            label="Position/Role"
            rules={[{ required: true, message: 'Please enter your Position/Role' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="mobile"
            label="Mobile Number"
            rules={[{ required: true, message: 'Please enter your mobile number' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ type: 'email', required: true, message: 'Please enter your email' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone"
            label="Phone Number"
          // rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="linkedIn"
            label="LinkedIn Profile"
            rules={[
              {
                pattern: /^https:\/\/(www\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?$/,
                message: 'Please enter a valid LinkedIn profile URL',
              },
            ]}
          >
            <Input placeholder="https://www.linkedin.com/in/your-profile" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="profileImage"
            label="Profile Image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              name="profile"
              listType="picture"
              beforeUpload={beforeUpload}
              maxCount={1}
              showUploadList={false} // Disable preview
            >
              <Button icon={<AiOutlineUpload />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter your Address', max: 150 }]}
          >
            <Input.TextArea maxLength={150} showCount />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ContactDetailsForm;
