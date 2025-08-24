import { getAccessToken } from "@/lib/tokenStore";
import { fetchApi } from "@/lib/utils";
import { INewPost, IUpdatePost } from "@/types";


export const createPost = async (post: INewPost) => {
  const response = await fetchApi("/post/create", "POST", post, getAccessToken())

  return response

}

export const getPostById = async (postId: number) => {
  const response = await fetchApi(`/post/${postId}`, "GET", null, getAccessToken())

  return response.data
}

export const updatePost = async (post: IUpdatePost, postId: number) => {

  const response = await fetchApi(`/post/update/${postId}`, "PUT", post, getAccessToken())

  return response
}

export const getRecentPosts = async () => {
  const response = await fetchApi("/post/home", "GET", null, getAccessToken());

  return response;
};

export const getInfinitePosts = async () => {
  const response = await fetchApi("/post/infinite", "GET", null, getAccessToken())

  return response
}

export const likePost = async (id: number) => {
  const response = await fetchApi(`/like/${id}`, "POST", null, getAccessToken())

  return response
}

export const unlikePost = async (id: number) => {
  const response = await fetchApi(`/like/${id}`, "DELETE", null, getAccessToken())

  return response
}

export const bookmarkPost = async (id: number) => {
  const response = await fetchApi(`/post/bookmark/${id}`, "POST", null, getAccessToken())

  return response
}

export const deleteBookmarkPost = async (id: number) => {
  const response = await fetchApi(`/post/bookmark/${id}`, "DELETE", null, getAccessToken())

  return response
}