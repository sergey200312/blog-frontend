import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PostForm({ initialData = {}, onSubmit, submitButtonText }) {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const [imageUrl, setImageUrl] = useState(initialData.image || '');
    const [imageFile, setImageFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const navigate = useNavigate();

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post('http://localhost:3000/api/upload', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setImageUrl(response.data.imageUrl);
            } catch (err) {
                console.error(err);
            } finally {
                setIsUploading(false);
            }
        } else {
            setImageFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSubmit({ title, content, imageUrl });
    };

    return (
        <div className='container mx-auto mt-16 flex items-center min-h-screen justify-center'>
            <div className='p-8 rounded-lg shadow-lg w-full'>
                <form className='space-y-6' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label htmlFor='title'>Название поста:</label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            placeholder='Введите название...'
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className='w-full mt-2 border border-black rounded-lg pl-1'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='content'>Содержание поста:</label>
                        <textarea
                            id='content'
                            value={content}
                            placeholder='Введите содержание...'
                            onChange={(e) => setContent(e.target.value)}
                            rows={15}
                            required
                            className='w-full mt-2 border border-black rounded-lg pl-1'
                        />
                    </div>
                    <div className='mb-8'>
                        <label htmlFor='image'>Загрузить изображение:</label>
                        <input
                            type='file'
                            id='image'
                            onChange={handleImageUpload}
                            className='ml-4 mt-2 border border-black rounded-lg'
                        />
                        {isUploading && (
                            <p className='mt-2 text-red-500'>Загрузка изображения...</p>
                        )}
                        {imageFile && (
                            <div className='flex justify-center mt-4'>
                                <img src={imageUrl} alt='Uploaded' className='rounded-md w-1/2 h-1/2' />
                            </div>
                        )}
                    </div>
                    <div className='flex justify-center items-center'>
                        <button type='submit' className='p-2 rounded-lg border border-black bg-black text-white hover:bg-gray-700'>
                            {submitButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
