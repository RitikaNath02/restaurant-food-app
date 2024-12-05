const userModel = require("../models/userModel");
const bcrypt=require("bcryptjs");
//get user info
const getUserController=async (req,res)=>{
     try{
        //find user
        const user=await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User Not found'
            })
        }
        //hide password
        user.password=undefined;
        //resp
        res.status(200).send({
            success:true,
            message:"user get successfuly",
            user,
        });
     }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in get user API',
            error
        })
     }
};
//update user
const updateUserController=async(req,res)=>{
    try{
        //finduser
        const user=await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return res.status(404).send({
                success:false,
                message:'user not found'
            })
        }
        //update
        const {userName,address,phone}=req.body
        if(userName) user.userName=userName;
        if(address) user.address=address;
        if(phone) user.phone=phone;

        //save user
        await user.save();
        res.status(200).send({
            success:true,
            message:"user updated successfully",
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update user api',
            error
        })
    }
}

//RESET password
const resetPasswordController=async(req,res)=>{
    try{
        const {email,newPassword,answer}=req.body
        if(!email||!newPassword||!answer){
            return res.status(500).send({
                success:false,
                message:'please provide all fields',
                error
            })
        }
        const user=await userModel.findOne({email,answer})
        if(!user){
            return res.status(500).send({
                success:false,
                message:'user not found or invalid ans',
                error
            })
        }
        //hashing password
        var salt=bcrypt.genSaltSync(10);
        const hashedPassword=await bcrypt.hash(newPassword,salt);
        user.password=hashedPassword;
        await user.save();
        res.status(500).send({
            success:true,
            message:'password reset successfully done',
            
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in password reset api',
            error
        })
    }


}

const updatePasswordController= async(req,res)=>{
    try{
        //find user
        const user=await userModel.findById({_id:req.body.id})
        //validation
        if(!user){
            return  
            res.status(404).send({
                success:false,
                message:'user not found',
                error
            })
        }
        //get data from user
        const{oldPassword,newPassword}=req.body
        if(!oldPassword || !newPassword ){
          return 
            res.status(500).send({
                success:false,
                message:'please provide old or new password',
                error
            });
        }
  
        const isMatch=await bcrypt.compare(oldPassword,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'INVALID OLD PASSWORD'
            })
        }
     //hashing password
     var salt=bcrypt.genSaltSync(10);
     const hashedPassword=await bcrypt.hash(newPassword,salt);
     user.password=hashedPassword
     await user.save();
     res.status(200).send({
        success:true,
        message:"Password Updated!",
     })


    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in password update api',
            error
        })
    }

}

//delete profile account

const deleteProfileController=async(req,res)=>{
try{
    await userModel.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        success:true,
        message:'YOUR ACCOUNT HAS BEEN DELETED',
    })

}catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in delete profile API',
        error
    })
}
}

module.exports={getUserController,updateUserController,resetPasswordController,updatePasswordController,deleteProfileController};