import { BackDrop } from "../../atom";
import { CartItem, NavSearchbar } from "../../molecule";
import Footer from "../Footer";

const items = [
  {
    name: "Nike Air Max 270 React ENG - Long Edition",
    price: "£120",
    convertedPrice: "N45,000",
    quantity: 1,
    properties: {
      size: "UK 9",
      color: "Black",
    },
  },
  {
    name: "Adidas Ultraboost 20 - Extended Version",
    price: "£140",
    convertedPrice: "N52,000",
    quantity: 1,
    properties: {
      size: "UK 8",
      color: "White",
    },
  },
  {
    name: "Puma RS-X3 Puzzle",
    price: "£110",
    convertedPrice: "N41,000",
    quantity: 1,
    properties: {
      size: "UK 10",
      color: "Red",
    },
  },
  {
    name: "Reebok Classic Leather",
    price: "£90",
    convertedPrice: "N34,000",
    quantity: 1,
    properties: {
      size: "UK 7",
      color: "Blue",
    },
  },
  {
    name: "New Balance 574 Core",
    price: "£100",
    convertedPrice: "N38,000",
    quantity: 1,
    properties: {
      size: "UK 9",
      color: "Green",
    },
  },
  {
    name: "Asics Gel-Kayano 27",
    price: "£130",
    convertedPrice: "N49,000",
    quantity: 1,
    properties: {
      size: "UK 8",
      color: "Yellow",
    },
  },
  {
    name: "Converse Chuck Taylor All Star",
    price: "£70",
    convertedPrice: "N27,000",
    quantity: 1,
    properties: {
      size: "UK 6",
      color: "Black",
    },
  },
];

const CartLayout = () => {
  return (
    <main className="body z-[15] min-h-dvh grid grid-rows-[auto_1fr_auto]">
      <NavSearchbar addMargin={false} />
      <div className="min-h-[31.25rem] mt-10 mb-40">
        <div className="flex items-center justify-between px-[0.625rem] py-3 text-xs leading-[1.125rem] font-HM-Sans text-black-100 uppercase border-b border-black-100">
          <h1>H&M PRICE LIST UPDATED ON 10/01/2024 AT 7:18:13 PM</h1>
          <p>BUY Rate FOR GBP = £ 2050</p>
        </div>
        <div className="md:grid xl:grid-cols-5 lg:grid-cols-4 grid-cols-2">
          {items.map((item) => (
            <CartItem
              key={item.name}
              name={item.name}
              price={item.price}
              convertedPrice={item.convertedPrice}
              quantity={item.quantity}
              properties={item.properties}
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
              <p>order value</p>
              <p>127,345 NGN</p>
            </div>
            <div className="text-[0.625rem] leading-[0.875rem] flex md:gap-2 md:justify-normal justify-between mt-1">
              <p>* processing + insurance FEE =</p>
              <p>18,568 NGN</p>
            </div>
          </div>
          <button className="w-6/12 lg:w-[10%] block bg-[#212121] text-white font-HM-Sans text-xs leading-[1.125rem] font-bold lg:py-7 py-2 uppercase">
            Checkout
          </button>
        </div>
      </div>
      <Footer />
      <BackDrop />
    </main>
  );
};

export default CartLayout;
