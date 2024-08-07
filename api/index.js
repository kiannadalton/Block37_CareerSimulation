const express = require('express');

const router = express.Router();

// routes
// path api/auth
router.use('/auth', require('./auth/auth'));





module.exports = router;