"use client";
import Image from "next/image";
import { useState } from "react";
import { Layout } from "../../../components/compound";
import PaymentStatus from "../../../components/molecule/Order-Confirmation/PaymentStatus";
import PrivateRoute from "../../../helpers/auth/PrivateRoute";
import { paymentOptions } from "../../../utils/data";

const ConfirmOrder = () => {
  const [openPaymentStatusModal, setOpenPaymentStatusModal] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const handleCloseModal = () => {
    setOpenPaymentStatusModal(false);
  };
  return (
    <PrivateRoute>
      <Layout includeMarquee={false} includeSearchbar={false}>
        <div
          className="max-h-screen overflow-y-auto py-20 text-[#0E0C22CC] font-Silka
        "
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="w-full max-w-[446px] bg-[#F7F7F7] px-4 py-3 ">
              <p className="text-xs text-[rgba(14,12,34,0.8)]">
                If your order weight exceeds 5kg, you might pay extra on the
                delivery.
              </p>
            </div>

            <h2 className="text-base text-[rgba(14,12,34,0.8)] uppercase font-medium mt-14 mb-5 tracking-[0.8%]">
              delivery
            </h2>

            <section
              className="lg:max-w-[446px] border border-[#0E0C2280] p-6 text-[rgba(14,12,34,0.8)]"
              aria-labelledby="items-title"
            >
              <p className="uppercase text-xs leading-5">
                EXPRESS HOME DELIVERY TUESDAY 31, OCTOBER - THURSDAY 03,
                NOVEMBER
              </p>

              <article className="mt-11 w-full">
                <p className="uppercase text-xs leading-5">OLALEKAN MESHIOYE</p>

                <p className="w-full max-w-[194px] leading-5 mt-3 text-xs ">
                  Cash234 parkview ikoyi lagos 7a <br />
                  101233 <br />
                  Ikoyi <br />
                  Lagos <br />
                  Nigeria
                  <br /> +234 9060347521
                </p>
              </article>

              <button
                className="underline capitalize text-xs mt-6"
                title="edit-address"
              >
                edit
              </button>
            </section>

            <section className="my-[34px] w-full max-w-[446px]">
              <h2 className="text-base text-[rgba(14,12,34,0.8)] uppercase font-medium mt-14 mb-5 tracking-[0.8%]">
                WE ACCEPT THIS FOR PAYMENT
              </h2>

              <div className="w-full my-6 border border-[rgba(14,12,34,0.5)] flex">
                {paymentOptions.map((item, idx) => (
                  <button
                    className="px-3 pt-2 pb-[14px] last:border-r-0 border-r border-r-[rgba(14,12,34,0.5)] flex justify-center items-center w-full flex-col overflow-hidden"
                    title="payment-option"
                    key={idx}
                  >
                    <Image
                      src={item.img}
                      alt="payment-gateway"
                      className="w-[57px] h-9 object-contain mx-auto"
                    />

                    <span className="inline-block mt-1 uppercase text-[11px]">
                      {item.name}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          </div>

          <div className="w-full fixed bottom-0 left-0 right-0 bg-white border-[rgba(14,12,34,0.5)] border flex items-center justify-end gap-14">
            <div className="w-full flex items-center justify-between ">
              <div className="flex gap-6 items-center max-w-7xl  ml-4 sm:ml-6 lg:ml-8 lg:pl-8">
                <input
                  title="terms and conditions"
                  type="checkbox"
                  name="terms"
                  id="terms"
                  className="w-[13px] h-[13px] accent-[#0E0C22] m-0 p-0"
                />
                <label htmlFor="terms" className="uppercase text-xs m-0 p-0">
                  I have read and understood the{" "}
                  <a href="#" className=" underline">
                    privacy policy{" "}
                  </a>{" "}
                  and agree to the{" "}
                  <a className="underline" href="#">
                    Term of use
                  </a>
                  .
                </label>
              </div>
              <div className="font-Silka flex gap-8 items-center justify-end">
                <p className="text-[#0E0C22] font-medium text-xs">TOTAL</p>
                <p className="text-[#0E0C22] font-medium text-xs">20,000 NGN</p>
              </div>
            </div>

            <button
              className="h-[86px] font-HM-Sans text-xs w-full max-w-[252px] text-white uppercase font-normal bg-[#212121]"

              // onClick={handlePlaceOrder}
            >
              Authorise Payment
            </button>
          </div>
        </div>

        {openPaymentStatusModal && (
          <PaymentStatus
            handleCloseModal={handleCloseModal}
            paymentSuccessful={isPaymentSuccessful}
          />
        )}
      </Layout>
    </PrivateRoute>
  );
};

export default ConfirmOrder;
