'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { Layout } from '../../components/imports';
import { useCartAction } from '../../context/CartActionContext';
import PrivateRoute from '../../helpers/auth/PrivateRoute';
import { getUserProfileFromLocalStorage } from '../../utils/helpers';
import { AddAddress } from '../../components/molecule';

const Checkout: React.FC = () => {
  const router = useRouter();
  const { action, clearAction } = useCartAction();
  const userProfile = getUserProfileFromLocalStorage();

  // If no cart, send user back home
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
    // clearAction();
    router.push('/order/confirmation');
  };

  return (
    <PrivateRoute>
      <Layout includeMarquee={false} includeSearchbar={false}>
        <div className="max-h-screen  overflow-y-auto py-20 text-[#0E0C22CC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <section className="lg:w-4/12" aria-labelledby="address-title">
              <h2 className="tracking-[0.8%] uppercase" id="address-title">
                WHERE DO YOU WANT TO RECEIVE YOUR ORDER?
              </h2>
              <div className="mt-6 p-5 border border-[#0E0C2280] text-xs uppercase space-y-3">
                <p>Address</p>
                <p>
                  {userProfile?.address
                    ? userProfile?.address
                    : 'YOU DONT HAVE A ADDRESS'}
                </p>
                <button className="underline font-medium">
                  {userProfile?.address ? 'Add' : 'Edit'}
                </button>
              </div>
            </section>
            <section
              className="lg:w-4/12 mt-10 border border-[#0E0C2280] pt-6 pb-16"
              aria-labelledby="items-title"
            >
              <h2
                className="text-xs uppercase font-medium ml-5"
                id="items-title"
              >
                Items
              </h2>
              <div className="mr-3 mt-6 flex">
                {items.map((it) => (
                  <div
                    key={it.name}
                    className="flex items-center justify-between border border-l-0 border-[#0E0C2280]"
                  >
                    <Image
                      alt={it.name}
                      width={130}
                      height={180}
                      src={it.img}
                      className="md:w-full md:h-[23.75rem] h-[15.625rem] w-6/12 object-cover object-top"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-12 pl-4">
                <label className="flex gap-x-[0.375rem] items-center">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="appearance-none border border-black w-[0.875rem] h-[0.875rem] checked:before:bg-black before:w-2 before:h-2 before:rounded-full flex items-center justify-center rounded-full"
                  />
                  <p className="uppercase font-medium text-xs">
                    <span className="sr-only">Delivery Window</span>
                    TUESDAY 31, OCTOBER - THURSDAY 03, NOVEMBER
                  </p>
                </label>
              </div>
            </section>
          </div>

          <AddAddress />
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Checkout;
