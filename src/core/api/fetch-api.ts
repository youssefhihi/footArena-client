import axios, { AxiosError } from 'axios';
import { ApiResponse } from '../../types/ApiResponse';

export interface ApiOptions {
  data?: unknown;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  verbose?: boolean;
  displayProgress?: boolean;
  displaySuccess?: boolean;

}

export const fetchApi = async <T>(
  endpoint: string,
  options?: ApiOptions,
): Promise<ApiResponse<T>> => {
  const authToken = localStorage.getItem('authToken');

  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  // Set Content-Type if data is not FormData
  // if (!(options?.data instanceof OrganizationRequest)) {
  //   console.log('fetchApi: setting content type');
  // }else {
  // }
  
  if (options?.data && typeof options?.data === 'object') {
    console.log("is a object");
    if (Object.values(options?.data).some(value => value instanceof File)) {
      console.log("is a file");
      headers['Content-Type'] = 'multipart/form-data';
    }else{
      console.log("is not a file");
      headers['Content-Type'] = 'application/json';
    }
  }
  // Add authorization header if token exists
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Merge in any custom headers passed in options
  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers[key] = value;
    });
  }

  // Determine the HTTP method
  const method = options?.method ?? (options?.data ? 'POST' : 'GET');

  // Build the full URL (ensure your env variable is correctly set)
  const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

  const verbose = options?.verbose ?? false;
  if (verbose) {
    console.log(`fetchApi: requesting ${url}`, { method, headers, data: options?.data });
  }

  try {
    const response = await axios.request<ApiResponse<T>>({
      url,
      method,
      headers,
      data: options?.data,
    });
    console.log('fetchApi: response', response);

    if (verbose) {
      console.log('fetchApi: response', response.data);
    }

    if (!response.data) {
      console.log('fetchApi: no response data');
      return {
        success: false,
        message: "An error occurred",
        errors: { message: "An error occurred" },
      };
    }

    const responseData = response.data;

    // If the response doesn't indicate success and no errors are provided, add a default error.
    if (!responseData.success && !responseData.errors) {
      responseData.success = false;
      responseData.errors ={ message: "An error occurred" };
    }

    if (verbose && options?.displaySuccess && responseData.message) {
      console.log(`Success: ${responseData.message}`);
    }

    return responseData;
  } catch (error: unknown) {
    console.log('fetchApi error:', error);
    const axiosError = error as AxiosError;
    let errorMessage: unknown = { message: "An error occurred" };
    if (axiosError.response && axiosError.response.data) {
      const data = axiosError.response.data as ApiResponse<unknown>;

      if (data.errors && typeof data.errors === 'object') {
        console.log('object');
        errorMessage = Object.keys(data.errors).map((field) => ({
          field,
          message: data.errors[field],
      }));

      } else if (Array.isArray(data.errors)) {
        console.log('array');
        errorMessage = (data.errors as Record<string, string>[]).map(err => err.message || "An error occurred");
      } else if (typeof data.message === "string") {
        console.log('string');
        errorMessage = [data.message];
      }
    }
    
    if (verbose) {
      console.error('fetchApi error:', errorMessage);
    }
    return {
      success: false,
      errors: errorMessage,
      message: errorMessage,
    } as ApiResponse<T>;
  }
};

export default fetchApi;
