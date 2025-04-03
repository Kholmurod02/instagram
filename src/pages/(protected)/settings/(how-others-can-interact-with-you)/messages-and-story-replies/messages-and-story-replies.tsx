

export default function PageMessagesAndStoryReplies() {
  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-bold">Сообщения и ответы на истории</h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">
          Как пользователи могут с вами связаться
        </h3>
        <div className="mt-2 space-y-2">
          <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center">
            <span>Настройки сообщений</span>
            <span>&gt;</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center">
            <span>Ответы на истории</span>
            <span>&gt;</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">
          Кто видит, когда вы в сети
        </h3>
        <div className="mt-2">
          <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center">
            <span>Показывать статус "В сети"</span>
            <span>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  )
}

