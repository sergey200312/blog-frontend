import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';
import Header from '../components/Header';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import LoadingSpinner from '../components/LoadingSpinner';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/post/${id}`);
                setPost(response.data.detailPost);
            } catch (error) {
                console.error('Error fetching the post:', error);
            }
        };
        fetchPost();
    }, [id]);

    if (!post) {
        return <LoadingSpinner/>
    }

    return (
        <>
            <Header />
            <div className='container mx-auto px-4 mt-16 '>
                <PostCard postDetail={post} />
                {user.isLogged? <CommentForm/> : (
                    <Link to='/login'><div classNAme='p-6'>Войдите в аккаунт, чтобы оставить комментарий</div></Link>
                )}
                <CommentList/>
            </div>
        </>
    );
}

