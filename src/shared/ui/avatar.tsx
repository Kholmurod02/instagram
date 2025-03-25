import { Avatar as RadixAvatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

type ReelsDivProps = {
	img: string
}

const Avatar: React.FC<ReelsDivProps> = ({ img }) => {
	return (
		<RadixAvatar>
			<AvatarImage src={img} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
			<AvatarFallback>?</AvatarFallback>
		</RadixAvatar>
	)
}

export { Avatar, AvatarImage, AvatarFallback }
