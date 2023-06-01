import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Draft } from "immer";
import { AppDispatch, Posts, PostsSlice } from "../models";

const initialState: PostsSlice = {
  isCreatePostModalVisible: false,
  isUpdatePostModalVisible: false,
  post: {
    id: Math.random().toString(16).slice(2),
    body: "",
    title: "",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPostModalSwitcher: (
      state: Draft<PostsSlice>,
      action: PayloadAction<boolean>
    ) => {
      state.isCreatePostModalVisible = action.payload;
    },
    updatePostModal: (
      state: Draft<PostsSlice>,
      action: PayloadAction<{ modal: boolean; post?: Posts }>
    ) => {
      const { modal, post = initialState.post } = action.payload;
      state.isUpdatePostModalVisible = modal;
      state.post = post;
    },
  },
});

export const { createPostModalSwitcher, updatePostModal } = postsSlice.actions;

export const updatePostModalSwitcher =
  (modal: boolean, post?: Posts) => (dispatch: AppDispatch) => {
    dispatch(updatePostModal({ modal, post }));
  };

export default postsSlice.reducer;
