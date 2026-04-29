import { ApiCall } from "./api-content";

interface ResponseProps {
  data?: any;
  error?: any;
}

export const loginUser = (data: any) => {
  return async (dispatch: any) => {
    const res: ResponseProps = await ApiCall(data, "/login");
    console.log(res);

    if (res.error) {
      dispatch({ type: "LOGIN_FAILURE", payload: res.error });
    } else {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    }
  };
};
