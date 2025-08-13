import React, { useEffect, useMemo, useState } from 'react';
import { useCart } from '../../../context/CartContext';
import { CartItemType } from '../../../types';
import {
  formatCreationDate,
  formatCurrency,
  formatPrice,
} from '../../../utils';
import { Error } from '../../atom';
import CartItem from './CartItem';

const CartLayout: React.FC = () => {
  const { cartData, error } = useCart();

  const content = cartData?.content;
  const vendorName = content?.vendor?.name ?? '';
  const isLuxury = Boolean(content?.luxury);
  const conversion = content?.conversion;
  const rate = Number(conversion?.rate ?? 0);
  const currencyTo = conversion?.to ?? '';
  const currencyFrom = conversion?.from ?? '';
  const sourceItems = content?.item ?? [];

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    // Clone items once when cart changes
    setCartItems(sourceItems.map((item) => ({ ...item })));
    return () => setCartItems([]);
  }, [sourceItems]);

  const createdDate = useMemo(() => {
    if (!content?.creationDate) return null;
    return formatCreationDate(content.creationDate);
  }, [content?.creationDate]);

  const { subTotal, fee } = useMemo(() => {
    const rawTotal = cartItems.reduce((acc, item) => {
      if (item.maxAvailable === 0) return acc;
      return acc + item.price * item.quantity;
    }, 0);

    if (!sourceItems.length || !rate) {
      return { subTotal: 0, fee: 0 };
    }

    const converted = formatPrice(rawTotal * rate);
    const fees = formatPrice(Number(converted) * 0.1);
    return { subTotal: converted, fee: fees };
  }, [cartItems, sourceItems.length, rate]);

  const handleQuantityChange = (name: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeCartItem = (name: string) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  if (error) return <Error {...error} />;

  const buttonText = isLuxury ? 'Submit ticket' : 'Checkout';
  const isButtonDisabled =
    cartItems.length === 0 || (!isLuxury && !Boolean(subTotal));

  return (
    <div className='z-[15] min-h-[calc(100dvh-42px)] grid grid-rows-[auto_1fr_auto] mt-10'>
      <div className='min-h-[31.25rem] mb-40'>
        <header className='flex items-center justify-between px-[0.625rem] py-3 md:text-xs text-[0.625rem] leading-4 md:leading-[1.125rem] font-HM-Sans text-black-100 uppercase border-b mb-[-1px] border-black-100'>
          {isLuxury ? (
            <h1 className='text-center w-full'>
              This is a{' '}
              <span className='font-bold font-HM-Sans-Bold'>{vendorName}</span>{' '}
              ticket. Generated on {createdDate?.formattedDate},{' '}
              {createdDate?.formattedTime}.
            </h1>
          ) : (
            <>
              <h1 className='w-6/12 md:w-auto'>
                <span className='font-bold font-HM-Sans-Bold'>
                  {vendorName}
                </span>{' '}
                PRICE LIST Generated on {createdDate?.formattedDate} AT{' '}
                {createdDate?.formattedTime}
              </h1>
              <p className='w-4/12 self-end md:w-auto'>
                BUY Rate FOR{' '}
                <span className='text-[#BE0D0D]'>{currencyFrom}</span> ={' '}
                <span className='text-[#BE0D0D]'>
                  {`${currencyTo} ${formatCurrency(rate || 0)}`}
                </span>
              </p>
            </>
          )}
        </header>

        <section className='md:grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2'>
          {cartItems.map((item) => (
            <CartItem
              key={item.name}
              {...item}
              conversion={conversion}
              onQuantityChange={handleQuantityChange}
              removeCartItem={removeCartItem}
            />
          ))}
          {cartItems.length === 0 && (
            <p className='px-3 py-6 text-sm' role='status' aria-live='polite'>
              Your cart is empty.
            </p>
          )}
        </section>

        <div
          aria-label='Price subtotal breakdown'
          className='fixed bottom-0 w-full z-20 bg-white/95 flex uppercase border border-black-100'
        >
          <div className='w-6/12 lg:w-[90%] lg:py-7 py-2 px-2 xl:px-11 md:px-8 font-Silka text-xs leading-[1.125rem] text-black-100'>
            {isLuxury ? (
              <div className='flex md:justify-between items-center'>
                <div>
                  <p className='hidden lg:block uppercase text-xs'>
                    PLEASE NOTE: Edits don&apos;t update cart content. Click
                    Submit Ticket to confirm changes.
                  </p>
                </div>
                <div className='flex flex-col flex-wrap md:items-end font-bold'>
                  <div className='flex md:gap-x-4 md:justify-start justify-between lg:w-full'>
                    <p>Total</p>
                    <p className='justify-self-end'>Pending</p>
                  </div>
                  <p>*Fee TO BE DETERMINED</p>
                </div>
              </div>
            ) : (
              <div className='flex md:justify-between items-center'>
                <div>
                  <p className='hidden lg:block uppercase text-xs'>
                    PLEASE NOTE: Edits to your cart will not update the cart
                    content. Click Checkout to confirm your items.
                  </p>
                </div>

                <div aria-live='polite'>
                  <div className='flex md:gap-x-5 gap-x-2 gap-y-1 justify-end'>
                    <p>Order Value</p>
                    <p>{`${formatCurrency(subTotal)} ${currencyTo}`}</p>
                  </div>
                  <div className='text-[0.5rem] md:text-[0.625rem] leading-[0.875rem] flex gap-x-2 justify-end'>
                    <p>* processing + insurance FEE</p>
                    <p>{`${formatCurrency(fee)} ${currencyTo}`}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type='button'
            className='w-6/12 lg:w-[10%] block bg-[#212121] text-white font-HM-Sans text-xs leading-[1.125rem] font-bold lg:py-7 py-2 uppercase disabled:bg-[#383838] disabled:cursor-not-allowed'
            disabled={isButtonDisabled}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
