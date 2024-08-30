import React from 'react'
import { formatPostDate } from '../utils/DateFormatter'

export default function PostCard({ postDetail }) {
    return (
        <>
            <span className='text-base'>{formatPostDate(postDetail.date)}</span>
            <div className='flex justify-center'>
                <h1 className='text-3xl mt-4 #2C2C2C'>{postDetail.title}</h1>
            </div>
            <img
                src={postDetail.image}
                alt={postDetail.title}
                className='mt-4 w-full h-96 object-cover'
            />
            <p className='#4A4A4A text-xl mt-8'>{postDetail.content}</p>
        </>
    )
}
