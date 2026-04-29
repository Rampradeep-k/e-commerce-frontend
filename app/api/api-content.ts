import axios from "axios";
interface errorProps{
  message?: string;
  response?: {
    data?: {
      error?: string;
    }
  }
}
const axiosInstance = axios.create({
  baseURL: 'https://e-commerce-api-qzm9.onrender.com',
  // baseURL: 'http://localhost:3001',
  headers: {
    'Cache-Control': 'no-cache',
  },
  withCredentials: true
});

export async function ApiCall(request : any, endpoint : string) {
  try {

    // return await axiosInstance.post(endpoint, request);
    const response = await axiosInstance.post(endpoint, request);
    // console.log(response);
    localStorage.setItem('token', response.headers.token)
    return response
  } catch (error : any) {
    return { error: error };
  }
}

export async function ApiCallPOST(request : any, endpoint : string) {
  try {
    const authToken = localStorage.getItem('token');

    const response = await axiosInstance.post(endpoint, request, {
      headers: {
        authorization: "Bearer " + authToken,
      },
    });


    return { data: response.data };
  } catch (error : any) {
    return { error: error.message || 'Unknown error' };
  }
}

export async function ApiCallPut(request : any, endpoint : string) {
  try {
    const authToken = localStorage.getItem('token');

    const response = await axiosInstance.put(endpoint, request, {
      headers: {
        authorization:"Bearer " +  authToken,
      },
    });

    return { data: response.data };
  } catch (error : any) {
    return {
      error: error?.response?.data?.error || 'Something went wrong',
    };
  }
}


export async function ApiCallDelete(request : any, endpoint : string) {
  try {
    const authToken = localStorage.getItem('token');

    const response = await axiosInstance.delete(endpoint, {
      headers: {
        authorization:"Bearer " +  authToken,
      },
    });

    return { data: response.data };
  } catch (error : any) {
    return {
      error: error?.response?.data?.error || 'Something went wrong',
    };
  }
}


export async function ApiCallGEt(request : any, endpoint : string) {
  try {
    const authToken = localStorage.getItem('token');

    const response : any = await axiosInstance.get(endpoint, {
      params: request,
      headers: {
        authorization: "Bearer " + authToken,
      },
    });

    return response?.data || [] 

  } catch (error : any) {
    // ✅ Check backend error message safely
    const errorMessage =
      error?.response?.data?.error || error.message || 'Unknown error';

    // ✅ Handle expired / invalid token
    if (errorMessage === 'Invalid or expired token') {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return;
    }

    return { error: errorMessage };
  }
}


