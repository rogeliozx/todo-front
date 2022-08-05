import axios from "axios";
const login = async (formData: FormData) => {
  try {
    const { data } = await axios.post("https://test-hermosillo.herokuapp.com/users/login", {
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    });
    localStorage.setItem("token", data.accessToken);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const signUp = async (formData: FormData) => {
  try {
    const { data } = await axios.post("https://test-hermosillo.herokuapp.com/users/sigin", {
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    });
    localStorage.setItem("token", data.accessToken);
  } catch (e: any) {
    throw new Error(e.message);
  }
};

const isLogin = (): boolean => {
  const existToken = localStorage.getItem("token") ? true : false;
  return existToken;
};

export { login, signUp, isLogin };
