import useSWR from "swr";
import { CartContent, CartContentResponse } from "../types";
import { fetcher } from "../utils";

export default function useGetCartContent(
  code: string,
  country: string
): CartContent {
  const { data, error, isLoading } = useSWR<CartContentResponse>(
    `/cart?code=${code}&countryCode=${country}`, // Pass params as query string
    fetcher
  );

  if (error && error.errorStatus === 404) {
    error.errorMsg = "Sorry, the code you entered doesn’t exist";
  }

  return {
    cartContent: data,
    isLoading,
    error,
  };
}
