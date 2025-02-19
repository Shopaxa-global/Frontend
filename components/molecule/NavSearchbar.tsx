import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import cancelIcon from "../../assets/images/cancel.svg";
import searchIcon from "../../assets/images/search.svg";
import { useLocation } from "../../context/LocationContext";
import CartModal from "../compound/CartLayout";

const ErrorModal = ({ message = "" }) => (
  <div
    className="absolute z-50 min-w-[200px] top-[42px] left-7"
    aria-live="assertive"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="22"
      viewBox="0 0 27 22"
      fill="#fff"
      className="relative left-5"
    >
      <path
        d="M1.80866 21.25L13.5 1L25.1913 21.25H1.80866Z"
        fill="#FFF"
        strokeWidth={1}
        stroke="#0E0C22"
      />
    </svg>
    <div className="bg-white border border-black-100 p-5 text-xs text-black-100 leading-[18px] font-medium">
      {message}
    </div>
  </div>
);

type FormData = {
  code: string;
};

const NavSearchbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchvalue, setSearchValue] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);
  const { location } = useLocation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        clearErrors("code");
      }
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearErrors("code");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [clearErrors]);

  const onSubmit = async (data: FormData) => {
    if (location) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <form
        className={`h-[42px] z-[22] searchbar fixed w-full border-b border-[#000] bg-[#fff] mt-10`}
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <Image
          src={searchIcon}
          alt=""
          className="absolute top-[50%] lg:left-[1.2%] left-[26px] -translate-x-[50%] -translate-y-[50%]"
        />
        <input
          {...register("code", {
            required: "Code is required",
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7}$/,
              message: "Code must be exactly 7 alphanumeric characters",
            },
          })}
          type="input"
          className="w-full h-full focus:outline-none uppercase text-[12px] placeholder:text-[12px] placeholder:text-[#939393] pl-[46px]"
          placeholder="PASTE YOUR GENERATED CODE HERE"
          aria-label="Enter your 7 digit code here"
        />
        <button
          type="button"
          onClick={() => {
            reset();
            clearErrors();
          }}
          className="w-full"
        >
          <Image
            src={cancelIcon}
            alt="clear search"
            className={` ${
              searchvalue ? "block" : "hidden"
            } absolute top-[50%] lg:left-[98.88%] left-[calc(100vw-20px)] -translate-x-[50%] -translate-y-[50%]`}
          />
        </button>
        {errors.code && <ErrorModal message={errors.code.message} />}
      </form>
      <CartModal
        isOpen={isModalOpen}
        onClose={closeModal}
        code={searchvalue}
        location={location?.country_code}
      />
    </>
  );
};

export default NavSearchbar;
