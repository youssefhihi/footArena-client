import { ApiResponse } from '../../types/ApiResponse';

import axios, { AxiosError } from 'axios';
// API Options Interface: All the spices for your HTTP requests
export interface ApiOptions {
  data?: unknown; //Payload (JSON or FormData)
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // HTTP verbs
  headers?: Record<string, string>; // Custom headers
  verbose?: boolean; // Debug mode
}

export const fetchApi = async <T>(
  endpoint: string,
  options?: ApiOptions,
): Promise<ApiResponse<T>> => {
    // Grab auth token from localStorage
  const authToken = localStorage.getItem('authToken');

  // Default headers - We speak JSON here
  const headers: Record<string, string> = {
    Accept: 'application/json',
  };

  //Smart Content-Type detection: Set Content-Type if data is not FormData
  if (!(options?.data instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }else {
    headers['Content-Type'] = 'multipart/form-data';
    
  }

  // Add authorization header if token exists
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Merge custom headers (for those special API snowflakes)
  if (options?.headers) {
    Object.entries(options.headers).forEach(([key, value]) => {
      headers[key] = value;
    });
  }

  // Method detection: POST if data exists, else GET
  const method = options?.method ?? (options?.data ? 'POST' : 'GET');

  // Build the full URL (ensure your env variable is correctly set)
  const url = `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;

    // Verbose logging for those "What's happening?!" moments
  const verbose = options?.verbose ?? false;
  if (verbose) {
    console.log(`fetchApi: requesting ${url}`, { method, headers, data: options?.data });
  }

  try {
    // Launch the request with Axios (no more fetch() struggles)
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
    // Handle empty responses
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

    if (verbose && responseData.message) {
      console.log(`Success: ${responseData.message}`);
    }

    return responseData;
  } catch (error: unknown) {
     // Error ER: Unified error handling
    console.log('fetchApi error:', error);
    const axiosError = error as AxiosError;
    let errorMessage: unknown = { message: "An error occurred" };
    //  Error shape detection: Object, Array, or String?
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

    // Return standardized error format (TypeScript approved ✅)
    return {
      success: false,
      errors: errorMessage,
      message: errorMessage,
    } as ApiResponse<T>;
  }
};

export default fetchApi;
