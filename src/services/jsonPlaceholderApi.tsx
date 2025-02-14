import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define types for posts
interface Post {
  id: number;
  title: string;
  body: string;
}

export const jsonPlaceholderApi = createApi({
  reducerPath: "jsonPlaceholderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => "posts",
    }),
    createPosts: builder.mutation<Post, Partial<Post>>({
      query: (newPost) => ({
        url: "posts",
        method: "POST",
        body: newPost,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostsMutation } = jsonPlaceholderApi;