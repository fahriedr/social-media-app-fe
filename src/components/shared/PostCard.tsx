import { useUserContext } from '@/context/AuthContext';
import { multiFormatDateString } from '@/lib/utils';
import { IPost } from '@/types';
import React from 'react'
import { Link } from 'react-router-dom';
import Carousel from './Carousel';

type PostCardProps = {
    post: IPost;
}
const PostCard = ({ post }: PostCardProps) => {

    const { user } = useUserContext()

    const userId: number = +user.id as number

    return (
        <div className='post-card'>
            <div className='flex-between'>
                <div className='flex items-center gap-2'>
                    <Link to={`/profile/${post.user.id}`}>
                        <img
                            src={post.user.avatar}
                            alt={"creator"}
                            className='rounded-full w-12 lg:h-12'
                        />
                    </Link>

                    <div className='flex flex-col'>
                        <p className='base-medium lg:body-bold text-light-1'>{post.user.username}</p>
                        <div className='flex-center gap2 text-light-3'>
                            <p className='subtle-semibold lg:small-regular'>{multiFormatDateString(post.timestamp)}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/update-post/${post.id}`} className={`${post.user.id !== userId && "hidden"}`}>
                    <img
                        src='/assets/icons/edit.svg'
                        alt='edit'
                        width={20}
                        height={20}
                        className='cursor-pointer'
                    />
                </Link>
            </div>

            <Link to={`/post/${post.id}`}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                </div>

                <Carousel
                    items={post.media.map((mediaItem) => (
                        <img
                            key={mediaItem.id}
                            src={mediaItem.link_url || "assets/icons/profile-placeholder.svg"}
                            className="post-card_img"
                            alt="post image"
                        />
                    ))}
                />
            </Link>

            <div className='flex flex-row gap-4 mt-4'>
                <div className='flex flex-row gap-2'>
                    <img
                        src='/assets/icons/like.svg'
                        alt='like'
                        width={28}
                        height={28}
                    />
                    <p>{post._count.likes || ''}</p>
                </div>
                <div className='flex flex-row gap-2'>
                    <img
                        src='/assets/icons/chat.svg'
                        alt='like'
                        width={28}
                        height={28}
                    />
                    <p>{post._count.comments || ''}</p>
                </div>
            </div>
            
            <div className='post-card-caption mt-2'>
                <p>{post.caption}</p>
            </div>
        </div>
    )
}

export default PostCard