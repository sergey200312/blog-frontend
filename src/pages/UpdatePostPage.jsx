import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import Header from '../components/Header';

export default function UpdatePostPage() {
    const { id } = useParams();
    const [postData, setPostData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/post/${id}`);
                setPostData(response.data.detailPost);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPost();
    }, [id]);

    const handleUpdatePost = async (updatedData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:3000/api/post/update/${id}`, updatedData, {
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
            {postData && (
                <PostForm
                    initialData={postData}
                    onSubmit={handleUpdatePost}
                    submitButtonText="Обновить пост"
                />
            )}
        </>
    );
}
