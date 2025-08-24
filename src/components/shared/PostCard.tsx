import { useUserContext } from '@/context/AuthContext';
import { multiFormatDateString } from '@/lib/utils';
import { IPost } from '@/types';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import { useLikePost, useDeleteLikePost, useBookmarkPost, useDeleteBookmarkPost } from '@/lib/react-query/queries';
import PostStats from './PostStats';

type PostCardProps = {
    post: IPost;
}
const PostCard = ({ post }: PostCardProps) => {

    const { user } = useUserContext()

    const {mutateAsync: likePost} = useLikePost()
    const {mutateAsync: deleteLikePost} = useDeleteLikePost()

    const {mutateAsync: bookmarkPost} = useBookmarkPost()
    const {mutateAsync: deleteBookmarkPost} = useDeleteBookmarkPost()

    const userId: number = +user.id as number

    const likePostHandler = async () => {

        const postId: number = +post.id as number

        if(post.isLiked) {
            await deleteLikePost(postId)
            return
        }

        await likePost(postId)
    }

    const bookmarkPostHandler = async () => {
        const postId: number = +post.id as number
        if(post.isBookmarked) {
            await deleteBookmarkPost(postId)
            return
        }
        await bookmarkPost(postId)
    }

    return (
        <div className='post-card w-auto'>
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
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

            <PostStats likePostHandler={likePostHandler} bookmarkPostHandler={bookmarkPostHandler} post={post}/>
            <div className='post-card-caption mt-2'>
                <p>{post.caption}</p>
            </div>
            
        </div>
    )
}

export default PostCard