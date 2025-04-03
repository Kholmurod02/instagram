import { useState } from 'react';

export default function PageLikeCount() {
  const [isHidden, setIsHidden] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center min-h-screen text-[gray] px-4">
      <h2 className="text-2xl font-semibold">Число отметок "Нравится" и репостов</h2>

      <div className="flex items-center justify-between w-full max-w-md mt-4">
        <span className="text-lg">Скрывать число отметок "Нравится" и поделившихся</span>
        <input
          type="checkbox"
          checked={isHidden}
          onChange={() => setIsHidden(!isHidden)}
          className="w-10 h-5 bg-gray-600 rounded-full appearance-none cursor-pointer checked:bg-blue-500 transition duration-300"
        />
      </div>

      <p className="mt-4 text-gray-400 max-w-md">
        В Instagram будет скрыто число отметок "Нравится" в публикациях и видео Reels от других аккаунтов.
        Вы можете скрыть число отметок "Нравится" для своих публикаций и видео Reels в разделе "Расширенные настройки", перед тем как поделиться.
      </p>

      <p className="mt-4 text-gray-400 max-w-md">
        В Threads число отметок "Нравится", просмотров, репостов и цитирований публикаций, размещенных другими профилями, будет скрыто.
        Вы можете скрыть эти данные в своих публикациях через меню настроек отдельной публикации.
        <span className="text-blue-500 cursor-pointer">Подробнее</span>
      </p>
    </div>
  )
}