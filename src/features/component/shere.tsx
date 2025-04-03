import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

const users = [
	{ id: 1, name: 'instagram', username: 'rio.tj' },
	{ id: 2, name: 'softclub.tj', username: 'mohvash_' },
	{ id: 3, name: 'belive_me_12_05_', username: 'dinara___8' },
	{ id: 4, name: 'BUSHRA ✨', username: 'bussshhhra' },
]

const ShareModal = ({
	isOpen,
	onClose,
}: {
	isOpen: boolean
	onClose: () => void
}) => {
	const [selectedUsers, setSelectedUsers] = useState<number[]>([])

	useEffect(() => {
		if (!isOpen) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.body.style.overflow = 'hidden'
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.body.style.overflow = 'auto'
			document.removeEventListener('keydown', handleKeyDown) 
		}
	}, [isOpen, onClose])

	const toggleUserSelection = (id: number) => {
		setSelectedUsers(prev =>
			prev.includes(id) ? prev.filter(userId => userId !== id) : [...prev, id]
		)
	}

	if (!isOpen) return null

	return (
		<div
			className='fixed inset-0 bg-[#120c0c79] flex justify-center z-50 items-center'
			onClick={onClose}
		>
			<div
				className='bg-black text-white rounded-lg w-[700px] p-4 shadow-lg'
				onClick={e => e.stopPropagation()}
			>
				<div className='flex justify-between items-center border-b border-gray-700 pb-2'>
					<h2 className='text-lg font-semibold'>Share</h2>
					<button onClick={onClose}>
						<X size={20} className='text-gray-400 hover:text-gray-200' />
					</button>
				</div>

				<div className='mt-2'>
					<input
						type='text'
						placeholder='Search...'
						className='w-full p-2 bg-gray-800 text-white rounded-md outline-none border border-gray-700'
					/>
				</div>

				<div className='mt-3 max-h-60 overflow-y-auto'>
					<p className='text-sm text-gray-400 mb-1'>Suggested</p>
					{users.map(user => (
						<div
							key={user.id}
							className={`flex items-center justify-between p-2 rounded-md cursor-pointer ${
								selectedUsers.includes(user.id) ? 'bg-gray-800' : ''
							}`}
							onClick={() => toggleUserSelection(user.id)}
						>
							<div>
								<p className='text-sm font-medium'>{user.name}</p>
								<p className='text-xs text-gray-400'>{user.username}</p>
							</div>
							<div
								className={`w-5 h-5 border rounded-full flex items-center justify-center ${
									selectedUsers.includes(user.id)
										? 'bg-blue-500 border-blue-500'
										: 'border-gray-500'
								}`}
							>
								{selectedUsers.includes(user.id) && (
									<div className='w-3 h-3 bg-white rounded-full'></div>
								)}
							</div>
						</div>
					))}
				</div>

				<button
					className={`w-full mt-3 py-2 rounded-md font-semibold ${
						selectedUsers.length > 0
							? 'bg-blue-600 text-white'
							: 'bg-blue-900 text-gray-400 cursor-not-allowed'
					}`}
					disabled={selectedUsers.length === 0}
					onClick={() => {
						onClose() 
					}}
				>
					Send
				</button>
			</div>
		</div>
	)
}

export default ShareModal
