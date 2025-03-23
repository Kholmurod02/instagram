type TPosts = {
	children: React.ReactNode
}

const PostsHomepage: React.FC<TPosts> = ({children}) => {
  return (
	 <div className='w-[80%] h-[600px] m-auto mt-10 border-2'>
		{children}
	 </div>
  )
}

export default PostsHomepage