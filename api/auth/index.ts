import axios from "axios";
import { RegisterValues } from "../../interface";
import { auth, provider, signInWithPopup, signOut } from "../../lib/firebase";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const register = async (values: RegisterValues) => {
  try {
    const response = await axios.post(`${BASE_URL}/shopa/signup`, values);
    //console.log("response", response);
    if (response.data.res_sts !== true) {
      throw new Error(response.data.res_msg || "Registration failed");
    }
    localStorage.setItem("user", JSON.stringify(response.data.data));
    return response;
  } catch (error: any) {
    throw error;
  }
};

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/shopa/login`, {
      email,
      password,
    });
  } catch (error: any) {
    throw error;
  }
};




const getUserProfile = async (user: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/shopa/profile`,
      {
        uuid: user.uid,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.accessToken}`,
        },
      }
    );
    return response;
  } catch (error: any) {
    throw error;
  }
};

export { login, register, getUserProfile };
