type ReelsDivProps = {
	img: string
}
const Avatar: React.FC<ReelsDivProps> = ({ img }) => {
	return (
		<div>
			<div className='w-[170px] h-[170px] rounded-full overflow-hidden'>
				<img src={img} alt='' className='object-cover' />
			</div>
		</div>
	)
}

export default Avatar
