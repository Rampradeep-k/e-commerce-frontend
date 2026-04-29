import { ApiCall, ApiCallGEt } from "./api-content";

interface ResponseProps {
  data?: any;
  error?: any;
}

export const getUser = (data: any) => {
  return async (dispatch: any) => {
    const res: ResponseProps = await ApiCallGEt(data, "/products");
    
    if (res.error) {
      dispatch({ type: "GET_USER_FAILURE", payload: res.error });
    } else {
      dispatch({ type: "GET_USER_SUCCESS", payload: res.data });
    }
  };
};
