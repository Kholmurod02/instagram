import { Link } from 'lucide-react'
const InfoProfile = ({firstName,about}:{firstName:string , about : string}) => {
	return (
		<div>
			<div className=''>
				<p className='text-[#fff] text-[12px] font-bold lg:text-[20px]'>
					{firstName}
				</p>
				<p className='text-[#fff] text-[12px] lg:text-[20px]'>
					{about}
				</p>
			</div>
		</div>
	)
}

export default InfoProfile
