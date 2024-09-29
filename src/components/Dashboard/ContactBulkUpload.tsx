import React, { useState } from 'react';
import { Upload, Button, message, Spin } from 'antd';
import * as XLSX from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';

export interface Contact {
    id?: number;
    firstName: string;
    lastName: string;
    position: string;
    mobile: string;
    email: string;
    phone: string;
    status: string;
    link: string;
}

// Define the props interface
interface ContactUploadProps {
    setData: (data: Contact[]) => void; // Function to set the contact data
}

const ContactUpload: React.FC<ContactUploadProps> = ({ setData }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const validateData = (contacts: Contact[]) => {
        const invalidContacts = contacts.map((contact, index) => {
            const errors: string[] = [];
            const phoneRegex = /^\d{8,10}$/; // 8 to 10 digit number
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation

            if (!phoneRegex.test(contact.mobile)) {
                errors.push(`Row ${index + 1}: Invalid mobile number`);
            }

            if (!emailRegex.test(contact.email)) {
                errors.push(`Row ${index + 1}: Invalid email format`);
            }

            return errors.length ? { row: index + 1, errors } : null; // Include row info
        }).filter(Boolean);

        return invalidContacts.length === 0 ? true : invalidContacts;
    };

    const handleUpload = (file: File) => {
        const isExcel =
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
            file.type === 'application/vnd.ms-excel';

        const isSizeValid = file.size / 1024 / 1024 < 5;

        if (!isExcel) {
            message.error('You can only upload Excel files (.xlsx, .xls)');
            return false;
        }

        if (!isSizeValid) {
            message.error('File size must be smaller than 5MB');
            return false;
        }

        setLoading(true);

        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const binaryStr = event.target?.result as string;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const jsonData = XLSX.utils.sheet_to_json<Contact>(worksheet);

                const validationResult = validateData(jsonData);
                if (validationResult === true) {
                    debugger
                    setData(jsonData);
                    message.success('File uploaded successfully');
                } else {
                    const errorMessages = validationResult
                        .map((item: any) => item.errors.join(', '))
                        .join('\n');
                    message.error(`Invalid data found:\n${errorMessages}`);
                }
            } catch (error: any) {
                message.error('Error reading the file: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        reader.onerror = (error) => {
            message.error('File reading has failed: ' + error.target?.error?.message || 'Unknown error');
            setLoading(false);
        };

        reader.readAsBinaryString(file);
        return false;
    };

    return (
        <div>
            <Upload
                accept=".xlsx,.xls" // Only accept Excel files
                customRequest={({ file }) => handleUpload(file as File)}
                showUploadList={false} // Disable upload list preview
            >
                <Button icon={<UploadOutlined />}>Upload Contact File</Button>
            </Upload>

            {loading && (
                <div style={{ marginTop: 16 }}>
                    <Spin style={{ marginRight: 8 }} />
                    <span>Loading...</span>
                </div>
            )}

            {/* Uncomment to show uploaded data if needed
            <h3>Uploaded Data:</h3>
            <pre>{JSON.stringify(data, null, 2)}</pre>  
            */}
        </div>
    );
};

export default ContactUpload;
