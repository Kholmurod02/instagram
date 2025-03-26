type TPosts = {
	children: React.ReactNode
}

const PostsHomepage: React.FC<TPosts> = ({children}) => {
  return (
	 <div className='md:w-[80%] m-auto md:mt-5'>
		{children}
	 </div>
  )
}

export default PostsHomepage