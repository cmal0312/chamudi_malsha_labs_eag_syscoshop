import log4js from "log4js";
import axiosInterceptor from "./axiosInterceptor.js";

const logger = log4js.getLogger();
logger.level = "debug";

const axios = axiosInterceptor.getAxiosInstance();

const buildHeaders = ( extraHeaders = {}) => {
  return { ...extraHeaders };
};


const sendRequest = async (req, method, url, { body, params, extraHeaders } = {}) => {
  try {
    const headers = buildHeaders(extraHeaders);
    const config = { headers, params };

    let response;
    switch (method.toUpperCase()) {
      case "GET":
        response = await axios.get(url, config);
        break;
      case "POST":
        response = await axios.post(url, body, config);
        break;
      case "PUT":
        response = await axios.put(url, body, config);
        break;
      case "DELETE":
        response = await axios.delete(url, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    return response.data;
  } catch (err) {
    logger.error(`${method.toUpperCase()} ${url}`, err);
    throw err;
  }
};

export const sendGetRequest = (req, url, options = {}) => sendRequest(req, "GET", url, options);
export const sendPostRequest = (req, url, options = {}) => sendRequest(req, "POST", url, options);
export const sendPutRequest = (req, url, options = {}) => sendRequest(req, "PUT", url, options);
export const sendDeleteRequest = (req, url, options = {}) => sendRequest(req, "DELETE", url, options);
