type THistory = {
	children: React.ReactNode
}

const HistoryHomepage: React.FC<THistory> = ({children}) => {
  return (
	<>
		 <div className="md:py-0 py-3 flex gap-5 shrink-0">
			{children}
		</div>
	</>
  )
}

export default HistoryHomepage