import { useState } from "react";

export default function PageSharingAndReuse() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center min-h-screen text-[gray] px-4">
      <h2 className="text-2xl font-semibold">Возможность делиться контентом</h2>
      <h3 className="mt-4 text-lg font-medium text-gray-300">
        Чем люди могут делиться в Instagram
      </h3>

      <div className="flex items-center justify-between w-full max-w-md bg-gray-800 p-4 rounded-lg mt-4 cursor-pointer">
        <span className="text-white">Истории в сообщениях</span>
        <input 
          type="checkbox"
          checked={isEnabled}
          onChange={() => setIsEnabled(!isEnabled)}
          className="w-10 h-5 bg-gray-600 rounded-full appearance-none cursor-pointer checked:bg-blue-500 transition duration-300"
        />
      </div>

      <p className="mt-4 text-gray-400 max-w-md">
        Разрешите людям отправлять ваши истории в сообщениях другим
        пользователям Instagram. Ваши истории могут видеть только ваши
        подписчики.
      </p>
    </div>
  );
}
