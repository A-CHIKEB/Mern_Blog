const {model, Schema} = require('mongoose')

const userSchema = Schema(
	{
		name:{
			type: String,
			required:true
		},

		email:{
			type: String,
			required:true
		},
		password:{
			type: String,
			required:true
		},
		confirmed:{
			type: Boolean,
			defaultValue:false
		},
		isAdmin:{
			type:String,
			required:false
		}
	},
	{timestamps:true}
)

module.exports = model("user",userSchema)