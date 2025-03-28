const RecomendedUsers = ({data}) => {
  return (
	<div className='py-3 text-white'>
		 <div className='flex justify-between items-center'>
			<div className='flex gap-3 items-center'>
				 <div className='w-12 h-12 rounded-full p-[1px] border-2 border-transparent bg-gradient-to-bl to-yellow-500 via-red-500 from-pink-500'>
				 <div className='w-full h-full rounded-full bg-white p-[2px]'>
					<img className='rounded-full w-full h-full object-cover' src={`https://instagram-api.softclub.tj/images/${data.avatar}`} alt="" />
				 </div>
				 </div>
				 <div>
					<h2>{data.userName}</h2>
					<p className='text-gray-300 text-sm'>{data.fullName}</p>
				 </div>
			</div>
			<div>
			  <button className='text-blue-500 text-sm hover:text-white cursor-pointer'>Follow</button>
			</div>
		 </div>
	 </div>
  )
}

export default RecomendedUsers