import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import closeIcon from '../../../assets/images/close-no-outline.svg';
import convertIcon from '../../../assets/images/convert.svg';
import { formatCurrency, formatPrice } from '../../../utils';

import { CartItemType, Conversion } from '../../../types';
import AttributeList from './AttributeList';
import QuantitySelector from './QuantitySelector';

type UpdateCartItemType = {
  onQuantityChange: (name: string, newQuantity: number) => void;
  removeCartItem: (name: string) => void;
  conversion?: Conversion;
} & CartItemType;

const CartItem: React.FC<UpdateCartItemType> = ({
  name,
  price,
  quantity = 1,
  colour,
  size,
  img,
  maxAvailable,
  productURL,
  onQuantityChange,
  conversion,
  removeCartItem,
  otherAttributes = [],
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);
  const total = formatPrice(price * localQuantity);
  const conVertedtotal = conversion
    ? formatPrice(price * localQuantity * conversion!.rate)
    : 0;

  const updateQuantity = (change: number) => {
    const newQuantity = localQuantity + change;
    if (newQuantity < 1) return;
    if (newQuantity >= maxAvailable) {
      setLocalQuantity(maxAvailable);
    } else {
      setLocalQuantity(newQuantity);
    }
    onQuantityChange(name, newQuantity);
  };

  return (
    <div className='w-full border-y md:border-r border-black-100 mb-[-1px] text-[0.625rem] leading-4 md:text-xs md:leading-[18px] font-Silka flex md:flex-col flex-row'>
      <Image
        alt={name}
        width={200}
        height={200}
        src={img}
        className='md:w-full md:h-[23.75rem] h-[15.625rem] w-6/12 object-cover object-top'
      />
      <div className='md:p-3 p-[0.625rem] md:border-t border-l md:border-l-0 border-black-100 uppercase md:flex flex-row-reverse items-start justify-between w-6/12 md:w-full h-[15.625rem] md:h-auto'>
        <button
          aria-label={`remove ${name} from cart`}
          onClick={() => removeCartItem(name)}
          className='flex justify-end mt-2 mb-4 md:my-0 md:w-[18px] w-full'
        >
          <Image src={closeIcon} alt='' />
        </button>
        <div className='md:w-[80%] flex flex-col justify-between md:h-[calc(100%-5rem)] h-[calc(100%-3rem)] md:block'>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <Link
                href={productURL}
                target='_blank'
                className='text-black-100 truncate'
                aria-label={name}
                title={name}
              >
                {name}
              </Link>
            </div>
            {price ? (
              <div className='flex md:gap-[6px] gap-x-1 my-1 items-center'>
                <p>{`${formatCurrency(total)} ${conversion?.from}`}</p>
                <Image
                  src={convertIcon}
                  alt='converted to'
                  className='w-auto h-auto'
                />
                <p className='text-right md:text-left'>{`${formatCurrency(
                  conVertedtotal
                )} ${conversion?.to}`}</p>
              </div>
            ) : null}

            <AttributeList
              size={size}
              colour={colour}
              otherAttributes={otherAttributes}
            />
          </div>

          <QuantitySelector
            name={name}
            localQuantity={localQuantity}
            maxAvailable={maxAvailable}
            updateQuantity={updateQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
