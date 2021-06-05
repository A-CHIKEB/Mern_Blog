const mongoose = require('mongoose')
// .env
require('dotenv').config()

module.exports = connect = async () =>{

	try {
		
		const response = await mongoose.connect(process.env.URL,{ useUnifiedTopology: true , useNewUrlParser: true ,useFindAndModify:false}); //URL in .env

		console.log('connection created')

	} catch (error) {
		console.log(error)
	}


}