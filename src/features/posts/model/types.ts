export interface IPost {
	likes: number | undefined
	liked: boolean | undefined
	description: string
	id: null | undefined
	postId: number | string
	userId: string
	userName: string
	userImage: string
	datePublished: string
	images: string[]
	postLike: boolean
	postLikeCount: number
	userLikes: string[]
	commentCount: number
	comments: string[]
	postView: number
	userViews: string[]
	postFavorite: boolean
	userFavorite: string[]
	title: null | string
	content: string
	saved: boolean
}

export interface PostData {
	postId: string
	userId: string
	userName: string
	userImage: string
	content: string
	datePublished: string
	images: string[]
	postLikeCount: number
	commentCount: number
	saved: boolean
}
