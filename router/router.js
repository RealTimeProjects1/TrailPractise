const express = require('express');
const router = express.Router();
const userController = require('../controller/controller');

// Get all users
router.get('/', userController.getAllUsers);

// Register a new user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);

//DeletID
router.delete('/delete/:id', userController.deleteUserById);


// Get user by ID
router.get('/get/:id', userController.getUserById);

//Update USe By ID
router.put('/:id', userController.updateUserById);


module.exports = router;
