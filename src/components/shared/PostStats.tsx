import { IPost } from '@/types';

type PostStatsProps = {
    post: IPost
    likePostHandler: () => void;
    bookmarkPostHandler: () => void;
}

const PostStats = ( {post, likePostHandler, bookmarkPostHandler}: PostStatsProps) => {
    return (
        <>
            <div className='flex justify-between items-center z-20'>
                <div className='flex flex-row gap-2'>
                    <div className='flex flex-row gap-2 items-center'>
                        <img
                            onClick={likePostHandler}
                            src={`${post.isLiked ? '/assets/icons/liked.svg' : '/assets/icons/like.svg'}`}
                            alt='like'
                            width={28}
                            height={28}
                            className='cursor-pointer'
                        />
                        <p className='small-medium lg:base-medium'>{post._count.likes || 0}</p>
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
                <div className='flex flex-row gap-2'>
                    <img
                        onClick={bookmarkPostHandler}
                        src={`${post.isBookmarked ? '/assets/icons/saved.svg' : '/assets/icons/save.svg'}`}
                        alt='like'
                        width={28}
                        height={28}
                        className='cursor-pointer'
                    />
                </div>
            </div>
        </>
    )
}

export default PostStats