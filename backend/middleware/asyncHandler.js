// backend/middleware/asyncHandler.js

/**
 * A higher-order function to catch errors in async/await.
 * Wrap your controller functions with asyncHandler to avoid
 * repetitive try/catch blocks.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
