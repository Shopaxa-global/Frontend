import type { StaticImageData } from "next/image";
import bank from "../assets/images/bank.png";
import masterCard from "../assets/images/mastercard.png";
import verve from "../assets/images/verve.png";
import visa from "../assets/images/visa.png";

export const paymentOptions: {
  name: string;
  img: string | StaticImageData;
}[] = [
  {
    name: "visa",
    img: visa,
  },
  {
    name: "master card",
    img: masterCard,
  },
  {
    name: "verve",
    img: verve,
  },
  {
    name: "bank transfer",
    img: bank,
  },
];
