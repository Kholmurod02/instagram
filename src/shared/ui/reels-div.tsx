type ReelsDivProps = {
	img: string
}
const ReelsDiv: React.FC<ReelsDivProps> = ({ img }) => {
	return (
		<div>
			<aside className='lg:w-[300px] h-[150px] lg:h-[500px]'>
				<img src={img} className='object-cover w-full h-full' alt='' />
			</aside>
		</div>
	)
}

export default ReelsDiv
