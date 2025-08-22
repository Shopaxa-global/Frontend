"use client";
import { Checkbox, Input, Select } from "antd";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from "yup";
import input_eye_icon from "../../../assets/images/input-eye-icon.svg";
import { FormButton, Layout } from "../../../components/imports";
import { useAuth } from "../../../context/AuthContext";
import { RegisterValues } from "../../../interface";
import { register } from "../../../api/auth";
import { NotAuthRoute } from "../../../helpers/auth/NotAuthRoute";

const RegisterSchema = Yup.object().shape({
  civility: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Required"),
  phone: Yup.object().shape({
    countryCode: Yup.string().required("Required"),
    number: Yup.string().required("Required"),
  }),
  country: Yup.string().required("Country is required"),
  privacyPolicy: Yup.boolean()
    .oneOf([true], "You must accept the privacy policy")
    .required("You must accept the privacy policy"),
  newsletter: Yup.boolean(),
});

const Index = () => {
  const router = useRouter();
  const { openNotification } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>("NG");

  const initialValues: RegisterValues & { confirmPassword: string } = {
    civility: "",
    firstName: "",
    lastName: "",
    phone: {
      countryCode: "",
      number: "",
    },
    country: "",
    email: "",
    password: "",
    confirmPassword: "",
    privacyPolicy: false,
    newsletter: false,
  };

  const handleSubmit = (values: RegisterValues, errors?: any) => {
    let formValues = {
      civility: values.civility,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phone: {
        countryCode: values.phone.countryCode,
        number: values.phone.number,
      },
      country: values.country,
    };
    setLoading(true);
    register(formValues)
      .then((res) => {
        openNotification("topRight", {
          message: "Account Verified",
          type: "success",
          description: res?.data?.res_msg,
        });
        router.push("/auth/login");
      })
      .catch((err: any) => {
        console.log(err);
        openNotification("topRight", {
          message: "Error",
          type: "error",
          description: err?.response?.data?.res_msg,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
    <NotAuthRoute />
    <Layout>
      <section className="relative -top-10 left-0 w-full h-full font-HM-Sans bg-[#fff] translate-y-[40px] z-[5]">
        <div className="bg-white border border-l-[#0E0C22] border-r-[#0E0C22] max-w-[736px] w-full mx-auto min-h-screen h-full pb-[52px]">
          <h2 className="text-[#0E0C22] font-semibold text-center font-Silka-SemiBold text-[22px] mt-[77px]">
            Create an account
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={RegisterSchema}
            onSubmit={handleSubmit}
          >
            {({
              errors,
              touched,
              handleBlur,
              setFieldValue,
              values,
              isSubmitting,
              handleChange,
            }) => (
              <Form className="flex flex-col gap-[20px] md:px-[97px] px-[20px] mt-[67px]">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      Civility*
                    </span>
                    <span className="text-xs text-[#707070] font-Silka">
                      *required
                    </span>
                  </div>
                  <Select
                    options={[
                      { label: "Select", value: "select" },
                      { label: "Mr", value: "Mr" },
                      { label: "Mrs", value: "Mrs" },
                    ]}
                    defaultValue="select"
                    onBlur={handleBlur}
                    onChange={(value) => setFieldValue("civility", value)}
                    className="rounded-[5px] w-full h-[51px] border-[#D9D9D900] border-[0.9px] outline-none focus:outline-none hover:outline-none"
                    style={{
                      border: "1px solid #0E0C22",
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      First Name*
                    </span>
                    <span className="text-xs text-[#707070] font-Silka invisible">
                      *required
                    </span>
                  </div>
                  <Input
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    className="rounded-[5px] h-[51px] border-[1px] border-[#0E0C22]"
                    onBlur={handleBlur}
                    status={
                      errors.firstName && touched.firstName ? "error" : ""
                    }
                  />
                  {errors.firstName && touched.firstName && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      Last Name*
                    </span>
                    <span className="text-xs text-[#707070] font-Silka invisible">
                      *required
                    </span>
                  </div>
                  <Input
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    className="rounded-[5px] h-[51px] border-[1px] border-[#0E0C22]"
                    onBlur={handleBlur}
                    status={errors.lastName && touched.lastName ? "error" : ""}
                  />
                  {errors.lastName && touched.lastName && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </div>
                  )}
                </div>

                <div className="">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      Prefix*
                    </span>
                    <span className="text-xs text-[#707070] font-Silka relative -left-[268px] md:block hidden ">
                      Mobile Phone Number*
                    </span>
                  </div>
                  <PhoneInput
                    defaultCountry="NG"
                    onCountryChange={(country) => {
                      setSelectedCountry(country);
                    }}
                    value={values.phone.number}
                    onBlur={handleBlur}
                    onChange={(value) => {
                      setFieldValue("phone", {
                        countryCode: selectedCountry
                          ? `${getCountryCallingCode(selectedCountry)}`
                          : "",
                        number: value,
                      });
                    }}
                    className={
                      errors.phone && touched.phone ? "border-red-500" : ""
                    }
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.phone.number}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      Email*
                    </span>
                    <span className="text-xs text-[#707070] font-Silka invisible">
                      *required
                    </span>
                  </div>
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="rounded-[5px] h-[51px] border-[1px] border-[#0E0C22]"
                    onBlur={handleBlur}
                    status={errors.email && touched.email ? "error" : ""}
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      Password*
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      className="rounded-[5px] h-[51px] border-black-100"
                      status={
                        errors.password && touched.password ? "error" : ""
                      }
                      onBlur={handleBlur}
                    />
                    <Image
                      onClick={() => setShowPassword(!showPassword)}
                      src={input_eye_icon}
                      alt="input-eye-icon"
                      className="absolute right-[0] top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-xs mt-1 relative">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      Confirm Password*
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="rounded-[5px] h-[51px] border-black-100"
                      status={
                        errors.confirmPassword && touched.confirmPassword
                          ? "error"
                          : ""
                      }
                    />
                    <Image
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      src={input_eye_icon}
                      alt="input-eye-icon"
                      className="absolute right-[0] top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    />
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#707070] font-Silka">
                      Country of residence*
                    </span>
                  </div>
                  <Select
                    options={[
                      { label: "Select", value: "select" },
                      { label: "Nigeria", value: "nigeria" },
                      { label: "Ghana", value: "ghana" },
                      { label: "Egypt", value: "egypt" },
                    ]}
                    defaultValue="select"
                    onChange={(value) => setFieldValue("country", value)}
                    onBlur={handleBlur}
                    className="rounded-[5px] w-full h-[51px] border-black-100 outline-none focus:outline-none hover:outline-none"
                    style={{
                      border: "1px solid #0E0C22",
                    }}
                  />
                </div>

                <div className="">
                  <div className="flex items-start gap-[13px] font-Silka">
                    <Checkbox
                      checked={values.privacyPolicy}
                      onChange={(e) =>
                        setFieldValue("privacyPolicy", e.target.checked)
                      }
                      onBlur={handleBlur}
                    />
                    <span className="text-sm text-[#0E0C22]">
                      I have read and understood the{" "}
                      <Link className="underline" href="#">
                        privacy policy
                      </Link>{" "}
                      and agree to the{" "}
                      <Link className="underline" href="#">
                        Term of <br /> use.
                      </Link>
                    </span>
                  </div>
                  {errors.privacyPolicy && touched.privacyPolicy && (
                    <div className="text-red-500 text-xs mt-1">
                      {errors.privacyPolicy}
                    </div>
                  )}
                </div>

                <div className="">
                  <div className="flex items-start gap-[13px]">
                    <Checkbox
                      checked={values.newsletter}
                      onChange={(e) =>
                        setFieldValue("newsletter", e.target.checked)
                      }
                      onBlur={handleBlur}
                    />
                    <span className="text-sm text-[#0E0C22] font-Silka">
                      I would like to receive updates about Shopaxa new
                      activities, exclusive products, tailored services and to
                      have a personalised client experience based on my
                      interests.
                    </span>
                  </div>
                </div>
                <FormButton
                  text="CREATE MY PROFILE"
                  disabled={Object.keys(errors).length > 0 || isSubmitting}
                  //disabled={false}
                  onSubmit={() => handleSubmit(values, errors)}
                  extraStyle="mt-[35px] mb-[32px]"
                  loading={loading}
                />

                <p className="text-center text-[15px]">
                  Already have a profile?{" "}
                  <span
                    onClick={() => router.push("/auth/login")}
                    className="underline text-right w-fit self-center cursor-pointer"
                  >
                    Log in
                  </span>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default Index;
