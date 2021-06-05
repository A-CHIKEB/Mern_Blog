import {React,useState} from 'react'
import {Helmet} from 'react-helmet'
import ReactQuill from 'react-quill';
import {useDispatch,useSelector} from 'react-redux'
import {createAction} from '../store/asyncMethods/PostMethod'
import 'react-quill/dist/quill.snow.css';

const Create = ({history}) =>{

	const {createErrors} = useSelector(state => state.PostReducer)

	const [currentImage,setCurrentImage] = useState('Choose image')
	const [imagePreview,setImagePreview] = useState('');//show image in left side

	const dispatch = useDispatch()
	const {user:{_id,name}} = useSelector(state=> state.AuthReducer)

	const fileHandle = (e) =>{
		//console.log(e.target.files[0])
		if(e.target.files.length !== 0){

			setCurrentImage(e.target.files[0].name)
			setState({
				...state,
				[e.target.name]:e.target.files[0],
			})
	
			const reader = new FileReader();
			reader.onloadend = () =>{
				setImagePreview(reader.result)
			}
			reader.readAsDataURL(e.target.files[0])
		}

	}
	const [state,setState] = useState({
		title:'',
		description:'',
		image:''
	})

	const handleDescription = (e) =>{
		setState({
			...state,
			[e.target.name]:e.target.value
		})
	}


	const [value, setValue] = useState('');
	const [slug, setSlug] = useState('');
	const [slugButton, setSlugButton] = useState(false)

	const slugHandle = (e) =>{
		// onchange slug button enabled
		setSlugButton(true)
		setSlug(e.target.value)
	}

	const handleURL = (e) =>{
		e.preventDefault();
		setSlug(slug.trim().split(' ').join('-'));
	}
	
	const handleInputs = (e) =>{
		setState({
			...state,
			[e.target.name]:e.target.value
		})
		const createSlug = e.target.value.trim().split(' ').join('-')
		setSlug(createSlug)
	}

	
	const createPost = (e) =>{
		e.preventDefault();
		const {title,description,image} = state;
		const formData = new FormData();
		formData.append('title',title)
		formData.append('body',value)
		formData.append('image',image)
		formData.append('description',description)
		formData.append('slug',slug)
		formData.append('name',name)
		formData.append('id',_id)

		dispatch(createAction(formData))
		history.push('/dashboard')
	}

	

	return (
		<div className='create mt-100'>
				<Helmet>
					<title>Create new post</title>
					<meta name="description" content="Create a new post"/>
				</Helmet>
				
				<div className="container">
					{createErrors ? createErrors.map(err=>(
							<p id="error"><span>{err.msg}</span></p>
						)) : ''
					}
					<form onSubmit={createPost}>
						<div className="row ml-minus-15 mr-minus-15">
							
							<div className="col-6 p-15">
								<div className="card">
									<h3 className="card__h3">Create a new post</h3>
								
									
										<div className="group">
											<label htmlFor="title">Post Title</label>
											<input  type="text" name="title" id="title" 
													className="group__control" 
													placeholder="Post title..."
													value={state.title}
													onChange={handleInputs}/>
											
										</div>
										<div className="group">
											<label htmlFor="image" className="image__label">{currentImage}</label>
											<input type="file" name="image" id="image" onChange={fileHandle}/>
											
										</div>
										<div className="group">
											<label htmlFor="">Post Body</label>
											<ReactQuill theme="snow" value={value} onChange={setValue}/>
										</div>
										<div className="group">
											<label htmlFor="description">Description</label>
											<textarea id="description" 
													name="description"
													cols="30" rows="10" 
													className="group__control" 
													placeholder="meta description..."
													maxLength="150"
													defaultValue={state.description}
													onChange={handleDescription}>
											</textarea>
											<p className="lenght">{state.description ? state.description.length : 0}</p>
										</div>
										
									

								</div>
							</div>
							
							<div className="col-6 p-15">
								<div className="card">
									<div className="group">
										<label htmlFor="">Post URL</label>
										<input 
											type="text" 
											name="slug"
											id="slug"
											className="group__control"
											placeholder="POST URL..."
											value={slug}
											onChange={slugHandle}/>
									</div>
									<div className="group">
										{slugButton ? 
										(
											<button className="btn btn-default"
													onClick={handleURL}>Update Slug</button>
										)
										:('')
										}
									</div>
									<div className="group">
										<div className="imagePreview">
											{imagePreview ? (
												<img src={imagePreview} alt=""/>
											):''}
										</div>
									</div>
									<div className="group">
											<input type="submit" value="Create post" className="btn btn-default btn-block"/>
									</div>
									
								</div>
							</div>
						
						</div>
					</form>
			</div>
		</div>
	)
}

export default Create;