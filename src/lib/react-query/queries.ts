import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createUserAccount,
  signInAccount,
  signOutAccount
} from "@/lib/api/user"
import { INewPost, INewUser, IUpdatePost } from "@/types";
import { bookmarkPost, createPost, deleteBookmarkPost, getPostById, getRecentPosts, likePost, unlikePost, updatePost } from "../api/post";
import { QUERY_KEYS } from "./queryKeys";
import { toast } from "@/components/ui";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {

  return useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
    onError: (error) => error,
    onSuccess: (data) => {
      console.log("Account created")
    }
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user: { username: string; password: string }) =>
      signInAccount(user),
    onError: (error) => {
      toast({
        variant: "default",
        title: "Login failed",
        description: error.message, })
    },
  });
};

export const useSignOutAccount = () => {
  return useMutation({
    mutationFn: signOutAccount
  });
};


// // ============================================================
// // POST QUERIES
// // ============================================================

// export const useGetPosts = () => {
//   return useInfiniteQuery({
//     queryKey: [QUERY_KEYS.GET_INFINITE_POSTS],
//     queryFn: getInfinitePosts as any,
//     getNextPageParam: (lastPage: any) => {
//       // If there's no data, there are no more pages.
//       if (lastPage && lastPage.documents.length === 0) {
//         return null;
//       }

//       // Use the $id of the last document as the cursor.
//       const lastId = lastPage.documents[lastPage.documents.length - 1].$id;
//       return lastId;
//     },
//   });
// };

// export const useSearchPosts = (searchTerm: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
//     queryFn: () => searchPosts(searchTerm),
//     enabled: !!searchTerm,
//   });
// };

export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};

export const useGetPostById = (postId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_BY_ID, postId],
    queryFn: () => getPostById(postId),
    // enabled: !!postId,
  });
};

// export const useGetUserPosts = (userId?: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USER_POSTS, userId],
//     queryFn: () => getUserPosts(userId),
//     enabled: !!userId,
//   });
// };

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { post: IUpdatePost, postId: number}) => updatePost(data.post, data.postId),
    onSuccess: (data) => {
      console.log("success update post", data)
      queryClient.invalidateQueries({
        // queryKey: [QUERY_KEYS.GET_POST_BY_ID, data.id],
      });
      toast({
        title: "Post updated successfully",
        variant: "default"
      })
    },
  });
};

// export const useDeletePost = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({ postId, imageId }: { postId?: string; imageId: string }) =>
//       deletePost(postId, imageId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
//       });
//     },
//   });
// };

export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => likePost(postId),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      // });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => unlikePost(postId),
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEYS.GET_POST_BY_ID, data?.$id],
      // });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useBookmarkPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) =>
      bookmarkPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

export const useDeleteBookmarkPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postId: number) => deleteBookmarkPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER],
      });
    },
  });
};

// // ============================================================
// // USER QUERIES
// // ============================================================

// export const useGetCurrentUser = () => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//     queryFn: getCurrentUser,
//   });
// };

// export const useGetUsers = (limit?: number) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USERS],
//     queryFn: () => getUsers(limit),
//   });
// };

// export const useGetUserById = (userId: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
//     queryFn: () => getUserById(userId),
//     enabled: !!userId,
//   });
// };

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (user: IUpdateUser) => updateUser(user),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
//       });
//     },
//   });
// };
