export type CartItem = {
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
    item: CartItem[];
    luxury: boolean;
    vendor: {
      name: string;
      icon: string;
    };
    available: boolean;
    maxAvailable: number | null;
  };
};

export type FetchErrorType = {
  errorStatus: number;
  errorMsg: string;
};

export type CartContent = {
  cartContent: CartContentResponse | undefined;
  isLoading: boolean;
  error: FetchErrorType;
};
