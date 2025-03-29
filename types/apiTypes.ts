export type CartItemType = {
  colour: string;
  currency: string;
  img: string;
  name: string;
  parentId: string;
  price: number;
  productId: string;
  productURL: string;
  quantity: number;
  size: string;
  sku: string;
  maxAvailable: number;
};

export type CartContentResponse = {
  res_sts: boolean;
  res_msg: string;
  content: {
    bought: boolean;
    creationDate: {
      _seconds: number;
      _nanoseconds: number;
    };
    currency: string;
    item: CartItemType[];
    luxury: boolean;
    vendor: {
      name: string;
      icon: string;
    };
    conversion: Conversion;
  };
  code?: string;
};

export interface Conversion {
  from: string;
  to: string;
  rate: number;
  symbol: string;
}

export type FetchErrorType = {
  errorStatus: number;
  errorMsg: string;
};

export type CartContent = {
  cartContent: CartContentResponse | undefined;
  isLoading: boolean;
  error: FetchErrorType;
};
