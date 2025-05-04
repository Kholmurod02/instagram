import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Smile, Mic, ImageIcon, Sticker, Heart, ArrowLeft, MoreVertical, Phone, Video, SendHorizontal } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useNavigate, useParams } from "react-router";
import { useDeleteMessageMutation, useGetChatByIdQuery, useSendMessageMutation } from "@/entities/chats/chat-api";
import { jwtDecode } from "jwt-decode";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";



interface Message {
	messageId: string;
	userName: string;
	userImage: string;
	messageText: string;
	sendMassageDate: string;
	file?: string;
}

interface JwtPayload {
	name: string;
	[key: string]: any;
}

export function ChatByIdPage() {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const allEmojis = [
		"😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇",

	];

	const [message, setMessage] = useState("");
	const [file, setFile] = useState<File[]>([]);
	const [userName, setUserName] = useState("");

	const [deleteMessage] = useDeleteMessageMutation();
	const { data, error, isLoading } = useGetChatByIdQuery(id ?? '', {
		skip: !id,
	});
	const [sendMessage] = useSendMessageMutation();

	const handleBackToList = () => {
		navigate('/chats');
	};

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			const decodedToken = jwtDecode<JwtPayload>(accessToken);
			setUserName(decodedToken.name);
		}
	}, []);

	function addSmile(el: string) {
		setMessage(prevMessage => prevMessage + el);
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (message.trim().length > 0 || file.length > 0) {
			const formData = new FormData();
			formData.append('ChatId', id ?? '');
			formData.append('MessageText', message);
			file.forEach(f => formData.append('file', f));

			sendMessage(formData);
			setMessage('');
			setFile([]);
		}
	};

	const userData = localStorage.getItem('user');
	const infoUser = userData ? JSON.parse(userData) : null;

	return (
		<div className='flex flex-col h-[600px] md:h-screen md:w-[700px] w-full mx-auto bg-background'>
			{/* Header */}
			<div className='flex items-center justify-between p-4 border-b'>
				<div className='flex items-center gap-3'>
					<Button
						variant='ghost'
						size='icon'
						className='rounded-full'
						onClick={handleBackToList}
					>
						<ArrowLeft className='h-5 w-5' />
					</Button>
					<div className='flex items-center gap-2'>
						<Avatar>
							<AvatarImage
								src={`https://instagram-api.softclub.tj/images/${infoUser?.receiveUserImage}`}
								alt='User Avatar'
							/>
							<AvatarFallback>
								{infoUser?.receiveUserName?.[0]?.toUpperCase() ?? 'U'}
							</AvatarFallback>
						</Avatar>
						<div>
							<h1 className='font-semibold text-lg'>
								{infoUser?.receiveUserName ?? 'User'}
							</h1>
							<p className='text-xs text-muted-foreground'></p>
						</div>
					</div>
				</div>
				<div className='flex items-center gap-2'>
					<Button variant='ghost' size='icon' className='rounded-full'>
						<Phone className='h-5 w-5' />
					</Button>
					<Button variant='ghost' size='icon' className='rounded-full'>
						<Video className='h-5 w-5' />
					</Button>
					<Button variant='ghost' size='icon' className='rounded-full'>
						<MoreVertical className='h-5 w-5' />
					</Button>
				</div>
			</div>

			{/* Chat Messages */}
			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{isLoading ? (
					// Skeleton Loading State
					<div className='space-y-6'>
						{/* Skeleton messages... */}
					</div>
				) : error ? (
					<div className='text-center p-4 text-red-500'>
						Error loading messages
					</div>
				) : (
					data?.data
						?.slice()
						.sort((a: any, b: any) => {
							const dateA = new Date(a.sendMassageDate).getTime();
							const dateB = new Date(b.sendMassageDate).getTime();
							return dateA - dateB;
						})
						.map((message: Message) => (
							<div
								key={message.messageId}
								className={cn(
									'flex flex-col max-w-[80%]',
									message.userName === userName
										? 'ml-auto items-end'
										: 'mr-auto items-start'
								)}
							>
								<div className='flex items-center gap-2'>
									{message.userName !== userName && (
										<Avatar>
											<AvatarImage
												src={`https://instagram-api.softclub.tj/images/${message.userImage}`}
												alt={message.userName}
											/>
											<AvatarFallback>
												{message.userName.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									)}
									<div className='rounded-2xl px-4 py-2 bg-muted'>
										<Popover>
											<PopoverTrigger>
												{message.file && (
													<img
														src={`https://instagram-api.softclub.tj/images/${message.file}`}
														alt='Attached file'
														className='mt-2 rounded-lg max-w-xs'
													/>
												)}
												<p>{message.messageText}</p>
											</PopoverTrigger>
											<PopoverContent className='h-[70px] w-[200px]'>
												<Button
													onClick={() => deleteMessage(message.messageId)}
													className='bg-muted hover:bg-black text-red-500'
												>
													Delete This Message
												</Button>
											</PopoverContent>
										</Popover>
									</div>
									{message.userName === userName && (
										<Avatar>
											<AvatarImage
												src={`https://instagram-api.softclub.tj/images/${message.userImage}`}
												alt={message.userName}
											/>
											<AvatarFallback>
												{message.userName.charAt(0).toUpperCase()}
											</AvatarFallback>
										</Avatar>
									)}
								</div>
								<span className='text-xs text-muted-foreground mt-1'>
									{format(new Date(message.sendMassageDate), 'dd MMM yyyy, HH:mm')}
								</span>
							</div>
						))
				)}
			</div>

			{/* Message Input Form */}
			<div className='md:p-4 py-3 border-t'>
				<form onSubmit={handleSubmit} className='flex items-center gap-2'>
					<Button
						type='button'
						variant='ghost'
						size='icon'
						className='rounded-full'
					>
						<Popover>
							<PopoverTrigger>
								<Smile className='h-5 w-5' />
							</PopoverTrigger>
							<PopoverContent className='h-[200px] overflow-auto'>
								{allEmojis.map((e, index) => (
									<span
										key={index}
										onClick={() => addSmile(e)}
										className='cursor-pointer'
									>
										{e}
									</span>
								))}
							</PopoverContent>
						</Popover>
					</Button>
					<input
						value={message}
						onChange={e => setMessage(e.target.value)}
						type='text'
						className='rounded-[10px] md:w-[250px] w-[130px] h-[35px] bg-muted'
						placeholder=' Напишите сообщение...'
					/>
					<Button type='submit' className='bg-muted '>
						<SendHorizontal size={'34px'} className='h-5 w-5 text-white' />
					</Button>
					<div className='flex items-center gap-1'>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							className='rounded-full'
						>
							<Mic className='h-5 w-5' />
						</Button>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							className='rounded-full relative'
						>
							<ImageIcon className='h-5 w-5' />
							<input
								onChange={e => {
									if (e.target.files && e.target.files.length > 0) {
										setFile(Array.from(e.target.files));
									}
								}}
								type='file'
								className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
								multiple
							/>
						</Button>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							className='rounded-full'
						>
							<Sticker className='h-5 w-5' />
						</Button>
						<Button
							type='button'
							variant='ghost'
							size='icon'
							className='rounded-full'
						>
							<Heart className='h-5 w-5' />
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}