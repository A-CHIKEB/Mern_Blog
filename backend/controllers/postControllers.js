const formidable = require("formidable")
const { v4: uuidv4 } = require('uuid');
const fs = require("fs")

const Post = require('../models/Post');
const Comment = require('../models/Comment');

// validate body and title in updatePost
const {body,validationResult} = require('express-validator')
const {htmlToText} = require('html-to-text');
const { reset } = require("nodemon");


module.exports.createPost = async (req,res)=>{

	const form = formidable({multiples:true})

	form.parse(req, async (error,fields,files)=>{
		
		const {title,body,description,slug,id,user,name} = fields;
		
		const errors = [];

		if(title===''){
			errors.push({msg:'Title is required'})
		}
		if(body === ''){
			errors.push({msg:'Body is required'})
		}
		if(description === ''){
			errors.push({msg:'Description is required'})
		}
		if(slug === ''){
			errors.push({msg:'Slug is required'})
		}
		// if files={}
		if(Object.keys(files).length === 0){
			errors.push({msg:'Image is required'})
		}else{
			// validate extension image
			const {type} = files.image
			const split = type.split('/');
			const extension = split[1].toLowerCase()
			if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
				errors.push({msg:`${extension} is not a valid extension`})
			}else{
				files.image.name = uuidv4()+'.'+extension;
			}
		}
		const checkSlug = await Post.findOne({slug});
		if(checkSlug){
			errors.push({msg:'Please choose a unique slug/URL'})
		}

		if(errors.length !== 0){
			return res.status(400).json({errors,files}) 
		}else{
			const newPath = __dirname + `/../client/public/images/blog_images/${files.image.name}`;
				// Copy Image to New Path
				fs.copyFile(files.image.path,newPath, async (error) => {
					if(!error){
						
						try{
							const response = await Post.create({
								title: title,
								body: body,
								image: files.image.name,
								description:description,
								slug:slug,
								userName:name,
								userId:id
							})

							return res.status(200).json({msg:'You post have been created successfully',response});
						}catch(error){
							return res.status(500).json({errors:error,msg:error.message})
						}
					}
				})
		}
		
	})
}


module.exports.fetchPosts = async (req,res) =>{
	const id = req.params.id;
	const page = req.params.page
	const perPage = 1
	const skip = (page - 1) * perPage
	try {
		const count = await Post.find({userId: id}).countDocuments()
		const response = await Post.find({userId: id})
						 .skip(skip)
						 .limit(perPage)
						 .sort({updatedAt : -1}); //-1 descending
		return res.status(200).json({response:response,count,perPage});

	} catch (error) {
		return res.status(500).json({errors:error,msg:error.message}) 
	}
}


module.exports.fetchPost = async(req,res)=>{
	const id = req.params.id;
	try {
		
		const post = await Post.findOne({_id:id})
		return res.status(200).json({ post });

	} catch (error) {
		return res.status(500).json({errors:error,msg:error.message})
	}
}


module.exports.updateValidations = [
	body('title').notEmpty().trim().withMessage('Title is required'),
	body('body').notEmpty().trim().custom((value)=>{
		let bodyValue = value.replace(/\n/g,'');
		if(htmlToText(bodyValue).trim().length === 0){
			return false;
		}else{
			return true;
		}
	}).withMessage('Body is required'),
	body('description').notEmpty().trim().withMessage('Description is required'),

]

module.exports.updatePost = async (req,res) =>{
	const {title,body,description,id} = req.body;
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		return res.status(400).json({errors:errors.array()})
	}else{
		try {
			const response = await Post.findByIdAndUpdate(id,{
				title:title,
				body:body,
				description:description
			})
			return res.status(200).json({msg:'You Post Has Been Updated'})

		} catch (error) {
			return res.status(500).json({errors:error,msg:error.message})
		}
	}
}


module.exports.updateImage = async(req,res) =>{
	const form = formidable({multiples:true})
	form.parse(req, async (error,fields,files) =>{

		const {id} = fields;
		
		// const {id,image} = fields

		const errors = []
		
		const {type} = files.image
		const split = type.split('/');
		const extension = split[1].toLowerCase()
		if (extension !== 'jpg' && extension !== 'jpeg' && extension !== 'png'){
			errors.push({msg:`${extension} is not a valid extension`})
		}else{
			files.image.name = uuidv4()+'.'+extension;
		}

		const newPath = __dirname + `/../client/public/images/blog_images/${files.image.name}`;
		fs.copyFile(files.image.path,newPath, async (error) => {
			if(!error){
				
				try{
					const response = await Post.findByIdAndUpdate(id,{
						image:files.image.name
					})
					return res.status(200).json({msg:'You image has been updated successfully'});
				}catch(error){
					return res.status(500).json({errors:error,msg:error.message})
				}
			}
		})
	})
}


module.exports.deletePost = async(req,res) =>{
	const id = req.params.id
	try {
		const response = await Post.findByIdAndRemove(id)
		return res.status(200).json({msg:'Your post has been deleted'})
	} catch (error) {
		return res.status(500).json({errors:error,msg:error.message})
	}
}



module.exports.allPosts = async(req,res) =>{
	try {
		const posts = await Post.find({});

		return res.status(200).json({ posts:posts });

	} catch (error) {

		return res.status(500).json({errors:error,msg:error.message})
	}
}

module.exports.detailsPost = async(req,res) =>{
	const slug = req.params.slug
	try{
		const postDetails = await Post.findOne({
			slug:slug
		})

		const comments = await Comment.find({
			postId:postDetails._id
		}).sort({updatedAt: -1})

		return res.status(200).json({post:postDetails,comments:comments})

	}catch(error){
		
		return res.status(500).json({errors:error,msg:error.message})
		
	}
}


module.exports.postComment = async (req,res) =>{
	const {id, comment, userName} = req.body

	if(comment==='' || userName===''){
		
		return res.status(400).json({msg:'Comment and Username and id is required'})

	}else{
		try{

			const response = await Comment.create({
				postId: id,
				comment: comment,
				userName: userName
			})
			
			return res.status(200).json({msg:'Your comment has been published'})
	
		}catch(error){
	
			return res.status(500).json({errors:error, msg: error.message})
	
		}
	}
	
}

// all comment
module.exports.allComments = async(req,res) =>{
	try {
		const comments = await Comment.find({});

		return res.status(200).json({ comments:comments });

	} catch (error) {

		return res.status(500).json({errors:error,msg:error.message})
	}
}

module.exports.deleteComment = async(req,res) =>{
	const id = req.params.id
	try {
		const response = await Comment.findByIdAndRemove(id)
		return res.status(200).json({msg:'Comment has been deleted'})
	} catch (error) {
		return res.status(500).json({errors:error,msg:error.message})
	}
}