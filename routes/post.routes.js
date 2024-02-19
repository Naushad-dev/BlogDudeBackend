const express= require('express');
const { validateSignIn } = require('../controllers/register.controller');
const { createPostController, getAllPostController, getUserPostController,deleteUserPostController,  updatePostController } = require('../controllers/post.controller');
const router= express.Router();


router.post('/create-post',validateSignIn,createPostController);

//to get all posts 

router.get("/get-all-post",getAllPostController);
router.get('/get-user-post', validateSignIn, getUserPostController )
router.delete("/delete-user-post/:id",validateSignIn,deleteUserPostController)

router.put("/update-user-post/:id",validateSignIn,updatePostController)




module.exports= router