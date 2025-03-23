
type ReelsDivType = {
	children : React.ReactNode
}
const ReelsContainer:React.FC<ReelsDivType> = ({children}) => {
  return (
	 <div>
		<section className='grid grid-cols-3 gap-[10px] py-[30px]'>
      {children}
    </section>		
	 </div>
  )
}

export default ReelsContainer
