import { useEffect, useState } from 'react'
import { Bookmark, Loader2 } from 'lucide-react'
import { useSavePostMutation, useUnsavePostMutation } from '@/entities/post/postApi'
import { toast } from 'react-toastify'

interface SaveProps {
  postId: string,
  initialSaved?: boolean; 
}

const Save: React.FC<SaveProps> = ({ postId }) => {
  const [savePost, { isLoading: saving }] = useSavePostMutation()
  const [unsavePost, { isLoading: unsaving }] = useUnsavePostMutation()

  const storedSavedPosts: Record<string, boolean> =
    JSON.parse(localStorage.getItem('savedPosts') || '{}')

  const [saved, setSaved] = useState<boolean>(storedSavedPosts[postId] ?? false)

  useEffect(() => {
    setSaved(storedSavedPosts[postId] ?? false)
  }, [postId, storedSavedPosts])

  const handleSave = async () => {
    const newSavedState = !saved
    setSaved(newSavedState)
  
    const updatedSavedPosts = { ...storedSavedPosts, [postId]: newSavedState }
    localStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts))

    try {
      if (newSavedState) {
        await savePost(postId).unwrap()
        toast.success('Пост сохранен!')
      } else {
        await unsavePost(postId).unwrap()
        toast.info('Пост удален из сохраненного')
      }
    } catch (error) {
      console.error('Ошибка при сохранении поста:', error)
      toast.error('Ошибка сохранения поста!')
      setSaved(!newSavedState) 
    }
  }

  return (
    <div
      onClick={handleSave}
      className={`flex items-center gap-1 cursor-pointer ${saving || unsaving ? 'opacity-50 pointer-events-none' : ''}`}
      aria-disabled={saving || unsaving}
    >
      {saving || unsaving ? (
        <Loader2 size={25} className="animate-spin text-gray-500" />
      ) : (
        <Bookmark size={28} className={saved ? 'fill-blue-500 text-blue-500' : 'text-gray-100'} />
      )}
    </div>
  )
}

export default Save
