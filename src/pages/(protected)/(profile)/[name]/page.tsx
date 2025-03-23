import Avatar from '@/shared/ui/avatar'
import ReelsDiv from '@/shared/ui/reels-div'
import StoryCircle from '@/shared/ui/story-circle'
import HeaderSectionProfile from '@/widgets/header-section-profile'
import ReelsContainer from '@/widgets/reels-container'
import SectionNavigate from '@/widgets/section-navigate'
import StorySection from '@/widgets/section-story'

export default function ProfileByNamePage(){
  return <div className='ml-[300px] overflow-hidden max-w-[900px] w-full py-[50px] '>
    123
    <section className='flex gap-[100px] items-center'>
      <Avatar img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-mQ4m3Wa3ejCjc_ou5MpeHrd9Xe-rDg5-7A&s"}/>
      <HeaderSectionProfile/>
    </section>
    <StorySection>
      <StoryCircle/>
    </StorySection>
    <SectionNavigate/>
    <ReelsContainer>
      <ReelsDiv img={"https://media4.giphy.com/media/8t6ef4FCRAAOgS2EnQ/giphy.gif?cid=6c09b952alimog7hjq2kzudoxrgtqtmmswlg6b3zfwwnh88p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"}/>
      <ReelsDiv img={"https://media4.giphy.com/media/8t6ef4FCRAAOgS2EnQ/giphy.gif?cid=6c09b952alimog7hjq2kzudoxrgtqtmmswlg6b3zfwwnh88p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"}/>
      <ReelsDiv img={"https://media4.giphy.com/media/8t6ef4FCRAAOgS2EnQ/giphy.gif?cid=6c09b952alimog7hjq2kzudoxrgtqtmmswlg6b3zfwwnh88p&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g"}/>
    </ReelsContainer>
  </div>
}