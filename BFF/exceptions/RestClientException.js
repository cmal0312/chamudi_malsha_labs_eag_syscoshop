class RestClientException extends Error {
  constructor(statusCode, message, errorPayload) {
    super(message);
    this.statusCode = statusCode;
    this.errorPayload = errorPayload;
  }
}
export default RestClientException;