import React from 'react'
import { formatCommentDate } from '../utils/DateFormatter';

export default function CommentItem({ comments }) {
    return (
        <>
            <div>
                <p className='text-2xl font-normal'>Комментарии ({comments.length})</p>
                {comments.map((comment) => (
                    <div key={comment._id} className='p-4 mt-4 border rounded-xl'>
                        <h6 className=' text-xl'>{comment.user.username}</h6>
                        <span className='text-sm'>{formatCommentDate(comment.date)}</span>
                        <p className='mt-2 text-gray-900 text-base'>{comment.text}</p>
                    </div>
                ))}
            </div>
        </>
    )

}
