import { AlertCircle } from 'lucide-react';

export default function Subscriptions() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-[gray] px-4">
      <div className="flex flex-col items-center text-center">
        <div className="p-4 rounded-full border border-gradient-to-r from-purple-500 to-orange-500">
          <AlertCircle size={48} className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Нет платных подписок</h2>
        <p className="mt-2 text-gray-400">В настоящее время у вас нет активных платных подписок.</p>
      </div>

      <div className="w-full max-w-md border-t border-gray-700 my-6"></div>

      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold">Настройки</h3>
        <div className="flex items-center justify-between mt-4 cursor-pointer hover:bg-gray-800 p-3 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-white">
              <AlertCircle size={20} />
            </span>
            <span className="text-gray-300">Помощь и поддержка</span>
          </div>
          <span className="text-gray-500">&gt;</span>
        </div>
      </div>
    </div>
  );
}
