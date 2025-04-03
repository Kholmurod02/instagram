import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useLikePostMutation } from '@/entities/post/postApi'

interface LikeProps {
  postId: string
  initialLiked?: boolean
  initialLikes?: number
  size?: number
  onLikeChange?: (isLiked: boolean, newLikesCount: number) => void
}

const Like: React.FC<LikeProps> = ({ 
  postId, 
  initialLiked = false, 
  initialLikes = 0, 
  size = 30, 
  onLikeChange 
}) => {
  const [likePost] = useLikePostMutation()

  const storedLikes: Record<string, boolean> =
    JSON.parse(localStorage.getItem('likedPosts') || '{}')
  const storedLikesCount: Record<string, number> =
    JSON.parse(localStorage.getItem('likesCount') || '{}')

  const [liked, setLiked] = useState<boolean>(storedLikes[postId] ?? initialLiked)
  const [likes, setLikes] = useState<number>(storedLikesCount[postId] ?? initialLikes)

  useEffect(() => {
    setLiked(storedLikes[postId] ?? initialLiked)
    setLikes(storedLikesCount[postId] ?? initialLikes)
  }, [postId, initialLiked, initialLikes, storedLikes, storedLikesCount])

  const handleLike = async () => {
    const newLikedState = !liked
    const newLikesCount = newLikedState ? likes + 1 : likes - 1
    
    setLiked(newLikedState)
    setLikes(newLikesCount)
    
    const updatedLikes = { ...storedLikes, [postId]: newLikedState }
    const updatedLikesCount = { ...storedLikesCount, [postId]: newLikesCount }
    localStorage.setItem('likedPosts', JSON.stringify(updatedLikes))
    localStorage.setItem('likesCount', JSON.stringify(updatedLikesCount))
   
    if (onLikeChange) {
      onLikeChange(newLikedState, newLikesCount)
    }

    try {
      await likePost(postId)
    } catch (error) {
      console.error('Error liking post:', error)
      setLiked(!newLikedState)
      setLikes(likes)
      if (onLikeChange) {
        onLikeChange(!newLikedState, likes)
      }
    }
  }

  return (
    <button onClick={handleLike} className="flex items-center cursor-pointer gap-1">
      <Heart
        size={size} 
        className={liked ? 'fill-red-500 text-red-500' : 'text-gray-100'}
      />
      <span>{likes}</span>
    </button>
  )
}

export default Like
