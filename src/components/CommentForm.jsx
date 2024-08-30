import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export default function CommentForm() {
    
    const [text, setText] = useState('');
    const { id } = useParams();

    async function handleClick(event){
        event.preventDefault();
        const token = localStorage.getItem('token'); 
        
        try {
            const response = await axios.post(`http://localhost:3000/api/post/${id}/comment/create`, { text },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        'Content-Type': 'application/json',
                    },
                }
            );
            setText('');          

        } catch(err) {
            console.log(err);
            }    
    }

    return (
        <div className='mt-20'>
            <form>
                <div className='flex flex-col justify-center items-center rounded-xl'>
                    <textarea
                        id='comment'
                        value={text}
                        name='comment'
                        rows='5'
                        cols='50'
                        placeholder='Введите комментарий...'
                        minLength={1}
                        onChange={e => setText(e.target.value)}
                        className='border border-gray-300 focus:border-gray-500 rounded-xl text-center'>
                    </textarea>
                    <button
                        type='submit'
                        onClick={handleClick}
                        className='p-1 mt-4 border border-gray-950 text-black rounded-lg hover:shadow-lg hover:shadow-gray-500'>
                        Отправить
                    </button>
                </div>
            </form>
        </div>
    )
}
