import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import Header from '../components/Header';

export default function CreatePostPage() {
    const navigate = useNavigate();

    const handleCreatePost = async (postData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3000/api/new', postData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Header />
            <PostForm
                onSubmit={handleCreatePost}
                submitButtonText="Создать пост"
            />
        </>
    );
}
