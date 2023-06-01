import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Posts } from "../models";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/",
  }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    getPosts: builder.query<Posts, void>({
      query: () => "posts",
      providesTags: ["Posts"],
    }),
    addPost: builder.mutation<void, Posts>({
      query: (body) => ({
        method: "POST",
        url: "posts",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    editPost: builder.mutation<void, Posts>({
      query: (body) => ({
        method: "PUT",
        url: `posts/${body.id}`,
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation<unknown, string>({
      query: (id) => ({
        method: "DELETE",
        url: `posts/${id}`,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});
