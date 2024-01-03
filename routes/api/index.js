
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");
// Mount the user routes under the "/users" endpoint
router.use("/users", userRoutes);

// Mount the thought routes under the "/thoughts" endpoint
router.use("/thoughts", thoughtRoutes);

// Export the router configuration for use in the application
module.exports = router;