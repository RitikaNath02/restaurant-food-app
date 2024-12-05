const express = require("express");
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");


const router = express.Router();

//routes
//get user data
router.get("/getUser",authMiddleware,getUserController);

//update user
router.put('/updateUser',authMiddleware,updateUserController)

//reset password
router.post('/resetPassword',authMiddleware,resetPasswordController)

//update password
router.post('/updatePassword',authMiddleware,updatePasswordController)
module.exports = router;

//delete user
router.delete('/deleteUser/:id',authMiddleware,deleteProfileController)

module.exports=router;