const asyncErrorWrapper = require("express-async-handler");
const User = require("../Models/user");
const Story = require("../Models/story");
const CustomError = require("../Helpers/error/CustomError");
const { comparePassword, validateUserInput } = require("../Helpers/input/inputHelpers");
const mongoose = require('mongoose')

// Fetch all users
const fetchAllUsers = asyncErrorWrapper(async (req, res, next) => {
    const users = await User.find({});
    
    return res.status(200).json({
        success: true,
        data: users,
    });
});

const getUserById = async (req, res) => {
    const userId = req.params.id; // get userId from route parameters
    const user = await User.findById(userId).select('-password'); // exclude password for security
    if (!user) {
        return next(new CustomError('User not found', 404));
    }
    res.status(200).json({ success: true, data: user });
};

const getCurrentUser = async (req, res, next) => {
    try {
        const userId = req.user.id; // Assuming user ID is stored in req.user after authentication
        const user = await User.findById(userId).select('username email'); // Select only username and email

        if (!user) {
            return next(new CustomError('User not found', 404));
        }

        res.status(200).json({ success: true, data: user });
    } catch (error) {
        next(new CustomError('Server Error', 500));
    }
};


const editProfile = async (req, res) => {
    // Destructure the id from req.params
    const { id } = req.params; // Ensure this is correctly placed

    // Check if id is valid before proceeding
    if (!id) {
        return res.status(400).json({ error: "User ID is required" });
    }

    // Validate ObjectId if you're using mongoose
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    // Get user data from the request body
    const { username, BTC, EUR, USD } = req.body;

    try {
        // Attempt to find the user and update
        const user = await User.findByIdAndUpdate(id, { username, BTC, EUR, USD }, { new: true, runValidators: true });

        // Handle case where user is not found
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Successful update response
        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating profile:", error);
        // Respond with error
        res.status(500).json({ error: error.message || "An error occurred while updating the profile" });
    }
};


const changePassword = asyncErrorWrapper(async (req, res, next) => {
    const { newPassword, oldPassword } = req.body;

    if (!validateUserInput(newPassword, oldPassword)) {
        return next(new CustomError("Please check your inputs", 400));
    }

    const user = await User.findById(req.user.id).select("+password");

    if (!comparePassword(oldPassword, user.password)) {
        return next(new CustomError('Old password is incorrect', 400));
    }

    user.password = newPassword;

    await user.save();

    return res.status(200).json({
        success: true,
        message: "Change Password Successfully",
        user: user,
    });
});

const addStoryToReadList = asyncErrorWrapper(async (req, res, next) => {
    const { slug } = req.params;
    const { activeUser } = req.body;

    const story = await Story.findOne({ slug });

    const user = await User.findById(activeUser._id);

    if (!user.readList.includes(story.id)) {
        user.readList.push(story.id);
        user.readListLength = user.readList.length;
        await user.save();
    } else {
        const index = user.readList.indexOf(story.id);
        user.readList.splice(index, 1);
        user.readListLength = user.readList.length;
        await user.save();
    }

    const status = user.readList.includes(story.id);

    return res.status(200).json({
        success: true,
        story: story,
        user: user,
        status: status,
    });
});

const readListPage = asyncErrorWrapper(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    const readList = [];

    for (let index = 0; index < user.readList.length; index++) {
        var story = await Story.findById(user.readList[index]).populate("author");
        readList.push(story);
    }

    return res.status(200).json({
        success: true,
        data: readList,
    });
});

module.exports = {
    getCurrentUser,
    editProfile,
    changePassword,
    addStoryToReadList,
    readListPage,
    fetchAllUsers,  // Export the new function
    getUserById
};
