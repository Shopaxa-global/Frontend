const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

import { CartContentResponse } from "../../types";
export const getCartContent = async (code: string, country: string) => {
  const url = `${BASE_URL}/cart?code=${code.toUpperCase()}&countryCode=${country.toUpperCase()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("Sorry, the code you entered doesn't exist");
      }
      const errorData = await response.json();
      throw new Error(
        errorData?.message || `HTTP error! Status: ${response.status}`
      );
    }
    const data: CartContentResponse = await response.json();
    return { data: { code: code, ...data } };
  } catch (error: any) {
    return { resError: error.message };
  }
};
