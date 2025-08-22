import React from 'react';

interface AttributeListProps {
  size?: string;
  colour?: string;
  otherAttributes?: { name: string; value: string }[];
}

const AttributeList: React.FC<AttributeListProps> = ({
  size,
  colour,
  otherAttributes = [],
}) => {
  const attributes = [
    size?.trim(),
    colour?.trim(),
    ...otherAttributes.map((attr) => attr.value.trim()),
  ].filter(Boolean);

  if (attributes.length === 0) return null;

  return (
    <div className='flex flex-wrap md:gap-1 gap-x-1 items-start'>
      {attributes.map((item, index) => (
        <React.Fragment key={index}>
          <p className='whitespace-nowrap'>{item}</p>
          {index < attributes.length - 1 && <span>|</span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default AttributeList;
