import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import cancelIcon from "../../assets/images/cancel.svg";
import searchIcon from "../../assets/images/search.svg";
import { useCart } from "../../context/CartContext";
import { useLocation } from "../../context/LocationContext";
import { getCartContent } from "../../utils/https/cart";
import { LoadingSmall } from "../atom";
import CartModal from "./CartLayout";

const ErrorPopup = ({ message = "" }) => (
  <div
    className="absolute z-50 min-w-[200px] top-[41px] left-7"
    aria-live="polite"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="22"
      viewBox="0 0 27 22"
      fill="#fff"
      className="relative left-5 top-[0.20rem] -z-[1]"
    >
      <path
        d="M1.80866 21.25L13.5 1L25.1913 21.25H1.80866Z"
        fill="#FFF"
        strokeWidth={1}
        stroke="#0E0C22"
      />
    </svg>
    <div className="bg-white border border-black-100 p-5 md:text-xs text-[0.625rem] text-black-100 md:leading-[18px] leading-4 font-medium">
      {message}
    </div>
  </div>
);

type FormData = {
  code: string;
};

const NavSearchbar: React.FC = () => {
  const { location } = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setCartData, setError } = useCart();

  // LULLBZ1
  // L6ZVUYL

  const isLocationEmpty = !location || !location.country_code;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm<FormData>();
  const codeValue = watch("code");

  useEffect(() => {
    if (!errors) {
      return;
    }
    const handleClickOutside = (event: MouseEvent) => {
      if (errors) {
        if (
          formRef.current &&
          !formRef.current.contains(event.target as Node)
        ) {
          clearErrors("code");
        }
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (errors) {
        if (event.key === "Escape") {
          clearErrors("code");
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [clearErrors, errors]);

  const onSubmit = async (formData: FormData) => {
    setError(null);
    setCartData(null);
    if (!isLocationEmpty) {
      setIsLoading(true);
      const { data, error } = await getCartContent(
        formData.code,
        location.country_code
      );
      if (error) {
        setError(error);
      } else {
        setCartData(data!);
      }
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isLoading ? (
        <div className="bg-black bg-opacity-20 fixed top-0 bottom-0 inset-x-0 cursor-none z-[5000]" />
      ) : null}

      <form
        className={`h-[42px] z-[22] searchbar fixed w-full border-b border-[#000] bg-[#fff] mt-10`}
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        {isLoading ? (
          <div className="absolute top-[50%] lg:left-[1.2%] left-[26px] -translate-x-[50%] -translate-y-[50%]">
            <LoadingSmall />
          </div>
        ) : (
          <Image
            src={searchIcon}
            alt=""
            className="absolute top-[50%] lg:left-[1.2%] left-[26px] -translate-x-[50%] -translate-y-[50%]"
          />
        )}

        <input
          {...register("code", {
            required: "Code is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7}$/,
              message: "Code must be exactly 7 alphanumeric characters",
            },
          })}
          type="input"
          className="w-full h-full focus:outline-none text-[12px] placeholder:text-[12px] placeholder:text-[#939393] pl-[46px] disabled:cursor-not-allowed"
          placeholder="PASTE YOUR GENERATED CODE HERE"
          aria-label="Enter your 7 digit code here"
          disabled={isLocationEmpty}
        />
        {codeValue && (
          <button
            type="button"
            onClick={() => {
              reset();
            }}
            className="w-full"
          >
            <Image
              src={cancelIcon}
              alt="clear search"
              className={`absolute top-[50%] lg:left-[98.88%] left-[calc(100vw-20px)] -translate-x-[50%] -translate-y-[50%]`}
            />
          </button>
        )}
        {errors.code && <ErrorPopup message={errors.code.message} />}
      </form>

      {isModalOpen ? (
        <CartModal isOpen={isModalOpen} onClose={closeModal} />
      ) : null}
    </>
  );
};

export default NavSearchbar;
