"use client"
import { cn } from "@/shared/lib/utils"
import { Search} from 'lucide-react'
import { useState } from 'react'
import * as React from "react"
import { X } from "lucide-react"
import {useSearchUsersQuery, useDeleteUserMutation, useSearchUsersAfterClickQuery, usePostUserMutation, useDeleteAllUserMutation} from '@/entities/search/search'
import { Skeleton } from '@/shared/ui/skeleton'
import { NavLink } from 'react-router'
import { StoryModal } from '@/widgets/StoriesModal'
import { useGetStoryByidQuery } from '@/app/store/profileSlice/profileSlice'


interface DrawerSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  searchDrawer: boolean;
  setSearchDrawer: (value: boolean) => void;
  setExpanded: (value: boolean) => void;
}

interface Users {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  users: any
  id: number,
  avatar: string,
  fullName: string,
  subscribersCount: number,
  userName: string
}

export default function DrawerSearch({
  searchDrawer,
  setSearchDrawer,
  setExpanded,
  className, ...props 
}: DrawerSearchProps) {

  const [isFocused, setIsFocused] = useState(false)
  const [value, setValue] = useState("")
  const [isViewed, setIsViewed] = useState<boolean>(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { data: info, isLoading: infoLoading, error: infoError} = useSearchUsersQuery(value);
  const { data, isLoading, error} = useSearchUsersAfterClickQuery([])
  const [deleteUser,{isLoading: deleteLoading}]=useDeleteUserMutation()
  const [postUser, {isLoading: postLoading}]=usePostUserMutation()
  const [deleteAllUser, {isLoading: deleteAllLoading}]=useDeleteAllUserMutation()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [idx,setIdx]=useState<string>('')
const {data:StoryById}=useGetStoryByidQuery(idx) 

 function clickOpenModal(id:string) {
  setIsViewed(true)
  setOpenModal(true)
  setIdx(id)  
}

  const handleFocus = () => {
    setIsFocused(true) 
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (props.onChange) {
      props.onChange(e)
    }
  }

  const handleClear = () => {
    setValue("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const cardClick=(id:number)=>{
    postUser(id)
    setSearchDrawer(false);
    setExpanded(false);
    setValue('')    
  }


  if(error || isLoading || infoError || infoLoading || deleteLoading || postLoading || deleteAllLoading){
    return  <>
    <div className={cn(
          "fixed inset-0 bg-background/50 backdrop-blur-sm z-40 transition-opacity",
          searchDrawer ? "opacity-0" : "opacity-0 pointer-events-none",
        )} onClick={() => setSearchDrawer(false)} />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 rounded-tr-[15px] rounded-br-[15px] bottom-0 z-50 w-full sm:w-[400px] bg-background border-r shadow-lg transition-transform duration-300 ease-in-out",
          searchDrawer ? " translate-y-0 sm:translate-x-18" : "  sm:-translate-x-full sm:-translate-y-0 -translate-y-full",
        )}
      >

      <div className="flex flex-col  py-[20px] w-[100%] m-auto  h-[100vh]">
          <div>
          <Skeleton className='w-[240px] h-[35px] rounded-[10px] mx-[20px]'/>
          </div>
          <div className="relative w-[90%] ml-[5%]">
          <input
        ref={inputRef}
        type="text"
        value={value} onChange={handleChange}
        placeholder='Поиск'
        className={cn(
          "h-[40px] w-full my-[30px] rounded-[7px] bg-muted px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out",
          isFocused || value ? "pl-3 pr-8" : "pl-8 pr-3",
          className,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />

      {!isFocused && !value && (
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-200 ease-in-out" />
      )}

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 ease-in-out"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
          {/* <Skeleton className='w-full h-[40px] my-[30px]'/> */}
    </div>
          <hr className='w-full border-1 border-solid '/>

    

          {
       value=='' ? data?.data?.length ==0 ?
       <div> <hr className='w-full border-1 border-solid '/>
       <Skeleton className=' m-[20px] w-[100px] h-[25px] '/> </div>
      : <div >
        <hr className='w-full border-1 border-solid '/>
        <div className='flex justify-between text-[14px] p-[20px] items-center'><Skeleton className=' w-[100px] h-[25px] '/>
        <Skeleton className='w-[120px] h-[25px] '/></div>
        
      </div> : ''
     }

    
      { 
        value == '' ?  <div>
      
        <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
                <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
              <div className='w-[75%] flex flex-col gap-[10px]' >
                <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
                <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
              </div>
              
            </div>
            <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
                <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
              <div className='w-[75%] flex flex-col gap-[10px]' >
                <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
                <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
              </div>
              
            </div>
        
         
      </div>  : <div>
      
      <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div>
          <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div>
          <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div> 
          <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div>
          <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div>
          <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div>
          <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div>
          <div  className='flex py-[8px]  items-center gap-[20px] px-[20px]' >
              <Skeleton className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%] flex flex-col gap-[10px]' >
              <Skeleton className='w-[150px] h-[15px] rounded-[10px]'/>
              <Skeleton className='w-[250px] h-[15px] rounded-[10px]'/>
            </div>
            
          </div>
      
       
    </div> 
      }
    
        </div>
        
      </div>
    </>
  }
  
  const mobileVersion=()=>{
    setSearchDrawer(false)
    setValue('')
  }


  return (
   <> 
  
   <div className={cn(
          "fixed inset-0 bg-background/50 backdrop-blur-sm z-40 transition-opacity",
          searchDrawer ? "opacity-0" : "opacity-0 pointer-events-none",
        )} onClick={() => setSearchDrawer(false)} />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 left-0 rounded-tr-[15px] rounded-br-[15px] bottom-0 z-50 w-full sm:w-[400px] bg-background border-r shadow-lg transition-transform duration-300 ease-in-out",
          searchDrawer ? " translate-y-0 sm:translate-x-18" : "  sm:-translate-x-full sm:-translate-y-0 -translate-y-full",
        )}
      >


        <div className="flex flex-col  py-[20px] w-[100%] m-auto  h-[100vh]">
          <div>
            <p className='text-[25px] px-[20px] text-white font-semibold  tracking-[1px] '>Поисковый запрос</p>
          </div>
          <div className="relative flex items-center gap-[20px] w-[90%] ml-[5%]">
      <input
        ref={inputRef}
        type="text"
        value={value} onChange={handleChange}
        placeholder='Поиск'
        className={cn(
          "h-[40px] w-full my-[30px] rounded-[7px] bg-muted px-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out",
          isFocused || value ? "pl-3 pr-8" : "pl-8 pr-3",
          className,
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />

      {!isFocused && !value && (
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-all duration-200 ease-in-out" />
      )}

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute sm:right-2.5 right-[90px] top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-all duration-200 ease-in-out"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </button>
      )}
      <button onClick={mobileVersion} className='block sm:hidden'>Отмена</button>
    </div>

    

     {
       value=='' ? data?.data?.length ==0 ?
       <div> <hr className='w-full border-1 border-solid '/>
       <p className='tracking-[1px] font-semibold p-[20px] text-[14px]'>Недавнее</p> </div>
      : <div >
        <hr className='w-full border-1 border-solid '/>
        <div className='flex justify-between text-[14px] p-[20px] items-center'><p className='tracking-[1px] font-semibold '>Недавнее</p> 
        <button className='text-[#0095F6] font-semibold hover:text-white' onClick={deleteAllUser}>Очистить все</button></div>
        
      </div> : ''
     }

     <StoryModal
              open={openModal}
              setOpen={setOpenModal}
              storyData={StoryById}
            />
    
    <div>
      {
         value =='' ? data?.data?.length ==0 ? <div className='font-semibold  flex justify-center text-gray-400'>
         <p>Нет недавних запросов.</p> 
        </div> :  data?.data?.map((user:Users)=>{
          return  <div key={user?.id} className='flex py-[8px] hover:bg-[#20272b] items-center justify-between  px-[20px] ' >
            <div
            onClick={()=>clickOpenModal(user.users.id)}
					className={`w-[45px] h-[45px]  rounded-[50%] cursor-pointer p-[2px] 
            ${isViewed
              ? 'bg-gray-500'
              : 'bg-gradient-to-tr from-yellow-400 to-pink-600'
          }`}
				><img src={'https://instagram-api.softclub.tj/images/' + user.users.avatar} alt="" className='rounded-full w-[40px] h-[40px]'/>
        </div>
            
            <NavLink to={`/profile/${user.users.id}`} className='w-[75%]'>
            <div onClick={()=> setSearchDrawer(false)}>
              <p className='text-[16px] tracking-[1px] font-semibold'>{user.users.userName}</p>
              <p className='text-[12px]'>{user.users.fullName} • Подписчики: {user.users.subscribersCount} млн</p>
            </div>
            
             </NavLink> 
            <button onClick={()=> deleteUser(user.id)}> <X/> </button>
          </div>
        }) : info?.data?.length == 0 ? <div className='font-semibold  flex justify-center text-gray-400'>
          <p>Ничего не найдено</p> 
         </div>  : info?.data?.map((user:Users)=>{
           return  <NavLink to={`/profile/${user.id}`}>
            
           <div key={user.id} className='flex py-[8px] hover:bg-[#20272b] items-center gap-[20px] px-[20px]' onClick={()=>cardClick(user.id)}>
            <img src={'https://instagram-api.softclub.tj/images/' + user.avatar} alt="" className='w-[45px] h-[45px]  rounded-[50%]'/>
            <div className='w-[75%]'>
              <p className='text-[16px] tracking-[1px] font-semibold'>{user.userName}</p>
              <p className='text-[12px]'>{user.fullName} • Подписчики: {user.subscribersCount} млн</p>
            </div>
          </div>

          </NavLink>
        })
      }
    </div>
        </div>
        
      </div>
   </>
    
  )
}

