import config from "../config.js";
import logger from "../utils/logger.utils.js";
import {
  sendGetRequest,
  sendPostRequest,
  sendPutRequest,
} from "../ApiClient.js";

export const getCart = async (req) => {
  logger.info("Fetching the cart for customer");

  const userId = req.user?.sub; // get user ID from JWT

  if (!userId) {
    throw new Error("User ID not found in request");
  }

  const response = await sendGetRequest(
    req,
    `${config.CART_SERVICE_BASE_URL}`,
    {
      extraHeaders: {
        "x-user-id": userId,
      },
    }
  );

  return response;
};


export const createCart = async (req) => {
  logger.info("Creating a cart for the new customer");
  const response = await sendPostRequest(
    req,
    `${config.CART_SERVICE_BASE_URL}`
  );
  return response.data;
};

export const updateCart = async (req) => {
  logger.info("Updating cart");

  const userId = req.user?.sub;
  if (!userId) {
    throw new Error("User ID not found in request");
  }

  const updatedItems = {
    items: req.body.items 
  };

  console.log("updatedItems", updatedItems);

  const response = await sendPutRequest(
    req,
    `${config.CART_SERVICE_BASE_URL}`,
    {
      body: updatedItems,
      extraHeaders: {
        "x-user-id": userId,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};




export const clearCart = async (req) => {
  logger.info("Removing items from cart");
  const response = await sendPutRequest(`${config.CART_SERVICE_BASE_URL}`);
  return response.data;
};
