import { useState } from 'react';
import { Link } from 'react-router';

const RecomendedUsers = ({ data }) => {
  const [isFollowing, setIsFollowing] = useState(false); // локальный флаг

  const handleFollowClick = () => {
    setIsFollowing(prev => !prev); // переключаем состояние
  };

  return (
    <div className='py-3 text-white'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-3 items-center'>
          <div className='w-12 h-12 rounded-full p-[1px] border-2 border-transparent cursor-pointer'>
            <div className='w-full h-full rounded-full bg-white p-[2px]'>
              {data.avatar ? (
                <img 
                  className='rounded-full w-full h-full object-cover' 
                  src={`https://instagram-api.softclub.tj/images/${data.avatar}`} 
                  alt={data.userName} 
                />
              ) : (
                <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-lg font-semibold text-gray-600">
                    {data.userName.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div>
            <Link to={`/profile/${data.id}`}>
              <h2 className="font-medium">{data.userName}</h2>
              <p className='text-gray-300 text-sm'>{data.fullName}</p>
            </Link>
          </div>
        </div>
        <div>
          <button 
            onClick={handleFollowClick}
            className={`text-sm cursor-pointer transition-colors duration-200 ${
              isFollowing ? 'text-red-500 hover:text-white' : 'text-blue-500 hover:text-white'
            }`}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecomendedUsers;
