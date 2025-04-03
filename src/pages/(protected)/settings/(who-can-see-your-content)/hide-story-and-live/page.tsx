export default function PageHideStoryAndLive() {
  return (
    <div className="min-h-screen p-6 text-black">
      <h2 className="text-2xl font-bold text-white">Скрывать историю и эфиры</h2>
      <div className="mt-6">
        <div className="mt-2 space-y-2">
          <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center text-white">
            <span>Скрывать историю и эфиры от…</span>
            <span>&gt;</span>
          </div>
        </div>
      </div>
    </div>
  )
}