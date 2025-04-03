import { Switch } from '@mui/material'
import * as React from 'react'


export default function PageAccountTypeAndTools() {
      const [checked, setChecked] = React.useState(true)
    
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
      }
    return (
      <>
        <div className="min-h-screen  p-6">
          <h2 className="text-xl font-bold">Тип аккаунта и инструменты</h2>

          <div className="mt-6">
            <h3 className="text-lg font-semibold">
            Тип аккаунта
            </h3>
            <div className="mt-2 space-y-2">
              <div className="bg-gray-800 p-4 rounded-xl cursor-pointer flex justify-between items-center">
                <span>Переключение на профессиональный аккаунт</span>
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ 'aria-label': 'controlled' }}
                />            </div>
            </div>
          </div>
        </div>
      </>
    )
  }
