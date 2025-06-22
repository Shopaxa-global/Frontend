import { Button, Input } from "antd";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import input_eye_icon from "../../../assets/images/input-eye-icon.svg";
import { FormButton, Layout } from "../../../components/imports";

import apple_icon from "../../../assets/images/Apple.svg";
import google_icon from "../../../assets/images/Google.svg";

interface LoginValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: LoginValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginValues, errors?: any) => {
    console.log(values);
  };

  return (
    <Layout>
      <section className="relative -top-10 left-0 w-full h-full font-HM-Sans z-[5] bg-[#fff] translate-y-[40px]">
        <div className="bg-white border border-l-[#0E0C22] border-r-[#0E0C22] max-w-[736px] w-full mx-auto min-h-screen h-full pb-[52px]">
          <h2 className="text-[#0E0C22] font-semibold text-center font-Silka-SemiBold text-[22px] mt-[77px]">
            LOGIN
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
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

                <Link
                  href="/auth/register"
                  className="text-right text-sm underline w-fit self-end cursor-pointer text-[#0E0C22] font-Silka "
                >
                  Forgot password?
                </Link>

                <FormButton
                  text="LOGIN"
                  disabled={Object.keys(errors).length > 0 || isSubmitting}
                  onSubmit={() => handleSubmit(values, errors)}
                  extraStyle=""
                />

                <Link
                  href="/auth/register"
                  className="text-center text-sm underline  w-fit self-center cursor-pointer text-[#0E0C22]"
                >
                  Create a profile
                </Link>

                <div className="flex items-center gap-8 w-fit mx-auto mt-10">
                  <div className="w-[102px] h-[0.3px] bg-[#707070]" />
                  <p className="text-xs text-[#707070] font-Silka">OR</p>
                  <div className="w-[102px] h-[0.3px] bg-[#707070]" />
                </div>

                <div className="flex flex-col items-center gap-4 mt-10">
                  <Button
                    className="w-full h-[51px] bg-[#F7F7F7] text-[#1F1F1F] font-Silka text-sm border-0 rounded-[5px] flex items-center justify-center gap-2 hover:!bg-[#F7F7F7] hover:!text-[#1F1F1F] hover:!border-0"
                    style={{ boxShadow: "none" }}
                  >
                    <Image src={google_icon} alt="google" />
                    Sign in with Google
                  </Button>
                  <Button
                    className="w-full h-[51px] bg-[#0E0C22] text-white font-Silka text-sm flex items-center justify-center gap-2 hover:!bg-[#0E0C22] hover:!text-white hover:!border-0"
                    style={{ boxShadow: "none" }}
                  >
                    <Image src={apple_icon} alt="apple" />
                    Sign in with Apple
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
