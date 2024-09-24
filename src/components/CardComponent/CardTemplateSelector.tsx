import React from 'react';
import { Radio } from 'antd';

interface CardTemplateSelectorProps {
  template: string;
  onTemplateChange: (value: string) => void;
}

const CardTemplateSelector: React.FC<CardTemplateSelectorProps> = ({ template, onTemplateChange }) => {
  return (
    <div>
      <h3>Select Card Shape</h3>
      <Radio.Group onChange={e => onTemplateChange(e.target.value)} value={template}>
        {/* <Radio value="rectangle">Rectangle</Radio> */}
        <Radio value="rounded">Rounded</Radio>
        {/* <Radio value="circle">Circle</Radio> */}
      </Radio.Group>
    </div>
  );
};

export default CardTemplateSelector;
