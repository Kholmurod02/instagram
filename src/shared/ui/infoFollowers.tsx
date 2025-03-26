const InfoFollowers = ({posts , followers , following} : {posts:string , followers : string , following: string}) => {
	return (
		<div>
			<div className='flex gap-[70px] lg:w-full w-[90%] justify-between m-auto lg:gap-[40px] items-center '>
				<p className='text-[gray] flex gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{posts} </span>posts
				</p>
				<p className='text-[gray] flex gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{followers} </span>followers
				</p>
				<p className='text-[gray] flex gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{following} </span>following
				</p>
			</div>
		</div>
	)
}

export default InfoFollowers
