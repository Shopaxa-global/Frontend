import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext";
import { CartItemType } from "../../../types";
import {
  formatCreationDate,
  formatCurrency,
  formatPrice,
} from "../../../utils";
import { Error } from "../../atom";
import CartItem from "./CartItem";

const CartLayout: React.FC = () => {
  const { cartData, error } = useCart();

  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [subTotal, setSubTotal] = useState(0);
  const [fee, setFee] = useState(0);

  useEffect(() => {
    if (cartData?.content.item) {
      setCartItems(cartData.content.item.map((item) => ({ ...item })));
    }
    return () => {
      setCartItems([]);
    };
  }, [cartData]);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.maxAvailable == 0 ? 0 : item.price * item.quantity;
    });
    const _subtotal = cartData?.content.item
      ? formatPrice(total * cartData?.content.conversion.rate!)
      : 0.0;
    setSubTotal(_subtotal);
    setFee(formatPrice(Number(_subtotal) * 0.1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  if (error) return <Error {...error} />;

  const createdDate = cartData?.content.creationDate
    ? formatCreationDate(cartData?.content.creationDate)
    : null;

  const handleQuantityChange = (name: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeCartItem = (name: string) => {
    const updatedCartItems = cartItems.filter((item) => item.name !== name);
    setCartItems(updatedCartItems);
  };

  return (
    <div
      className={`z-[15] min-h-[calc(100dvh-42px)] grid grid-rows-[auto_1fr_auto] mt-10`}
    >
      <div className="min-h-[31.25rem] mb-40">
        <div className="flex items-center justify-between px-[0.625rem] py-3 md:text-xs text-[0.625rem] leading-4 md:leading-[1.125rem] font-HM-Sans text-black-100 uppercase border-b border-black-100">
          {cartData?.content.luxury ? (
            <h1 className="text-center w-full">
              This is a {cartData?.content?.vendor?.name} ticket. Generated on{" "}
              {createdDate?.formattedDate}, {createdDate?.formattedTime}.
            </h1>
          ) : (
            <>
              <h1 className="w-6/12 md:w-auto">
                {cartData?.content.vendor.name} PRICE LIST Generated on{" "}
                {createdDate?.formattedDate} AT {createdDate?.formattedTime}
              </h1>
              <p className="w-4/12 self-end md:w-auto">
                BUY Rate FOR {cartData?.content.conversion.from} ={" "}
                {`${cartData?.content.conversion.to} ${formatCurrency(
                  cartData?.content.conversion.rate!
                )}`}
              </p>
            </>
          )}
        </div>

        <div className="md:grid xl:grid-cols-5 lg:grid-cols-3 grid-cols-2">
          {cartItems.map((item) => (
            <CartItem
              key={item.name}
              {...item}
              conversion={cartData?.content.conversion}
              onQuantityChange={handleQuantityChange}
              removeCartItem={removeCartItem}
            />
          ))}
        </div>

        <div
          role="region"
          aria-live="polite"
          aria-label="Price subtotal breakdown"
          className="fixed bottom-0 w-full z-20 bg-white bg-opacity-95 flex uppercase border border-black-100"
        >
          <div className="w-6/12 lg:w-[90%] lg:py-7 py-2 px-2 xl:px-11 md:px-8 font-Silka text-xs leading-[1.125rem] text-black-100">
            {cartData?.content.luxury ? (
              <div className="flex md:justify-between items-center">
                <div>
                  <p className="hidden lg:block uppercase text-xs">
                    PLEASE NOTE: Edits don&apos;t update cart content. Click
                    Submit Ticket to confirm changes.
                  </p>
                </div>
                <div className="flex flex-col flex-wrap md:items-end font-bold">
                  <div className="flex md:gap-x-4 md:justify-start justify-between lg:w-full">
                    <p>Total</p>
                    <p className="justify-self-end">Pending</p>
                  </div>

                  <p>*Fee TO BE DETERMINED</p>
                </div>
              </div>
            ) : (
              <div className="flex md:justify-between items-center">
                <div>
                  <p className="hidden lg:block uppercase text-xs">
                    PLEASE NOTE: Edits to your cart will not update the cart
                    content. Click Checkout to confirm your items.
                  </p>
                </div>

                <div>
                  <div className="flex md:gap-x-5 gap-x-2 gap-y-1 justify-end">
                    <p>Order Value</p>
                    <p>{`${formatCurrency(subTotal)} ${
                      cartData?.content.conversion.to
                    }`}</p>
                  </div>
                  <div className="text-[0.5rem] md:text-[0.625rem] leading-[0.875rem] flex gap-x-2 justify-end">
                    <p>* processing + insurance FEE</p>
                    <p>{`${formatCurrency(fee)} ${
                      cartData?.content.conversion.to
                    }`}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {cartData?.content.luxury ? (
            <button className="w-6/12 lg:w-[10%] block bg-[#212121] text-white font-HM-Sans text-xs leading-[1.125rem] font-bold lg:py-7 py-2 uppercase">
              Submit ticket
            </button>
          ) : subTotal ? (
            <button className="w-6/12 lg:w-[10%] block bg-[#212121] text-white font-HM-Sans text-xs leading-[1.125rem] font-bold lg:py-7 py-2 uppercase">
              Checkout
            </button>
          ) : (
            <button
              className="w-6/12 lg:w-[10%] block bg-[#383838] text-white font-HM-Sans text-xs leading-[1.125rem] font-bold lg:py-7 py-2 uppercase cursor-not-allowed"
              disabled={!subTotal}
            >
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
