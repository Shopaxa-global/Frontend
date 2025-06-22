import axios from "axios";
import { RegisterValues } from "../../interface";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const register = async (values: RegisterValues) => {
  try {
    const response = await axios.post(`${BASE_URL}/shopa/signup`, values);
    if (!response.data.success) {
      throw new Error(response.data.res_msg || "Registration failed");
    }
    return response;
  } catch (error: any) {
    throw error;
  }
};

const login = async (email: string, password: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }
  );
};

export { login, register };
