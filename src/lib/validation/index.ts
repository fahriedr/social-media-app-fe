import { z } from "zod"

export const SignupValidation = z.object({
    name: z.string().min(2, { message: "Too short"}),
    email: z.email(),
    username: z.string().min(2, { message: "Too short"}).max(50, { message: "Too long"}),
    password: z.string().min(8, { message: "Password must be at least 8 characters"})
})

export const SigninValidation = z.object({
  username: z.string(),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

export const PostValidation = z.object({
  caption: z.string().min(5, { message: "Minimum 5 characters." }).max(2200, { message: "Maximum 2,200 caracters" }),
  media: z.custom<File[]>(),
});