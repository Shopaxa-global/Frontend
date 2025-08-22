import React from 'react';

interface QuantitySelectorProps {
  name: string;
  localQuantity: number;
  maxAvailable?: number;
  updateQuantity: (delta: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  name,
  localQuantity,
  maxAvailable = 0,
  updateQuantity,
}) => {
  const isOutOfStock = !maxAvailable;

  return (
    <div className='mt-3 flex md:gap-x-4 gap-x-1 items-center'>
      {isOutOfStock ? (
        <div className='bg-[#BE0D0D] p-1 text-white md:text-[0.625rem] text-[0.534rem]'>
          OUT OF STOCK
        </div>
      ) : (
        <div className='flex'>
          <p
            className='border flex items-center justify-center h-8 w-8 border-black-100 md:text-[0.938rem] selection:bg-transparent'
            aria-live='polite'
          >
            {localQuantity}
          </p>
          <button
            aria-label={`Add another unit for ${name}`}
            className='border-y flex items-center justify-center h-8 w-8 border-black-100 disabled:cursor-not-allowed disabled:opacity-50'
            onClick={() => updateQuantity(1)}
            disabled={localQuantity >= maxAvailable}
          >
            <PlusIcon />
          </button>

          <button
            aria-label={`Remove a unit from ${name}`}
            className='border flex items-center justify-center h-8 w-8 border-black-100 disabled:cursor-not-allowed disabled:opacity-50'
            onClick={() => updateQuantity(-1)}
            disabled={localQuantity <= 1}
          >
            <MinusIcon />
          </button>
        </div>
      )}
    </div>
  );
};

const PlusIcon = () => (
  <svg
    viewBox='0 0 13 13'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='md:w-[13px] md:h-[13px] w-[11px] h-[11px]'
    aria-hidden='true'
  >
    <path
      d='M6.89286 6.10714V1H6.10714V6.10714H1V6.89286H6.10714V12H6.89286V6.89286H12V6.10714H6.89286Z'
      fill='#0E0C22'
      stroke='#0E0C22'
      strokeWidth='0.5'
    />
  </svg>
);

const MinusIcon = () => (
  <svg
    viewBox='0 0 16 3'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    className='md:w-[16px] w-[14px] h-[3px]'
    aria-hidden='true'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M15 2H1V1H15V2Z'
      fill='black'
      stroke='black'
      strokeWidth='0.5'
    />
  </svg>
);

export default QuantitySelector;
