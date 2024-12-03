import axios, { AxiosError, AxiosResponse } from "axios";
import { DangerRight } from "../toastServices";
import { baseURL } from "../config";

// Helper function to get the token from localStorage
// const getTokenData = (): string | null => localStorage.getItem("token");
// const token = localStorage.getItem("token");
// export const apiInstance = axios.create({
//   baseURL: baseURL,
//   headers: {
//     'Content-Type': 'application/json', 
//     'Authorization': `Bearer ${token}`,
// // You can customize headers if needed
// },
// });

// // Create a cancel token source for aborting requests if needed
// const cancelTokenSource = axios.CancelToken.source();
// apiInstance.defaults.headers.common["Authorization"] = token as string; // Assert type as string if token is not null

// // Add request interceptor
// apiInstance.interceptors.request.use(
//   function (config: any) {
//     config.cancelToken = cancelTokenSource.token;
//     return config;
//   },
//   function (error: any) {
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor
// // apiInstance.interceptors.response.use(
// //   function (response: AxiosResponse) {
// //     return response.data;
// //   },
// //   function handleError(error: AxiosError<any>) {
// //     if (!error?.response?.data?.message) {
// //       console.log("Error+++++:", error);
// //       DangerRight("Something went Wrong!");
// //     }
// //     if (
// //       error?.response?.data?.code === "E_USER_NOT_FOUND" ||
// //       error?.response?.data?.code === "E_UNAUTHORIZED"
// //     ) {
// //       localStorage.clear();
// //       // window.location.reload(false);
// //     }

// //     if (typeof error?.response?.data?.message === "string") {
// //       DangerRight(error.response.data.message);
// //     } else {
// //       for (let i = 0; i < error?.response?.data?.message?.length; i++) {
// //         DangerRight(error.response.data.message[i]);
// //       }
// //       return Promise.reject(error);
// //     }
// //   }
// // );

// apiInstance.interceptors.response.use(
//   function (response: AxiosResponse) {
//     return response.data;
//   },
//   function handleError(error: AxiosError<any>) {
//     if (!error?.response?.data?.message) {
//       console.log("Error+++++:", error);
//       DangerRight("Something went Wrong!");
//     } else {
//       const messages = error?.response?.data?.message;

//       if (Array.isArray(messages)) {
//         // If messages is an array, iterate and show each message
//         messages.forEach((msg: string) => {
//           DangerRight(msg);  // Assuming DangerRight accepts a single message string
//         });
//       } else if (typeof messages === 'string') {
//         // If it's a single string message
//         DangerRight(messages);
//       } else {
//         DangerRight("Unexpected error occurred.");
//       }
//     }

//     if (
//       error?.response?.data?.code === "E_USER_NOT_FOUND" ||
//       error?.response?.data?.code === "E_UNAUTHORIZED"
//     ) {
//       localStorage.clear();
//       // Optionally reload the page here
//       // window.location.reload();
//     }

//     return Promise.reject(error);
//   }
// );


const token = localStorage.getItem("token");
export const apiInstance = axios.create({
  baseURL: baseURL,
  headers: {
    'Authorization': `Bearer ${token}`,  // Only set the Authorization header
  },
});

// Create a cancel token source for aborting requests if needed
const cancelTokenSource = axios.CancelToken.source();
apiInstance.defaults.headers.common["Authorization"] = token as string; // Ensure token is set as string

// Add request interceptor
apiInstance.interceptors.request.use(
  function (config: any) {
    config.cancelToken = cancelTokenSource.token;
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiInstance.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function handleError(error: AxiosError<any>) {
    if (!error?.response?.data?.message) {
      console.log("Error+++++:", error);
      DangerRight("Something went wrong!");
    } else {
      const messages = error?.response?.data?.message;

      if (Array.isArray(messages)) {
        // If messages is an array, iterate and show each message
        messages.forEach((msg: string) => {
          DangerRight(msg);  // Assuming DangerRight accepts a single message string
        });
      } else if (typeof messages === 'string') {
        // If it's a single string message
        DangerRight(messages);
      } else {
        DangerRight("Unexpected error occurred.");
      }
    }

    if (
      error?.response?.data?.code === "E_USER_NOT_FOUND" ||
      error?.response?.data?.code === "E_UNAUTHORIZED"
    ) {
      localStorage.clear();
      // Optionally reload the page here
      // window.location.reload();
    }

    return Promise.reject(error);
  }
);

// Handle API errors for fetch requests
const handleErrors = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const data = await response.json();
    if (data.message instanceof Array) {
      data.message.forEach((msg: string) => DangerRight(msg));
    } else if (data.message) {
      DangerRight(data.message);
    } else {
      DangerRight("Unexpected error occurred.");
    }

    if (data.code === "E_USER_NOT_FOUND" || data.code === "E_UNAUTHORIZED") {
      // Handle authentication errors
      // localStorage.clear();
      // window.location.reload(false);
    }

    return Promise.reject(data);
  }

  return response.json();
};

// Helper function to return headers with the token
const getHeaders = () => {
  const token = localStorage.getItem('token'); // Adjust this based on where your token is stored
  if (!token) {
    console.error("Authorization token is missing");
  }
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};
// type ApiResponse<T> = Promise<T>;

// Define getHeaders and handleErrors according to your project setup

export const apiInstanceFetch = {
  baseURL: `${baseURL}`,  // Ensure baseURL is correctly defined

  // Helper function to handle the API response
  handleResponse(response: Response) {
    if (!response.ok) {
      return Promise.reject(new Error('Network response was not ok'));
    }
    return response.json();  // Ensure we're working with JSON data
  },

  // Now using regular functions, so `this` will be bound properly
  get<T>(url: string, queryParams?: Record<string, any>): Promise<T> {
    const queryString = queryParams
      ? '?' + new URLSearchParams(queryParams).toString()
      : '';
    return fetch(`${this.baseURL}${url}${queryString}`, { method: "GET", headers: getHeaders() })
      .then(this.handleResponse);
  },

  post<T>(url: string, data: object): Promise<T> {
    return fetch(`${this.baseURL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(this.handleResponse);  // Call handleResponse to parse JSON
  },

  patch<T>(url: string, data: object): Promise<T> {
    return fetch(`${this.baseURL}${url}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(this.handleResponse);  // Call handleResponse to parse JSON
  },

  put<T>(url: string, data: object): Promise<T> {
    return fetch(`${this.baseURL}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    })
      .then(this.handleResponse);  // Call handleResponse to parse JSON
  },

  delete<T>(url: string): Promise<T> {
    return fetch(`${this.baseURL}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    })
      .then(this.handleResponse);  // Call handleResponse to parse JSON
  }
};

export const apiInstanceFetch2 = {
  baseURL: `http://localhost:5091/`,
  get: (url: string) =>
    fetch(`${baseURL}${url}`, { method: "GET" }).then(handleErrors),

  post: (url: string, data: object) =>
    fetch(`${baseURL}${url}`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors),

  patch: (url: string, data: object) =>
    fetch(`${baseURL}${url}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors),

  put: (url: string, data: object) =>
    fetch(`${baseURL}${url}`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(data),
    }).then(handleErrors),

  delete: (url: string) =>
    fetch(`${baseURL}${url}`, {
      method: "DELETE",
      headers: getHeaders(),
    }).then(handleErrors),
};
