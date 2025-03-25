type ReelsDivProps = {
	img: string
}
const Avatar: React.FC<ReelsDivProps> = ({ img }) => {
	return (
		<div>
			<div className='lg:w-[200px] lg:h-[200px] w-[100px] h-[100px] rounded-full overflow-hidden'>
				<img src={img} alt='' className='object-cover w-full h-full' />
			</div>
		</div>
	)
}

export default Avatar
