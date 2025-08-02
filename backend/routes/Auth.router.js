const express = require('express');
const authMiddleware = require('../middleware/Auth');
const protectedController = require('../Controllers/protected/protected.api');
const logSign = require('../Controllers/logSign');

const router = express.Router();

// SIGNUP
router.post('/signup', logSign.signUp);

// LOGIN
router.post('/login', logSign.logIn);

// Protected route
// router.get('/protected', authMiddleware, protectedController.protected);

router.get('/product', protectedController.protected);

// Product detail route
router.get('/product/:id', protectedController.detail);

router.post('/cart/add', authMiddleware, protectedController.addToCart);

router.get('/cart', authMiddleware, protectedController.cart);

module.exports = router;
