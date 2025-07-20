import { useEffect, useState } from "react";
import { Heading2, Layout } from "../../components/imports";
import { useAuth } from "../../context/AuthContext";
import { REDUCERS } from "../../types";
import PrivateRoute from "../../helpers/auth/PrivateRoute";
import { getUserProfileFromLocalStorage } from "../../utils/helpers";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { dispatch, handleGoogleLogout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("MY SHOPAXA");


  const tabs = ["MY SHOPAXA", "ORDERS", "PROFILE", "LOG OUT"];

  const handleTabClick = (tab: string) => {
    if (tab === "LOG OUT") {
      // Handle logout logic here
      handleGoogleLogout();
      router.push("/auth/login");
    } else {
      setActiveTab(tab);
    }
  };

  // Get user name safely
  const getUserName = () => {
    const userProfile = getUserProfileFromLocalStorage();
    return userProfile?.firstName || "IREOLUWA";
  };

  return (
    <PrivateRoute>
      <Layout>
        <div className="min-h-screen bg-white">
          {/* Welcome Section */}
          <div className="bg-gray-50 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
              <div className="text-center">
                <Heading2
                  title={`WELCOME,`}
                  customClass="!text-2xl md:!text-3xl lg:!text-4xl mb-2"
                />
                <Heading2
                  title={getUserName()}
                  customClass="!text-2xl md:!text-3xl lg:!text-4xl font-HM-Sans-Bold"
                />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-8 py-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabClick(tab)}
                    className={`px-4 py-2 text-sm md:text-base font-Silka-SemiBold transition-all duration-200 ${
                      activeTab === tab
                        ? "text-black-100 border-b-2 border-black-100"
                        : "text-gray-600 hover:text-black-100"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* We Securely Accept */}
              <div className="text-center lg:text-left">
                <h3 className="font-Silka-SemiBold text-lg md:text-xl mb-6 text-black-100">
                  WE SECURELY ACCEPT
                </h3>
                <div className="flex justify-center lg:justify-start items-center gap-4">
                  {/* Visa Icon */}
                  <div className="w-12 h-8 md:w-16 md:h-10 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm md:text-base">
                      VISA
                    </span>
                  </div>

                  {/* Mastercard Icon */}
                  <div className="w-12 h-8 md:w-16 md:h-10 bg-gray-800 rounded flex items-center justify-center">
                    <div className="flex">
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-400 rounded-full -ml-1"></div>
                    </div>
                  </div>

                  {/* PayPal Icon */}
                  <div className="w-12 h-8 md:w-16 md:h-10 bg-blue-500 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs md:text-sm">
                      PayPal
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Support */}
              <div className="text-center">
                <h3 className="font-Silka-SemiBold text-lg md:text-xl mb-6 text-black-100">
                  CUSTOMER SUPPORT
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    Our client advisors are available
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Mon-Sat 9:30AM - 7PM
                  </p>
                  <div className="mt-6">
                    <button className="border border-black-100 px-6 py-3 text-sm md:text-base font-Silka-SemiBold hover:bg-black-100 hover:text-white transition-colors duration-200">
                      CALL US AT
                    </button>
                    <p className="mt-2 text-black-100 font-Silka-SemiBold text-sm md:text-base">
                      +234 90 60 34 75 21
                    </p>
                  </div>
                </div>
              </div>

              {/* 70% Off Delivery */}
              <div className="text-center lg:text-right">
                <h3 className="font-Silka-SemiBold text-lg md:text-xl mb-6 text-black-100">
                  70% OFF THE DELIVERY
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    We offer 70% Off on delivery
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    for Asos and Shein orders. For
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    further details, click
                  </p>
                  <button className="text-black-100 font-Silka-SemiBold underline hover:no-underline text-sm md:text-base">
                    Shop Global
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="text-center">
                <p className="text-gray-600 text-sm">© 2023 Shopaxa</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </PrivateRoute>
  );
};

export default Dashboard;
