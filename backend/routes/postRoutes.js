const express = require('express');
const router = express.Router();
const {createPost,fetchPosts,fetchPost,updatePost,updateValidations,updateImage,deletePost,allPosts,detailsPost,postComment,allComments,deleteComment} = require("../controllers/postControllers")


router.get('/allPosts',allPosts)
router.post('/create_post',createPost);
router.get('/posts/:id/:page',fetchPosts);
router.get('/posts/:id',fetchPost)
router.post('/update',updateValidations,updatePost)
router.post('/updateImage',updateImage)

// delete post
router.get('/delete/:id',deletePost)

// post details
router.get('/details/:slug',detailsPost)

// post comment
router.post('/comment',postComment)
// get all comments
router.get('/comments',allComments)
// delete comment
router.get('/comment/delete/:id',deleteComment)


module.exports = router;