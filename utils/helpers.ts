import { format } from "date-fns";


export function formatCreationDate(creationDate: {
  _seconds: number;
  _nanoseconds: number;
}): { formattedDate: string; formattedTime: string } {
  const milliseconds =
    creationDate._seconds * 1000 + creationDate._nanoseconds / 1e6;
  const date = new Date(milliseconds);

  const formattedDate = format(date, "dd MMM yyyy");
  const formattedTime = format(date, "hh:mm a");
  return { formattedDate, formattedTime };
}

export function formatCurrency(value: number | string): string {
  const numValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numValue)) {
    return "";
  }
  return numValue.toLocaleString("en-US");
}

export function formatPrice(
  price: number | string,
  decimals: number = 1
): number {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price;
  return parseFloat(numericPrice.toFixed(decimals));
}


export const storeUserProfileInLocalStorage = (profile: any) => {
  localStorage.setItem("userProfile", JSON.stringify(profile));
};

export const getUserProfileFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const profile = localStorage.getItem("userProfile");
    return profile ? JSON.parse(profile) : null;
  }
  return null;
};


