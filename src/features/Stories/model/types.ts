export interface IStoryData {
	id: number
	fileName: string
	postId: null | string | number
	createAt: string
	liked: boolean
	likedCount: number
}

export interface StoryVideo {
	id: number | string
	fileName: string
	postId: null
	createAt: string
	liked: boolean
	likedCount: number
	contentType?: string
}

export interface IStories {
	userId: number | string
	userName: string
	userImage: string
	stories: IStoryData[]
}
