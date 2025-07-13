export interface RegisterValues {
    civility: string;
    firstName: string;
    lastName: string;
    phone: {
      countryCode: string;
      number: string;
    };
    country: string;
    email: string;
    password: string;
    privacyPolicy?: boolean;
    newsletter?: boolean;
  }

  export interface LoginValues {
    email: string;
    password: string;
  }