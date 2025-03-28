import * as React from 'react';
import Switch from '@mui/material/Switch';



export default function PageHiddenWords() {
const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked);
    };
    return <>
        <div className='flex flex-col ml-[140px]'>
            <div>
                <h1 className='text-[45px]'>Скрытые слова
                </h1>
            </div>
            <div className="flex">
                <p className='mt-[4px] mr-[40px] mb-[10px]'>Нежелательные комментарии и запросы на переписку
                </p>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
            </div>
            <p className='text-[15px] text-[gray]'>Люди смогут добавлять GIF в комментариях к вашим публикациям и видео Reels.</p>
        </div>
    </>
}