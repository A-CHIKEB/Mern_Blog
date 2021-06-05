const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const User = require('../models/User');


const nodemailer = require('nodemailer');


const createToken = (user) =>{
	return jwt.sign({ user }, process.env.SECRET,{expiresIn:'7d'})
}

module.exports.registerValidations = [
	body("name").not().isEmpty().trim().withMessage("Name is required"),
	body("email").not().isEmpty().trim().withMessage("Email is required"),
	body("password").isLength({min:6}).withMessage('Password must be 6 characters long')
]

module.exports.register = async (req,res) =>{

	const {name, email, password} = req.body;

	const errors = validationResult(req);
	if(!errors.isEmpty()){
		// 400 BAD REQUEST
	 	return res.status(400).json({errors: errors.array()})

	}
	try {
		const checkUser = await User.findOne({email})
		if(checkUser){
			return res.status(400).json({ errors: [{msg: 'Email is already token'}] })
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password,salt);

		




		try {

			const user =  await User.create({
				name,
				email,
				password:hash,
				isAdmin:false,
				confirmed:false
			});

			//SECRET IN .ENV
			const token = createToken(user);

			const CLIENT_URL = 'http://localhost:3000'
			const output = `
					<h2>Please click on below link to activate your account</h2>
					<p>${CLIENT_URL}/auth/activate/${user._id}</p>
					<p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
					`;
			const transporter = nodemailer.createTransport({
				service: 'gmail',
				host: 'smtp.gmail.com',
				auth: {
					user: 'chikebaymen0@gmail.com',//votre email
					pass: '**************'//votre password
				}
			});

			// var mailOptions = {
			// 	from: 'chikebaymen0@gmail.com',
			// 	to: 'aymen_chikeb@outlook.com',
			// 	subject: 'Sending Email using Node.js[nodemailer]',
			// 	text: 'That was easy!'
			//   };
			
			//   transporter.sendMail(mailOptions, function(error, info){
			// 	if (error) {
			// 	  console.log(error);
			// 	} else {
			// 	  console.log('Email sent: ' + info.response);
			// 	}
			//   });  

			//send mail with defined transport object
			var mailOptions = {
				from: 'chikebaymen0@gmail.com', // sender address
				to: email, // list of receivers
				subject: "Account Verification: NodeJS Auth ✔", // Subject line
				generateTextFromHTML: true,
				html: output, // html body
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.log(error);
					req.flash(
						'error_msg',
						'Something went wrong on our end. Please register again.'
					);
					res.redirect('/login');
				}
				else {
					console.log('Mail sent : %s', info.response);
					req.flash(
						'success_msg',
						'Activation link sent to email ID. Please activate to log in.'
					);
					res.redirect('/login');
				}
			})
			
			return res.status(200).json({msg:'Your account has been created',token})

		} catch (error) {

			return res.status(500).json({errors: error})

		}

	} catch (error) {
		// 500 SERVER ERROR
		return res.status(500).json({errors: error})
	}
}




module.exports.loginValidations = [
	body("email").not().isEmpty().trim().withMessage("Email is required"),
	body("password").not().isEmpty().withMessage('Password is required')
]

module.exports.login = async (req,res)=>{
	const errors = validationResult(req);
	if(!errors.isEmpty()){
		// 400 BAD REQUEST
	 	return res.status(400).json({errors: errors.array()})

	}

	const {email,password} = req.body
	
	
	try {
		const user = await User.findOne({email})
		if(user && user.confirmed){

			const matched = await bcrypt.compare(password, user.password);

			if (matched) {

				const token = createToken(user);
				return res.status(200).json({msg:'You have login successfully',token})
				
			}else{
				return res.status(401).json({errors:[{msg: 'Password is not correct'}]})	
			}


		}else{
			return res.status(404).json({errors:[{msg: 'Email not found or not confirmed'}]})
		}
	} catch (error) {
		return res.status(500).json({errors: error})
	}

}


module.exports.fetchAllUsers = async (req,res) =>{
	try{
		const users = await User.find({});
		return res.status(200).json({users:users});
	}catch(error){
		return res.status(500).json({errors:error,msg:error.message})
	}
}

module.exports.deleteUser = async(req,res) =>{
	const id = req.params.id
	try {
		const response = await User.findByIdAndRemove(id)
		return res.status(200).json({msg:'User has been deleted'})
		
	} catch (error) {
		return res.status(500).json({errors:error,msg:error.message})
	}
}


module.exports.verifyEmail = async(req,res) =>{
	const id = req.params.id
	try {
		const response = await User.findByIdAndUpdate(id,{
			confirmed:true
		})
		return res.status(200).json({msg:'Utilisateur Verifier'})
		
	} catch (error) {
		return res.status(500).json({errors:error,msg:error.message})
	}
}