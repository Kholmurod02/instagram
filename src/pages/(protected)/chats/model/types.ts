export interface IChat {
	sendUserId: string
	sendUserName: string
	sendUserImage: string
	chatId: number
	receiveUserId: string
	receiveUserName: string
	receiveUserImage: null
}
export interface decodedToken {
	sid: string | null
	name: string
}
