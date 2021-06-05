import {createStore,applyMiddleware,combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import AuthReducer from './reducers/AuthReducer'
import {PostReducer,FetchPosts, FetchPost,UpdatePost,UpdateImagePost}  from "./reducers/PostReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { updateName } from "./reducers/ProfileReducer";
import { ChatReducer } from "./reducers/ChatReducers";

const rootReducers = combineReducers({
	AuthReducer: AuthReducer,
	PostReducer: PostReducer,
	FetchPosts: FetchPosts,
	FetchPost: FetchPost,
	UpdatePost: UpdatePost,
	UpdateImagePost: UpdateImagePost,
	// update Name
	updateName:updateName,

	// chatbot
	ChatReducer: ChatReducer

})
const middlewares = [thunkMiddleware]
const Store = createStore(rootReducers,composeWithDevTools(applyMiddleware(...middlewares)))

export default Store