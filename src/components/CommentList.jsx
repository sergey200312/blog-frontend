import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CommentItem from './CommentItem';
import LoadingSpinner from './LoadingSpinner';

export default function CommentList() {

    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/post/${id}/comments`)
                console.log(response.data);

                setComments(response.data.commentList)
                setLoading(false);

            } catch (err) {
                console.log(err)
                setLoading(false);
            }
        }

        fetchComments();
    }, [id])

    if (loading) {
        return <LoadingSpinner/>
    }

    return (
        <div className='p-8'>
            {comments.length > 0 ? (
                <CommentItem comments={comments} />
            ) : (
                <div className='flex justify-center items-center mt-4'>
                    <p className='text-center font-semibold text-2xl'>Комментариев нет</p>
                </div>
            )}
        </div>
    )
}
