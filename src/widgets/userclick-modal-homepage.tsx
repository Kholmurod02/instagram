import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { useGetUsersHomepageQuery } from '@/entities/users-homepage/users-homepage'

const UserclickModalHomepage = () => {
  const [open, setOpen] = useState(false);
  const { data, error, isLoading } = useGetUsersHomepageQuery(undefined)
  if(error) return <div>Error loading users</div>
  if(!data || data.length === 0) return <div>No users found</div>
  if(isLoading) return <div>Loading...</div>


  return (
    <>
      <div className='flex justify-between'>
        <h2 className='text-gray-300'>Recomendate for you</h2>
        <p className='hover:text-gray-400 cursor-pointer' onClick={() => setOpen(true)}>All</p>
      </div>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Заголовок модального окна</DialogTitle>
          </DialogHeader>
          {data && (
            <ul>
              {data.data.map((user) => (
                <li key={user.id} className='border-b py-2'>{user.userName}</li>
              ))}
            </ul>
          )}
          <Button onClick={() => setOpen(false)}>Закрыть</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserclickModalHomepage;
