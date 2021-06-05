import React from 'react'
import { useState } from "react";
import { useDispatch ,useSelector } from 'react-redux';
import {  userMessage } from "../store/asyncMethods/ChatActions";


const Chat = () => {
	const [message,setMessage] = useState('');

	const dispatch = useDispatch();
	const {messages} = useSelector((state)=>state.ChatReducer);
	const data = [
			{"tag": "greeting",
				"patterns": ["Hi", "How are you", "how are you", "Is anyone there?", "Hello", "hello", "Good day"],
				"responses": ["Hello, thanks for visiting", "Good to see you again", "Hi there, how can I help?"]
			},
			{"tag": "goodbye",
				"patterns": ["Bye", "See you later", "Goodbye"],
				"responses": ["See you later, thanks for visiting", "Have a nice day", "Bye! Come back again soon."]
			},
			{"tag": "name",
				"patterns": ["what is your name?","what is your name"],
				"responses": ["My name is ACH"]
			},
			{"tag": "age",
				"patterns": ["how old are you", "How old are you?"],
				"responses": ["Oh dear, I've lost count! 😉"]
			},
			{"tag": "ifrobot",
				"patterns": ["are you a robot?","are you a robot"],
				"responses": ["Yes I am a robot, but I’m a good one. Let me prove it. How can I help you?"]
			},
			{"tag": "nationality",
				"patterns": ["what is your nationality","where are you from"],
				"responses": ["Who built me his nationality is Moroccan that's why I'm Moroccan 🇲🇦"]
			},
			{"tag": "thanks",
				"patterns": ["Thanks","thanks", "Thank you", "That's helpful"],
				"responses": ["Happy to help!", "Any time!", "My pleasure"]
			},
			{"tag": "hours",
				"patterns": ["what hours are you open?", "What are your hours?", "When are you open?" ],
				"responses": ["We're open every day 9am-9pm", "Our hours are 9am-9pm every day"]
			},
			{"tag": "payments",
				"patterns": ["Do you take credit cards?", "Do you accept Mastercard?", "Are you cash only?" ],
				"responses": ["We accept VISA, Mastercard and AMEX", "We accept most major credit cards"]
			},
			{"tag": "opentoday",
				"patterns": ["Are you open today?", "When do you open today?", "What are your hours today?"],
				"responses": ["We're open every day from 9am-9pm", "Our hours are 9am-9pm every day"]
			},
			{"tag": "****",
				"patterns": ["fuck you"],
				"responses": ["Well, if you insist…"]
			},
			
	]

	//var mydata = JSON.parse(data);

	const sleep = (milliseconds) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	}

	const handleClick = async (e) =>{
		const code = e.keyCode || e.which;

		if(code === 13){
			console.log(message)
			let found = false;
			dispatch(userMessage(message,"user"))
			setMessage("")

			await sleep(3000)
			//alert(data.length)
			for (let i = 0; i < data.length; i++) {
				
					for (let j = 0; j < data[i].patterns.length; j++) {
						
						if (message.toLowerCase() === data[i].patterns[j]){
							//console.log(data[i].responses[Math.floor(Math.random() * data[i].responses.length)])
							dispatch(userMessage(data[i].responses[Math.floor(Math.random() * data[i].responses.length)],"robot"))
							found = true;
						}
					}
				
				
			}
			if(found == false){
				dispatch(userMessage("😟 I am a robot programmed to answer only some of the frequently asked questions about our site.","robot"))
			}
		}

		// for click button
		if(code==undefined){
			dispatch(userMessage(message,"user"))
			let found = false;
			setMessage("")
			await sleep(3000)
			//alert(data.length)
			for (let i = 0; i < data.length; i++) {
				
					for (let j = 0; j < data[i].patterns.length; j++) {
	
						if (message === data[i].patterns[j]){
							//console.log(data[i].responses[Math.floor(Math.random() * data[i].responses.length)])
							dispatch(userMessage(data[i].responses[Math.floor(Math.random() * data[i].responses.length)],"robot"))
							found = true;
						}
					}
			}

			if(found == false){
				dispatch(userMessage("😟 I am a robot programmed to answer only some of the frequently asked questions about our site.","robot"))
			}
		}
		
	}


	const handleChat = () =>{
		if(document.getElementById("chat_info").style.display == "none"){
			document.getElementById("chat_info").style.display = "block";
		}else{
			document.getElementById("chat_info").style.display = "none"
		}
		
	}
	return (
		<>
		<div id="chat" onClick={handleChat}>
			<img src="/images/logos/robot.png" alt="" />
		</div>
		<div id="chat_info">
			
			<div className="main-card">
				<div className="main-title">
					<svg viewBox="0 0 24 24">
						<path fill="currentColor" d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" />
					</svg>
					<span>Chatbot</span>
				</div>
				<div className="chat-area" id="message-box">
				<div className="chat-message-div" className="robot">
							<div className='chat-message-received'>🙌 Welcome back! How may I help you today? 🤖</div>
							<div className='chat-message-received'>👋 Hi​! I'm a Bot. Let me know if you have any questions regarding our tool!</div>

						</div>
					{messages.length === 0 ? "" : messages.map((msg,index)=>

						<div className="chat-message-div" key={index} className={msg.type}>
							<div className={'chat-message-'+ (msg.type === "user" ? 'sent' : 'received')}>{msg.message}</div>
						</div>
					)}
					
				</div>
				<div className="line"></div>
				<div className="input-div">
					<input className="input-message" name="message" 
						type="text" id="message" placeholder="Type your message ..."
						onChange={(e)=>setMessage(e.target.value)} onKeyPress={handleClick} value={message}/>
					<button className="input-send" onClick={handleClick}>
						<svg style={{width:"24px",height:"24px"}}>
							<path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
						</svg>
					</button>
				</div>
			</div>
			
		</div>
		</>
	)
}

export default Chat
