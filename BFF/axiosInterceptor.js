import axios from "axios";
import log4js from "log4js";
import HttpStatus, { getReasonPhrase } from "http-status-codes";
import RestClientException from "./exceptions/RestClientException.js";

const logger = log4js.getLogger();
logger.level = "debug";

axios.interceptors.request.use((request) => {
  logger.info(`Request: ${request.method?.toUpperCase()} ${request.url}`);
  logger.debug("Request headers:", request.headers);
  logger.debug("Request params:", request.params);
  return request;
});

const exceptionHandler = (err) => {
  if (err.response) {
    const status = err.response.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = err.response.data?.message || getReasonPhrase(status);
    throw new RestClientException(status, message, err.response.data);
  }
  const errorPayload = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: getReasonPhrase(HttpStatus.INTERNAL_SERVER_ERROR),
  };
  throw new RestClientException(
    HttpStatus.INTERNAL_SERVER_ERROR,
    err.code,
    errorPayload
  );
};

axios.interceptors.response.use((response) => response, exceptionHandler);

const getAxiosInstance = () => {
  return axios;
};

export default { getAxiosInstance };
