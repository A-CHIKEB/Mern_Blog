import React, { useEffect } from 'react'
import axios from "axios";
function VerifyEmail({match}) {


	const verify = async () =>{
		const id = match.params.id

		const {data} = await axios.get(`/user/verifyEmail/${id}`)

		console.log(data)
	}

	useEffect(()=>{
		verify()
	},[])
	return (
		<div>
			
		</div>
	)
}

export default VerifyEmail
