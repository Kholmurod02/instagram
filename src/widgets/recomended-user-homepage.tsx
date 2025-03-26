type TRecomended = {
	children: React.ReactNode
}

const RecomendedUserHomepage: React.FC<TRecomended> = ({children}) => {
  return (
	 <div>
		{children}
	 </div>
  )
}

export default RecomendedUserHomepage