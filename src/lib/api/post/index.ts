import { getAccessToken } from "@/lib/tokenStore";
import { fetchApi } from "@/lib/utils";
import { INewPost, IUpdatePost } from "@/types";


export const createPost = async (post: INewPost, token: string) => {

    const response = await fetchApi("/post/create", "POST", post, token)

    return response

}

export const updatePost = async (post: IUpdatePost) => {

}