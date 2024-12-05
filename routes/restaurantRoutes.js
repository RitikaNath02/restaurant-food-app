const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require("../controllers/restaurantController");


const router = express.Router();

//routes
//CREATE RESTAURANT ||POST
router.post('/create',authMiddleware,createRestaurantController);


//GET ALL RESTAURANTS||GET
router.get('/getAll',getAllRestaurantController)


//GET ALL RESTAURANTS by id ||GET
router.get('/get/:id',getRestaurantByIdController)

//delete restaurant || delete

router.delete('/delete/:id',authMiddleware,deleteRestaurantController)






module.exports=router;