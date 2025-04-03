import { Switch } from '@mui/material'
import * as React from 'react'

export default function PageArchivingAndDownloading() {
  const [checked, setChecked] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <>
      <div className="min-h-screen p-6">
        <h2 className="text-xl font-bold">Архивирование и скачивание</h2>

        <div className="mt-6">
          <h3 className="text-lg font-semibold">
            Сохранение в архив
          </h3>
          <div className="mt-2 space-y-2">
            <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center">
              <span>Сохранить историю в архив</span>
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-[15px] font-semibold">
            Автоматически сохраняйте фото и видео в архиве, чтобы не занимать место на телефоне. Архив видите только вы.
          </h3>
        </div>
      </div>
    </>
  )
}