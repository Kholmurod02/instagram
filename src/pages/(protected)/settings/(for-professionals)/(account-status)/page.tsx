export default function PageAccountStatus() {
  return (
    <>
      <div className="min-h-screen p-6">
        <h2 className="text-xl font-bold">Статус аккаунта</h2>

        <div className="mt-4 bg-gray-800 p-4 rounded-xl flex items-center">
          <div className="w-12 h-12 bg-gray-600 rounded-full"></div>
          <div className="ml-4">
            <p className="font-semibold">softclub</p>
            <p className="text-gray-400 text-sm">Muhammad Hafizov</p>
          </div>
        </div>

        <p className="text-gray-400 text-sm mt-4">
          Посмотрите все действия, предпринятые Instagram в тех случаях, когда ваш аккаунт или контент нарушали наши нормы. Подробнее о статусе аккаунта
        </p>

        <div className="mt-4 space-y-2">
          <div className="bg-gray-800 p-4 rounded-xl flex justify-between items-center cursor-pointer">
            <div className="flex items-center">
              <span className="mr-2">📂</span>
              <span>Удалённый контент и проблемы при отправке сообщений</span>
            </div>
            <span className="text-green-500">✔</span>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl flex justify-between items-center cursor-pointer">
            <div className="flex items-center">
              <span className="mr-2">🔍</span>
              <span>Функции, которыми вы не можете пользоваться</span>
            </div>
            <span className="text-green-500">✔</span>
          </div>
        </div>
      </div>
    </>
  )
}