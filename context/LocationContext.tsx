import React, { createContext, useContext, useState } from "react";

type LocationData = {
  country: string;
  country_code: string;
  country_flag: string;
  currency_code: string;
  [key: string]: any;
};

type LocationContextType = {
  location: LocationData | null;
  fetchLocation: () => Promise<void>;
};

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [location, setLocation] = useState<LocationData | null>(null);

  const fetchLocation = async () => {
    if (location) return; // Avoid re-fetching if already stored

    try {
      const res = await fetch("https://ipwhois.app/json/");
      const data = await res.json();

      if (data?.country_code) {
        setLocation(data);
      } else {
        console.error("Could not detect country.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <LocationContext.Provider value={{ location, fetchLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
