import * as z from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Textarea,
} from "@/components/ui";
import { PostValidation } from "@/lib/validation";
import { useToast } from "@/components/ui/use-toast";
import { useUserContext } from "@/context/AuthContext";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queries";
import FileUploader from "../shared/FileUploader";
import { INewPost } from "@/types";
import Loader from "../shared/Loader";
import { useState } from "react";
import { uploadFileHelper } from "@/lib/supabase/upload-file-helper";

type PostFormProps = {
  post?: INewPost;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext()
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const userId: number = +user.id

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      media: [],
    },
  });

  // Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } =
    useCreatePost();
  const { isPending: isLoadingUpdate } =
    useUpdatePost();

  const uploadMedia = async (value: z.infer<typeof PostValidation>) => {
    try {

      const uploadedFiles: string[] = []

      for (const file of value.media) {

        const uploadFile = await uploadFileHelper(userId, file, "post")

        if (!uploadFile) {
          return false
        }

        uploadedFiles.push(uploadFile)

      }

      return uploadedFiles

    } catch (err) {
      console.error("Form submit error:", err);
    }

  }

  // Handler
  const handleSubmit = async (value: z.infer<typeof PostValidation>) => {

    setIsLoading(true)

    const uploadFiles = await uploadMedia(value)

    if (!uploadFiles || uploadFiles.length === 0) {
      toast({
        title: "Upload failed. Please try again.",
      });
      setIsLoading(false)
    }

    if (action === "Create") {
      const post: INewPost = {
        caption: value.caption,
        media: uploadFiles
      }

      console.log(post, "post")

      const newPost = await createPost(post)

      if (!newPost) {
        toast({
          title: `${action} post failed. Please try again.`,
        });
      }
      navigate("/");

    }

    setIsLoading(false)

  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  media={post?.media}
                  multiple={true}
                  type="post"
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end">
          <Button
            type="button"
            className="shad-button_dark_4"
            onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate || isLoading}>
            {(isLoadingCreate || isLoadingUpdate || isLoading) && <Loader />}
            {action} Post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
