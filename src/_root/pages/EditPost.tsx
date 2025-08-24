import PostForm from '@/components/forms/PostForm'
import { useGetPostById } from '@/lib/react-query/queries'
import { Loader } from 'lucide-react';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams() as { id: number | any };

  const {data: post, isPending} = useGetPostById(id)

  return (
    <div className='flex flex-1'>
      <div className='common-container'>
        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
          <img src="/assets/icons/add-post.svg" alt="add-post" width={36} height={36} />
          <h3 className='h3-bold md:h2-bold text-left w-full'>
            Edit Post
          </h3>

        </div>
        {isPending ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  )
}

export default EditPost