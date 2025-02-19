import React, { useEffect, useMemo, useState } from "react";
import { useGetCartContent } from "../../../hooks";
import { formatCreationDate } from "../../../utils";
import { CartItem, Error, Loading } from "../../molecule";

const CartLayout: React.FC = () => {
  const { cartContent, isLoading, error } = useGetCartContent("L6ZVUYQ", "NG");

  // LULLBZ1
  // L6ZVUYL

  const [cartItems, setCartItems] = useState(cartContent?.content.item || []);

  useEffect(() => {
    if (cartContent?.content?.item) {
      setCartItems(cartContent.content.item);
    }
  }, [cartContent]);

  const handleQuantityChange = (name: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subTotal = useMemo(() => {
    return parseFloat(
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
  }, [cartItems]);

  if (isLoading) return <Loading />;
  if (error) return <Error {...error} />;

  const createdDate = cartContent?.content.creationDate
    ? formatCreationDate(cartContent?.content.creationDate)
    : null;

  console.log({ subTotal });

  return (
    <div className="z-[15] min-h-[calc(100dvh-42px)] grid grid-rows-[auto_1fr_auto]">
      <div className="min-h-[31.25rem] mb-40">
        <div className="flex items-center justify-between px-[0.625rem] py-3 text-xs leading-[1.125rem] font-HM-Sans text-black-100 uppercase border-b border-black-100">
          {cartContent?.content.luxury ? (
            <h1 className="text-center w-full">
              This is a {cartContent?.content?.vendor?.name} ticket. Generated
              as of {createdDate?.formattedDate}, {createdDate?.formattedTime}.
            </h1>
          ) : (
            <>
              <h1>
                {cartContent?.content.vendor.name} PRICE LIST UPDATED ON
                {createdDate?.formattedDate} AT {createdDate?.formattedTime}
              </h1>
              <p>BUY Rate FOR {cartContent?.content.currency} = £ 2050</p>
            </>
          )}
        </div>
        <div className="md:grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-2">
          {cartItems.map((item) => (
            <CartItem
              key={item.name}
              {...item}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div
          role="region"
          aria-live="polite"
          aria-label="Price subtotal breakdown"
          className="fixed bottom-0 w-full z-20 bg-white bg-opacity-95 flex uppercase border border-black-100"
        >
          <div className="w-6/12 lg:w-[90%] lg:py-7 py-2 px-2 md:px-11 font-Silka text-xs leading-[1.125rem] grid justify-end text-black-100">
            <div className="flex md:gap-7 md:justify-end justify-between font-bold">
              <p>{cartContent?.content.luxury ? "total" : "order value"}</p>
              <p>{cartContent?.content.luxury ? "pending" : "127,345 NGN"}</p>
            </div>
            <div className="text-[0.625rem] leading-[0.875rem] flex md:gap-2 md:justify-normal justify-between mt-1">
              {cartContent?.content.luxury ? (
                <p>* TO BE DETERMINED</p>
              ) : (
                <>
                  <p>* processing + insurance FEE =</p>
                  <p>18,568 NGN</p>
                </>
              )}
            </div>
          </div>
          {cartContent?.content.luxury ? (
            <button className="w-6/12 lg:w-[10%] block bg-[#212121] text-white font-HM-Sans text-xs leading-[1.125rem] font-bold lg:py-7 py-2 uppercase">
              Submit ticket
            </button>
          ) : (
            <button className="w-6/12 lg:w-[10%] block bg-[#212121] text-white font-HM-Sans text-xs leading-[1.125rem] font-bold lg:py-7 py-2 uppercase">
              Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartLayout;
