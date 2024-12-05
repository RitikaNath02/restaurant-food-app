const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require("../controllers/categoryController");


const router = express.Router();
//routes
//create category

router.post('/create',authMiddleware,createCatController)

//get all category
router.get('/getAll',getAllCatController);

//update cat
router.put('/update/:id',authMiddleware,updateCatController)

//delete cat
router.delete('/delete/:id',authMiddleware,deleteCatController)

module.exports=router;

