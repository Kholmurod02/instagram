import * as React from 'react';
import Switch from '@mui/material/Switch';

export default function PageHiddenWords() {
    const [checked, setChecked] = React.useState(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    return (
        <>
            <div className='flex flex-col px-4 md:px-8 lg:px-16'>
                <div>
                    <h1 className='text-4xl md:text-5xl'>Скрытые слова</h1>
                </div>
                <div className="flex items-center mt-4">
                    <p className='mr-4 mb-2 text-sm md:text-base'>
                        Нежелательные комментарии и запросы на переписку
                    </p>
                    <Switch
                        checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                <p className='text-sm text-gray-500 md:text-base'>
                    Люди смогут добавлять GIF в комментариях к вашим публикациям и видео Reels.
                </p>
            </div>
        </>
    );
}