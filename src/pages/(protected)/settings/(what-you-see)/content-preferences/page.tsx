export default function PageContentPreferences() {
  return (
    <div className="min-h-screen p-6 text-black">
      <h2 className="text-xl font-bold">Настройки контента</h2>
      <div className="mt-6">
        <h3 className="text-lg font-semibold">
          Контент из аккаунтов, на которые вы не подписаны
        </h3>
        <div className="mt-2 space-y-2">
          <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center">
            <span>Потенциально неприемлимый контент</span>
            <span>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  )
}