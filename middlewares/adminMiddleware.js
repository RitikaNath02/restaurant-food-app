const userModel=require('../models/userModel')


module.exports = async (req, res, next) => {
    try {
        // Fetch the user from the database using req.body.id (if necessary)
        const user = await userModel.findById(req.body.id);
console.log(user)
        // Check if the user exists
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        // Ensure req.user is properly set (fallback to user from DB if needed)
        const currentUser = req.user || user;

        // Check user type
        if (currentUser.usertype !== "admin") {
            return res.status(401).send({
                success: false,
                message: "Only Admin Access",
            });
        }

        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in adminMiddleware:", error);
        res.status(500).send({
            success: false,
            message: "Unauthorized access",
            error: error.message,
        });
    }
};
