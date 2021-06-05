const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt')

module.exports.updateName = async (req,res) =>{
	const {id,name} = req.body


	if(name===''){
		
		return res.status(400).json({errors:[{msg:'Name is required'}]})

	}else{



		try {
			const response = await User.findByIdAndUpdate(id,{
				name:name
			})

			return res.status(200).json({msg:'You Name has been updated'})
			
		} catch (error) {
			return res.status(500).json({errors:error,msg:error.message})
			
		}

	}
	
}



module.exports.passwordValidations = [
	body("newPassword").not().isEmpty().trim().withMessage("New Password is required"),
	body("currentPassword").not().isEmpty().trim().withMessage("Current Password is required")
]
module.exports.updatePassword = async (req,res) =>{
	const {id,newPassword,currentPassword} = req.body;

	if(newPassword===''||currentPassword===''){

		return res.status(200).json({type:'error',msg:'New Password and Current Password is Required'})
	}
	try {
		
		const salt = await bcrypt.genSalt(10);
		const hashCurrentPass = await bcrypt.hash(currentPassword,salt);

		const check = await User.findOne({
			_id:id
		})

		// hash password by user id
		const compare = await bcrypt.compare(currentPassword,check.password);

		
		if(compare){

			const hash = await bcrypt.hash(newPassword,salt);
			const response = await User.findByIdAndUpdate(id,{
				password:hash
			})

			return res.status(200).json({type:'success',msg:'Your Password has been Updated'})

		}else{
			return res.status(200).json({type:'error',msg:'Try Again - That\'s Not Your Current Password '})

		}
		


		

	} catch (error) {
		return res.status(500).json({errors:error,msg:error.message})
		
	}


}