import axios from "axios";
import { toast } from "react-toastify";
//Tạo 1 instance của axios
const instance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true
})

// Change cookie from Be to Fe
// instance.defaults.withCredentials = true

// instance.defaults.headers.common['Authorization'] = "AUTO_TOKEN";
// // Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
},
    // { synchronous: true, runWhen: () => /* This function returns true */}
);

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error?.response?.status || 500;
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error("Unauthorized the user. Please login...")
            window.location.href = '/login';
            return Promise.reject((error.message, 401));
        }

        // forbidden (permission related issues)
        case 403: {

            toast.error("You don't have permission to access")
            return Promise.reject((error.message, 403));
        }

        // bad request
        case 400: {
            return Promise.reject((error.message, 400));
        }

        // not found
        case 404: {
            return Promise.reject((error.message, 404));
        }

        // conflict
        case 409: {
            return Promise.reject((error.message, 409));
        }

        // unprocessable
        case 422: {
            return Promise.reject((error.message, 422));
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject((error.message, 500));
        }
    }
});

export default instance