const express = require('express');
const router = express.Router();
const {signUp, login, logout, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getUsersDetails, getUserDetail, deleteUser, updateUserRole} = require('../controllers/userController');
const {hasUserLoggedIn, authorizedRoles} = require('../middleware/auth')

router.post('/signup', signUp);
router.post('/login', login);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.get('/logout', logout);
router.get('/me',hasUserLoggedIn, getUserDetails);
router.put('/password/update',hasUserLoggedIn, updateUserPassword);
router.put('/update/me',hasUserLoggedIn, updateUserProfile);
router.get('/admin/users', hasUserLoggedIn, authorizedRoles("admin"), getUsersDetails);
router.get('/admin/user/:id', hasUserLoggedIn, authorizedRoles("admin"), getUserDetail);
router.delete('/admin/user/:id', hasUserLoggedIn, authorizedRoles("admin"), deleteUser);
router.put('/admin/user/:id', hasUserLoggedIn, authorizedRoles("admin"), updateUserRole);

module.exports = router;