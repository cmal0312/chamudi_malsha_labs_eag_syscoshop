import config from "../config.js";
import logger from "../utils/logger.utils.js";
import {
  sendGetRequest,
  sendPutRequest,
  sendPostRequest,
  sendDeleteRequest,
} from "../ApiClient.js";

// export const getProducts = async (req) => {
//   logger.info("Fetching products from product-service");
//   const role = groups[0] || "customer";
//   const response = await sendGetRequest(
//     req,
//     `${config.PRODUCT_SERVICE_BASE_URL}/products`,
//     {
//       params: req.query,
//       extraHeaders: {
//         "x-user-role": role,
//       }
//     }
//   );
//   console.log("product response ", response);
//   return response;
// };

export const getProducts = async (req) => {
  logger.info("Fetching products from product-service");

  // Extract the first group from the decoded JWT
  let userRole = req.user?.["cognito:groups"]?.[0];

  if (req.query?.supplierId && req.headers["x-user-role"]) {
    userRole = req.headers["x-user-role"];
  }

  const response = await sendGetRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/products`,
    {
      params: req.query,
      extraHeaders: {
        "x-user-role": userRole, // only the role
      },
    }
  );

  console.log("product response", response);
  return response;
};

export const createProduct = async (req) => {
  logger.info("Creating a new product");

  const response = await sendPostRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/products`,
    {
      body: req.body,
      extraHeaders: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getProduct = async (req) => {
  logger.info("Fetching a product from product-service");

  const response = await sendGetRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/products/${req.params.id}`
  );
  return response;
};

export const updateProduct = async (req) => {
  console.log(req);
  logger.info("Updating a product");
  const response = await sendPutRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/products/${req.params.id}`,
    {
      body: req.body,
      extraHeaders: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const deleteProduct = async (req) => {
  logger.info("Deleting a product");
  const response = await sendDeleteRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/products/${req.params.id}`
  );
  return response;
};

export const getCategories = async (req) => {
  logger.info("Fetching categories from product-service");
  const response = await sendGetRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/categories`
  );
  console.log("categories ", response);
  return response;
};

export const getCategory = async (req) => {
  logger.info("Fetching a Category from product-service");
  const response = await sendGetRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/categories/${req.params.id}`
  );
  return response;
};

export const createCategory = async (req) => {
  logger.info("Creating a new category");
  const response = await sendPostRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/categories`,
        {
      body: req.body,
      extraHeaders: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getSuppliers = async (req) => {
  logger.info("Fetching suppliers from product-service");
  console.log("[CREATE]",req);
  const response = await sendGetRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/suppliers`
  );
  return response;
};


export const createSupplier = async (req) => {
  logger.info("Creating a new supplier");
  const response = await sendPostRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/suppliers`,
            {
      body: req.body,
      extraHeaders: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const getSupplier = async (req) => {
  logger.info("Fetching a Supplier from product-service");
  const response = await sendGetRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/suppliers/${req.params.id}`
  );
  return response;
};

export const deleteSupplier = async (req) => {
  logger.info("Deleting a Supplier from product-service");

  const response = await sendDeleteRequest(
    req,
    `${config.PRODUCT_SERVICE_BASE_URL}/suppliers/${req.params.id}`
  );
  return response;
};
