'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Layout } from '../../components/imports';
import { useCartAction } from '../../context/CartActionContext';
import PrivateRoute from '../../helpers/auth/PrivateRoute';

const Checkout: React.FC = () => {
  const router = useRouter();
  const { action, clearAction } = useCartAction();

  // If no context, send user back home
  useEffect(() => {
    if (!action) {
      router.replace('/');
    }
  }, [action, router]);

  if (!action) {
    return <div>Loading...</div>;
  }

  const { isLuxury, items, subTotal, fee, conversion } = action;
  const grandTotal = subTotal + fee;

  const handlePlaceOrder = () => {
    // Call API, then clear action
    clearAction();
    router.push('/order/confirmation');
  };

  return (
    <PrivateRoute>
      <Layout includeMarquee={false} includeSearchbar={false}>
        <div className='min-h-screen bg-white'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
            <section></section>
            <section className='space-y-3'>
              {items.map((it) => (
                <div
                  key={it.name}
                  className='flex items-center justify-between border-b py-2'
                >
                  <div className='min-w-0'>
                    <p className='font-medium'>{it.name}</p>
                    <p className='text-xs text-gray-600'>
                      Qty: {it.quantity}
                      {typeof it.maxAvailable === 'number' &&
                        ` • Max: ${it.maxAvailable}`}
                    </p>
                  </div>
                  <div className='text-right'>
                    <p className='font-medium'>
                      {(it.price * it.quantity).toFixed(2)}{' '}
                      {conversion?.to ?? ''}
                    </p>
                    <p className='text-xs text-gray-600'>
                      Unit: {it.price.toFixed(2)} {conversion?.to ?? ''}
                    </p>
                  </div>
                </div>
              ))}
            </section>

            <div className='mt-8 flex gap-3'>
              <button
                type='button'
                onClick={() => router.push('/cart')}
                className='rounded-lg px-4 py-2 border'
              >
                Back
              </button>
              <button
                type='button'
                onClick={handlePlaceOrder}
                className='rounded-lg px-4 py-2 bg-black text-white'
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Checkout;
