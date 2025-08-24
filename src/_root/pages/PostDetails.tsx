import Carousel from '@/components/shared/Carousel'
import Loader from '@/components/shared/Loader'
import { useGetPostById } from '@/lib/react-query/queries'
import { multiFormatDateString } from '@/lib/utils'
import { PostMedia } from '@/types'
import { Link, useParams } from 'react-router-dom'

const PostDetails = () => {
  const params = useParams()

  const id: number = Number(params.id)


  const { data: post, isPending } = useGetPostById(id)

  console.log(isPending, "post")

  return (
    <div className='post_details-container w-full'>
      {isPending ? <Loader /> : (
        <div className='post_details-card w-auto'>
          <Carousel
            items={post.media.map((mediaItem: PostMedia) => (
              <img
                key={mediaItem.id}
                src={mediaItem.link_url || "assets/icons/profile-placeholder.svg"}
                className="post-card_img"
                alt="post image"
              />
            ))}
          />
          <div className='post_details-info'>
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
        </div>
      )}
    </div>
  )
}

export default PostDetails