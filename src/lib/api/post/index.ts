import { getAccessToken } from "@/lib/tokenStore";
import { fetchApi } from "@/lib/utils";
import { INewPost, IUpdatePost } from "@/types";


export const createPost = async (post: INewPost) => {


    const response = await fetchApi("/post/create", "POST", post, getAccessToken())

    return response

}

export const updatePost = async (post: IUpdatePost) => {

}