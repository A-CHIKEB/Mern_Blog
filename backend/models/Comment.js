const {model,Schema} = require('mongoose')

const commentSchema = new Schema(
{

	postId: {
		type: Schema.Types.ObjectId,
		ref: 'posts',
		req:true,
	},
	comment:{
		type: String,
		req:true
	},
	userName:{
		type:String,
		req:true
	}

},
{timestamps: true}
)

module.exports = model("comment",commentSchema)