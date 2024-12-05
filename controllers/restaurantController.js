//create rest

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController=async(req,res)=>{
    try{
        const{
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            rating,
            ratingCount,
            code,
            coords,
        }=req.body;
        //validation
        if(!title||!coords){
           return res.status(500).send({
                success:false,
                message:'please provide title and address',
            });
        }

        const  newRestaurant=new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            rating,
            ratingCount,
            code,
            coords,
        });
        await newRestaurant.save();
        res.status(201).send({
            success:true,
            message:"New Restaurant created successfully",
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in create restaurant api',
            error,
        });

    }
};


//get all restaurant
const getAllRestaurantController=async (req, res) => {
    try {
      const restaurants = await restaurantModel.find({});
      if (!restaurants) {
        return res.status(404).send({
          success: false,
          message: "No Restaurant Availible",
        });
      }
      res.status(200).send({
        success: true,
        totalCount: restaurants.length,
        restaurants,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get ALL Restaurant API",
        error,
      });
    }
  };
  

  //get rest by id
  const getRestaurantByIdController= async (req, res) => {
    try {
      const restaurantId = req.params.id;
      if (!restaurantId) {
        return res.status(404).send({
          success: false,
          message: "Please Provide Resturnat ID",
        });
      }
      //find resturant
      const restaurant = await restaurantModel.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).send({
          success: false,
          message: "no restaurant found",
        });
      }
      res.status(200).send({
        success: true,
        restaurant,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get Restaurant by id api",
        error,
      });
    }
  };

  //DELETE RESTAURANT
  const deleteRestaurantController=async (req, res) => {
    try {
      const restaurantId = req.params.id;
      if (!restaurantId) {
        return res.status(404).send({
          success: false,
          message: "No Restaurant Found OR Provide Resturant ID",
        });
      }
      await restaurantModel.findByIdAndDelete(restaurantId);
      res.status(200).send({
        success: true,
        message: "Restaurant Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in delete resturant api",
        error,
      });
    }
};


  
module.exports={createRestaurantController,getAllRestaurantController,getRestaurantByIdController ,deleteRestaurantController};