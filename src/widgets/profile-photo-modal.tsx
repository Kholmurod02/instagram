import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Upload, Trash2 } from 'lucide-react'
import { useDeleteImageProfileMutation, useEditProfileImageMutation } from '@/app/store/profileSlice/profileSlice'
import { useRef, useState } from 'react'

export default function ProfilePhotoModal({
	open,
	setOpen,
}: {
	open: boolean
	setOpen: (open: boolean) => void
}) {
	const [DeleteImageProfile] = useDeleteImageProfileMutation()
	const [EditProfileImage] = useEditProfileImageMutation()
	const FileRef = useRef(null)
	async function deleteImageProfileF() {
		try {
			await DeleteImageProfile().unwrap()
			console.log('delete Image Profile')
			setOpen(false)
		} catch (error) {
			console.error(error)
			setOpen(false)
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async function fileChange(event: { target: { files: any[] } }) {
		const file = event.target.files[0]
		console.log(file)
		const formData = new FormData()
		formData.append("image" , file)
		try {
			await EditProfileImage(formData).unwrap()
			console.log("succes added image");
			refetch() 
			setOpen(false)
		} catch (error) {
			console.error(error);
		}
	}
	function clickOpenFile() {
		FileRef.current.click()
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className='sm:max-w-md bg-[#232323] text-white border-gray-800 p-0 gap-0 rounded-lg'>
				<DialogHeader className='px-4 py-4 border-b border-gray-800'>
					<DialogTitle className='text-center text-lg font-medium'>
						Change Profile Photo
					</DialogTitle>
				</DialogHeader>

				<div className='flex flex-col'>
					<input
						onChange={fileChange}
						type='file'
						name=''
						className='hidden'
						ref={FileRef}
						id=''
					/>
					<Button
						variant='ghost'
						onClick={clickOpenFile}
						className='py-4 cursor-pointer text-blue-500 hover:bg-gray-800 rounded-none text-base font-normal justify-center h-auto'
					>
						<Upload className='h-4 w-4 mr-2' />
						Upload Photo
					</Button>

					<Button
						variant='ghost'
						onClick={deleteImageProfileF}
						className='py-4 cursor-pointer text-red-500 hover:bg-gray-800 rounded-none text-base font-normal justify-center h-auto'
					>
						<Trash2 className='h-4 w-4 mr-2' />
						Delete Current Photo
					</Button>

					<Button
						variant='ghost'
						className='py-4 cursor-pointer text-white hover:bg-gray-800 rounded-none text-base font-normal justify-center h-auto border-t border-gray-800'
						onClick={() => setOpen(false)}
					>
						Cancel
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
