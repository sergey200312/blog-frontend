import React from 'react'
import { EyeIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import truncateText from '../utils/TruncateText'
import { formatPostDate } from '../utils/DateFormatter';
import axios from 'axios';
import useAuth from '../hooks/useAuth';


export default function Post({ posts, onPostDelete }) {

    const navigate = useNavigate();
    const { user } = useAuth();

    const handleClick = (event, id) => {
        event.preventDefault();

        navigate(`/post/update/${id}`);
    }

    const toggleVisibility = () => {
        setIsVisible(true);
    }

    const handleDelete = async (event, id) => {
        event.preventDefault();
        try {
            const confirmDelete = window.confirm("Вы действительно хотите удалить этот пост?");
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`http://localhost:3000/api/post/delete/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                });
                onPostDelete(id);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {posts.map((post) => (
                <div
                    key={post._id}
                    className='bg-[#FAF3E0]
 p-6 rounded-lg shadow-lg flex flex-col transform transition-transform duration-700 hover:scale-105 hover:shadow-2xl hover:opacity-90 hover:bg-light-gray '
                >
                    <Link to={`/post/${post._id}`} className='block flex-1'>
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-50 object-cover rounded-md mb-2"
                        />
                        <h2 className='text-2xl text-black font-bold mb-2'>{post.title}</h2>
                        <p className='text-gray-700 text-base'>{truncateText(post.content, 100)}</p>
                        <div className='flex items-center mt-3'>
                            <span className='text-gray-500 mr-2 text-sm'>{formatPostDate(post.date)}</span>
                            <div className='flex items-center'>
                                <EyeIcon className='h-6 w-6 text-gray-600 mr-1' />
                                <p className='text-gray-500 text-sm'>{post.viewsCount}</p>
                                {user.role === 'ADMIN' && (
                                    <>
                                        <button
                                            type='button'
                                            onClick={(event) => handleClick(event, post._id)}
                                            className='ml-2 border p-1 rounded-xl hover:shadow-lg hover:shadow-gray-500 border-gray-950'
                                        >
                                            Редактировать
                                        </button>
                                        <button
                                            type='button'
                                            onClick={(event) => handleDelete(event, post._id)}
                                            className='ml-2 border p-1 rounded-xl hover:shadow-lg hover:shadow-gray-500 border-gray-950'
                                        >
                                            Удалить
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>
                    </Link>
                </div>
            ))}
        </>
    )
}
