const router = require('express').Router();
const apiRoutes = require('./api');
// Use the API routes under the "/api" endpoint
router.use('/api', apiRoutes);
// Handle requests for routes that do not match any defined routes
router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
