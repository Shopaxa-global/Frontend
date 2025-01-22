import useSWR from "swr";
import { CartContent, CartContentResponse } from "../types";
import { fetcher } from "../utils";

export default function useGetCartContent(
  code: string,
  country: string
): CartContent {
  const { data, error, isLoading } = useSWR<CartContentResponse>("/cart", () =>
    fetcher("/cart", {
      body: JSON.stringify({
        code,
        country,
      }),
      method: "POST",
    })
  );

  return {
    cartContent: data,
    isLoading,
    isError: error,
  };
}
