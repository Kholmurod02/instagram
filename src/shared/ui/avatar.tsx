type ReelsDivProps = {
	img: string
}
const Avatar: React.FC<ReelsDivProps> = ({ img }) => {
	return (
		<div>
			<div>
				<img src={img} alt='' className='object-cover' />
			</div>
		</div>
	)
}

export default Avatar
