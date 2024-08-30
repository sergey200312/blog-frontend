import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './PostItem';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export default function Posts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api');
                setPosts(response.data.posts);
                setLoading(false);
            } catch (error) {
                setError('Ошибка при загрузке постов');
                setLoading(false);

            }
        };

        fetchPosts();
    }, []);

    const handlePostDelete = (id) => {
        setPosts(posts.filter(post => post._id !== id));
    }

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/post/new')
    }

    if (loading) {
        return <LoadingSpinner />
    }


    if (posts.length === 0) {
        return <div>Постов нет</div>
    }


    return (
        <div className='container mx-auto px-4 mt-10'>
            {user.role === 'ADMIN' && 
            (<div className='flex justify-center'>
                <button type='submit' onClick={handleClick} className='p-1 rounded-md border border-black hover:shadow-lg hover:shadow-gray-500 '>Создать пост</button>
            </div>)}
            <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Post posts={posts} onPostDelete={handlePostDelete} />
            </div>
        </div>
    );
};
