// import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useToast } from "@/components/ui";
import { useGetRecentPosts } from "@/lib/react-query/queries";
import { INewPost, IPost } from "@/types";
// import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Home = () => {
  const { toast } = useToast();

  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  
  if (isErrorPosts) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 w-full">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {posts.data.posts.map((post: IPost) => (
                <PostCard post={post} key={post.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
