const InfoFollowers = ({posts , followers , following} : {posts:string , followers : string , following: string}) => {
	return (
		<div>
			<div className='flex lg:gap-[70px] w-full mb-[10px] justify-around m-auto  items-center '>
				<p className='text-[gray] flex lg:gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{posts} </span>posts
				</p>
				<p className='text-[gray] flex lg:gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{followers} </span>followers
				</p>
				<p className='text-[gray] flex lg:gap-[10px] lg:flex-row  flex-col items-center text-[18px]'>
					<span className='text-[#fff]'>{following} </span>following
				</p>
			</div>
		</div>
	)
}

export default InfoFollowers
