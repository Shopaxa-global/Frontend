import Image from "next/image";
import React, { useState } from "react";

import closeIcon from "../../assets/images/close-no-outline.svg";
import convertIcon from "../../assets/images/convert.svg";
// import gallery2 from "../../assets/images/sl_mobile2.JPG";

type CartItemProps = {
  quantity?: number;
  name: string;
  price: string;
  convertedPrice: string;
  properties: {
    size?: string;
    color?: string;
  };
};

const CartItem: React.FC<CartItemProps> = ({
  name,
  price,
  quantity = 1,
  convertedPrice,
  properties,
}) => {
  const [count, setCount] = useState(quantity);

  return (
    <div className="w-full border-b md:border-r md:border-0 md:shadow-[inset_0_-1px_0_0_black_,_inset_0_1px_0_0_black] border-black-100 text-xs md:text-sm font-Silka flex md:flex-col flex-row">
      <Image
        alt=""
        width={200}
        height={200}
        src="https://balenciaga.dam.kering.com/m/7e5be3813547265c/Thumbnail-808805TQP134100_G.jpg"
        className="md:w-full md:h-[23.75rem] h-[15.625rem] w-6/12 object-cover"
      />
      <div className="p-3 md:border-t border-l md:border-l-0 border-black-100 uppercase md:flex flex-row-reverse items-start justify-between w-6/12 md:w-full h-[15.625rem] md:h-auto">
        <button
          aria-label={`remove ${name} from cart`}
          className="w-full md:w-auto flex justify-end my-4 md:my-0"
        >
          <Image src={closeIcon} alt="" />
        </button>
        <div className="w-[80%] flex flex-col justify-between h-[calc(100%-5rem)] md:block">
          <div>
            <div className="flex justify-between">
              <p
                className="text-black-100 truncate"
                aria-label={name}
                title={name}
              >
                {name}
              </p>
            </div>
            <div className="flex gap-2 my-1 items-center">
              <p>{price} GBP</p>
              <Image
                src={convertIcon}
                alt=""
                aria-label="converted to"
                className="w-auto h-auto"
              />
              <p>{convertedPrice} NGN</p>
            </div>
            <div className="flex gap-2 items-center">
              <p>{properties.size}</p>
              <p>|</p>
              <p>{properties.color}</p>
            </div>
          </div>
          <div className="mt-3 flex">
            <p className="border px-[0.875rem] py-[0.375rem] border-black-100 text-xs md:text-[0.938rem]">
              {count}
            </p>
            <button
              aria-label={`add another unit for ${name}`}
              className="border-y px-[0.875rem] py-[0.375rem] border-black-100"
              onClick={() => setCount(count + 1)}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.89286 6.10714V1H6.10714V6.10714H1V6.89286H6.10714V12H6.89286V6.89286H12V6.10714H6.89286Z"
                  fill="#0E0C22"
                  stroke="#0E0C22"
                  strokeWidth="0.5"
                />
              </svg>
            </button>
            <button
              className="border px-[0.875rem] py-[0.375rem] border-black-100"
              aria-label={`remove a unit from ${name}`}
              onClick={() => setCount(count - 1)}
            >
              <svg
                width="16"
                height="3"
                viewBox="0 0 16 3"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15 2H1V1H15V2Z"
                  fill="black"
                  stroke="black"
                  strokeWidth="0.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
