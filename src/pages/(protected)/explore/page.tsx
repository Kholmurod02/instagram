'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useGetPostsQuery } from '../../../entities/post/postApi'
import { Skeleton } from '@/shared/ui/skeleton'
import { InstagramDialog } from './exploreModal'
import { Heart, MessageCircle, Search } from 'lucide-react'
import DrawerSearch from '@/widgets/section-search'

export default function ExplorePage() {
	const [_expanded, setExpanded] = useState(true)
  const [searchDrawer, setSearchDrawer] = useState<boolean>(false)
	const [page, setPage] = useState(1)
	const { data: posts, isLoading, error, isFetching } = useGetPostsQuery(page)
	const [media, setMedia] = useState<
		{
			id: string
			url: string
			type: 'image' | 'video'
			likes: number
			commentsCount: number
			comments: any
		}[]
	>([])
	const observerRef = useRef<HTMLDivElement>(null)
	const [hasMore, setHasMore] = useState(true)

	useEffect(() => {
		if (posts?.data) {
		  setMedia(prev => {
			 const existingIds = new Set(prev.map(p => p.id))
	 
			 const newMedia = posts.data
				.filter((post: any) => !existingIds.has(post.postId))
				.map((post: any) => {
				  const fileUrl = `https://instagram-api.softclub.tj/images/${post.images[0]}`
				  const isVideo = fileUrl.endsWith('.mp4') || fileUrl.endsWith('.mov')
	 
				  return {
					 id: post.postId,
					 url: fileUrl,
					 type: isVideo ? 'video' : 'image',
					 likes: post.postLikeCount || 0,
					 commentsCount: post.commentCount || 0,
					 comments: post.comments || [],
					 caption: post.caption || 'salom',
					 createdAt: post.datePublished,
					 user: {
						username: post.userName,
						avatarUrl: post.userImage,
					 },
				  }
				})
	 
			 return [...prev, ...newMedia]
		  })
	 
		  setHasMore(posts.data.length > 0)
		}
	 }, [posts])
	 

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [entry] = entries
			if (entry.isIntersecting && hasMore && !isFetching) {
				setPage(prev => prev + 1)
			}
		},
		[hasMore, isFetching]
	)

	useEffect(() => {
		const observer = new IntersectionObserver(handleObserver, {
			root: null,
			rootMargin: '20px',
			threshold: 0.1,
		})

		if (observerRef.current) observer.observe(observerRef.current)

		return () => observer.disconnect()
	}, [handleObserver])

	if (error) {
		return (
			<div className='flex items-center justify-center h-screen text-red-500'>
				Error loading posts:{' '}
				{'message' in error ? error.message : 'Unknown error'}
			</div>
		)
	}

	const videos = media.filter(post => post.type === 'video')
	const images = media.filter(post => post.type === 'image')

	const arrangedMedia = []
	let videoIndex = 0
	let imageIndex = 0

	for (let i = 0; i < media.length; i++) {
		if (i % 5 === 2 && videos[videoIndex]) {
			arrangedMedia.push(videos[videoIndex])
			videoIndex++
		} else if (imageIndex < images.length) {
			arrangedMedia.push(images[imageIndex])
			imageIndex++
		}
	}

	return (
		<>
		  <div className='flex bg-black py-[15px] border-solid border-2 border-gray-800 w-[95%] m-auto rounded-[10px] my-[20px] sm:hidden items-center justify-center' onClick={() => {
        setSearchDrawer(true);
        setExpanded(false);
      }}>
      <Search className='w-6 h-6' /> 
    </div>

      <DrawerSearch searchDrawer={searchDrawer} setSearchDrawer={setSearchDrawer} setExpanded={setExpanded} />

		<div className='flex flex-col items-center justify-center mt-10 lg:px-4'>
			<div className='grid grid-cols-3 sm:grid-cols-3 gap-2 max-w-[1400px] mx-auto px-2'>
				{arrangedMedia.map(post => (    
					<InstagramDialog key={post.id} post={post}>
						<div
							className={`relative w-full cursor-pointer ${
								post.type === 'video' ? 'row-span-2' : ''
							}`}
						>
							{post.type === 'video' ? (
								<video
									src={post.url}
									autoPlay
									muted
									playsInline
									loop
									className='w-full h-[300px] lg:h-[900px] object-cover transition-transform duration-300 hover:scale-105'
								/>
							) : (
								<img
									src={post.url}
									alt={`Explore ${post.id}`}
									className='w-full h-[150px] lg:h-[450px] object-cover transition-transform duration-300 hover:scale-105'
									loading='lazy'
								/>
							)}

							<div className='absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
								<div className='flex gap-4 text-white text-sm font-medium'>
									<div className='flex items-center gap-1'>
										<Heart className='w-4 h-4' />
										<span>{post.likes}</span>
									</div>
									<div className='flex items-center gap-1'>
										<MessageCircle className='w-4 h-4' />
										<span>{post?.commentsCount}</span>
									</div>
								</div>
							</div>
						</div>
					</InstagramDialog>
				))}

				{(isLoading || isFetching) &&
					Array.from({ length: 6 }).map((_, index) => (
						<Skeleton
							key={`skeleton-${index}`}
							className='w-full h-[300px] sm:h-[200px]'
						/>
					))}
			</div>

			<div ref={observerRef} className='h-10' />

			{!hasMore && !isFetching && (
				<div className='py-8 text-center text-gray-500'>
					No more posts to load
				</div>
			)}
		</div>
		</>
	)
}
