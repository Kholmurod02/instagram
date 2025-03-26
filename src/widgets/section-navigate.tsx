import PostIcon from '@/shared/icons/post-icon'
import ReelsIcon from '@/shared/icons/Reels-icon'
import SavedIcon from '@/shared/icons/saved-icon'
import TaggedIcon from '@/shared/icons/tagged-icon'


const SectionNavigate = () => {
  return (
	 <div>
		<section className='flex gap-[60px] justify-center w-[95%] border-t-[gray] border-t-[1px] py-[10px] text-[#fff]'>
      <aside className='flex gap-[10px] items-center '>
      <PostIcon/>
      <p className='lg:block hidden'>POSTS</p>
      </aside>
      <aside className='flex gap-[10px] items-center'>
      <ReelsIcon/>
      <p className='lg:block hidden'>REELS</p>
      </aside>
      <aside className='flex gap-[10px] items-center'>
      <SavedIcon/>
      <p className='lg:block hidden'>SAVED</p>
      </aside>
      <aside className='flex gap-[10px] items-center'>
      <TaggedIcon/>
      <p className='lg:block hidden'>TAGGED</p>
      </aside>
    </section>		
	 </div>
  )
}

export default SectionNavigate
