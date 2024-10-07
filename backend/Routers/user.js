const express = require("express")

const imageUpload = require("../Helpers/Libraries/imageUpload");

const {getCurrentUser,editProfile,changePassword,addStoryToReadList,readListPage, fetchAllUsers, getUserById} = require("../Controllers/user");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");


const router = express.Router() ;

router.get("/get-all",getAccessToRoute, fetchAllUsers)

router.get('/:id', getAccessToRoute, getUserById); 

router.get('/current-user', getAccessToRoute, getCurrentUser);

router.post("/editProfile/:id", getAccessToRoute, [imageUpload.single("photo")], editProfile);

router.put("/changePassword",getAccessToRoute,changePassword)

router.post("/:slug/addStoryToReadList",getAccessToRoute ,addStoryToReadList)

router.get("/readList",getAccessToRoute ,readListPage)



module.exports = router