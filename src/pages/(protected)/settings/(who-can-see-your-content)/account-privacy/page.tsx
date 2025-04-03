import { Switch } from '@mui/material'
import * as React from 'react'



export default function AccountPrivacy() {
  const [checked, setChecked] = React.useState(true)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked)
  }
  return (
    <div className="min-h-screen p-6">
      <h2 className="text-xl font-bold">Конфиденциальность аккаунта</h2>

      <div className="mt-6">
        <div className="mt-2 space-y-2">
          <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center mb-[40px]">
            <span>Закрытый аккаунт</span>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </div>
        </div>
        <p className="text-lg font-semibold text-[15px]">
          Если у вас общедоступный аккаунт, ваш профиль и публикации видны всем пользователям в сети Instagram и вне ее, даже если у них нет аккаунта Instagram.
          Если у вас закрытый аккаунт, только одобренные вами подписчики будут видеть ваши публикации, в том числе фото и видео на страницах хэштегов и мест, а также список ваших подписчиков и подписок. Определенная информация в вашем профиле, например фото профиля и имя пользователя, видна всем в сети Instagram и вне ее. Подробнее
        </p>
      </div>
    </div>
  )
}