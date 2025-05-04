/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from 'lucide-react'
import { Button } from '@/shared/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import ReelsContainer from './reels-container'
import ReelsDiv3 from './ReelsDiv_3'
import { Key } from 'react'


type UserShortInfo = {
	id: string
	userName: string
	userPhoto: string
	fullname: string
	displayName?: string
	isLoading?: boolean
}

type Subscriber = {
	userShortInfo: UserShortInfo
}
type Post = {
	id: string
	images: string[]
	postLikeCount: number
	commentCount: number
}

type SubscribersModalProps = {
	open: boolean
	setOpen: (open: boolean) => void
	subscribers: Subscriber[] | undefined
	posts: Post[] | undefined  // ✅ Add this line
}


export default function SubscribersModal({
	open,
	setOpen,
	posts
}: SubscribersModalProps) {
	// async function postStory(id : string | undefined) {
	// 	try {
	// 		await 
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// } 
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-2xl bg-[#242424] text-white border-gray-800 p-0 gap-0'>
				<DialogHeader className='px-4 py-2 border-b border-gray-800 flex flex-row items-center justify-between'>
					<DialogTitle className='text-center flex-1'>Add Stories Modal</DialogTitle>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => setOpen(false)}
						className='absolute right-2 top-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-full h-8 w-8'
					>
						<X className='h-4 w-4' />
					</Button>
				</DialogHeader>
				<div style={{scrollbarWidth : "none"}} className='h-[60vh] overflow-y-scroll'>
				<ReelsContainer>
					{posts?.map((post: { id: Key | null | undefined; images: any[]; postLikeCount: number; commentCount: string | number }) => (
						<div className='' key={post.id}>
							<ReelsDiv3	
							img={`https://instagram-api.softclub.tj/images/${post.images[0]}`}
							likes={post.postLikeCount}
							comments={post.commentCount}
						/>
						</div>
					))}
				</ReelsContainer>
				</div>
			</DialogContent>
		</Dialog>
	)
}
