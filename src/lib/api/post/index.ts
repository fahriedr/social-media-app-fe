import { getAccessToken } from "@/lib/tokenStore";
import { fetchApi } from "@/lib/utils";
import { INewPost, IUpdatePost } from "@/types";


export const createPost = async (post: INewPost) => {


    const response = await fetchApi("/post/create", "POST", post, getAccessToken())

    return response

}

export const updatePost = async (post: IUpdatePost) => {

}

export const getRecentPosts = async () => {
  const response = await fetchApi("/post/home", "GET", null, getAccessToken());

  return response;
};

export const getInfinitePosts = async () => {
    const response = await fetchApi("/post/infinite", "GET", null, getAccessToken())

    return response 
}