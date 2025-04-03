import { ModeToggle } from '@/features/mode-toggle/mode-toggle'
import Switch from '@mui/material/Switch'
import * as React from 'react'

export default function Comment() {
    const [checked, setChecked] = React.useState(true)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    return (
        <>
            <div className='flex flex-col items-start justify-start px-4 md:px-8 lg:px-16'>
                <h1 className='text-4xl md:text-5xl'>Комментарии</h1>
                <div className="flex items-center mt-4">
                    <p className='mr-4 mb-2 text-sm md:text-base'>Разркомментировать с GIF</p>
                    <Switch 
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled'}}
                    />
                    <ModeToggle />
                </div>
                <p className='text-sm text-gray-500 md:text-base'>
                    Люди смогут добавлять GIF в комментариях к вашим публикациям и видео Reels.
                </p>
            </div>
        </>
    )
}
