import logger from "./logger.utils.js";

export const errorHandler = (err, req, res, next) => {
    logger.error(err);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        path: err.path || req.originalUrl,
    });
};