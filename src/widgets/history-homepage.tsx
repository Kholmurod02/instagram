type THistory = {
	children: React.ReactNode
}

const HistoryHomepage: React.FC<THistory> = ({children}) => {
  return (
	<>
		 <div className="flex gap-5 shrink-0">
			{children}
		</div>
	</>
  )
}

export default HistoryHomepage