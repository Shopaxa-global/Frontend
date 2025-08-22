import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Select } from "antd";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import PhoneInput, { getCountryCallingCode } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import PrivateRoute from "../../../helpers/auth/PrivateRoute";
import { Layout, FormButton } from "../../../components/imports";
import { useAuth } from "../../../context/AuthContext";

interface CompleteProfileValues {
  civility: string;
  phone: {
    countryCode: string;
    number: string;
  };
  country: string;
}

const CompleteProfilesSchema = Yup.object().shape({
  civility: Yup.string().required("Required"),
  phone: Yup.object().shape({
    countryCode: Yup.string().required("Required"),
    number: Yup.string().required("Required"),
  }),
  country: Yup.string().required("Country is required"),
});

const Index = () => {
  const router = useRouter();
  const { openNotification } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<any>("NG");

  const initialValues: CompleteProfileValues = {
    civility: "",
    phone: {
      countryCode: "",
      number: "",
    },
    country: "",
  };

  const handleSubmit = async (values: CompleteProfileValues, errors?: any) => {
    setLoading(true);
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      openNotification("topRight", {
        message: "Profile updated successfully",
        type: "success",
        description: "Your profile has been updated.",
      });
    } catch (error: any) {
      openNotification("topRight", {
        message: "Error",
        type: "error",
        description: error?.response?.data?.res_msg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <Layout>
        <section className="relative -top-10 left-0 w-full h-full font-HM-Sans bg-[#fff] translate-y-[40px] z-[5]">
          <div className="bg-white border border-l-[#0E0C22] border-r-[#0E0C22] max-w-[736px] w-full mx-auto min-h-screen h-full pb-[52px]">
            <h2 className="text-[#0E0C22] font-semibold text-center font-Silka-SemiBold text-[22px] mt-[77px]">
              COMPLETE PROFILE
            </h2>
            <Formik
              initialValues={initialValues}
              validationSchema={CompleteProfilesSchema}
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

                  <FormButton
                    text="CREATE MY PROFILE"
                    disabled={Object.keys(errors).length > 0 || isSubmitting}
                    //disabled={false}
                    onSubmit={() => handleSubmit(values, errors)}
                    extraStyle="mt-[35px] mb-[32px]"
                    loading={loading}
                  />
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </Layout>
    </PrivateRoute>
  );
};

export default Index;
