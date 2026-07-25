import { redirect } from "react-router-dom";
import { api } from "../../api/api";

export const userLoader = async () => {
  try {
    const response = await api.get("/user/userInfo");
    const user = response.data;
    if (!user) {
      throw new Error("No Access");
    }
    return user;
  } catch (error) {
    console.error(
      "user Loader Request Error:",
      error.response?.data?.error ||
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "something went wrong",
    );
    return redirect("/login");
  }
};
