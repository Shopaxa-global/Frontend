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
      <div className="min-h-[500px] mt-10">
        <div className="flex items-center justify-between px-[10px] py-3 text-xs leading-[18px] font-HM-Sans text-black-100 uppercase border-b border-black-100">
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
      </div>
      <Footer />
      <BackDrop />
    </main>
  );
};

export default CartLayout;
