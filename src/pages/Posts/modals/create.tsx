// @ts-nocheck
import {
  Button,
  FormElement,
  Input,
  Modal,
  Spacer,
  Text,
} from "@nextui-org/react";
import { useEffect, useMemo, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../../hooks";
import { postsApi } from "../../../store/api";
import { createPostModalSwitcher } from "../../../store/posts.slice";
import { Posts } from "../../../models";

const initialValues: Posts = {
  id: Math.random().toString(16).slice(2),
  body: "",
  title: "",
};

const { useAddPostMutation } = postsApi;

function Create() {
  const dispatch = useTypedDispatch();

  const [post, setPost] = useState(initialValues);

  const isCreatePostModalVisible = useTypedSelector(
    ({ posts }) => posts.isCreatePostModalVisible
  );

  const [addPost, { isSuccess }] = useAddPostMutation();

  const closeCreatePostModal = () => {
    dispatch(createPostModalSwitcher(false));
    setPost("");
  };

  const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  };

  const validateForm = useMemo(() => {
    return post.body === "" || post.title === "";
  }, [post]);

  const handlePostSubmit = () => {
    addPost(post);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(createPostModalSwitcher(false));
    }
  }, [isSuccess]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isCreatePostModalVisible}
      onClose={closeCreatePostModal}
    >
      <Modal.Header>
        <Text b id="modal-title" size={18}>
          Add post
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Spacer y={0.2} />
        <Input
          color="primary"
          size="lg"
          labelPlaceholder="Title"
          name="title"
          value={post["title"]}
          onChange={handleOnChange}
        />
        <Spacer y={0.2} />
        <Input
          color="primary"
          size="lg"
          labelPlaceholder="Body"
          name="body"
          value={post["body"]}
          onChange={handleOnChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color="error" onPress={closeCreatePostModal}>
          Close
        </Button>
        <Button
          disabled={validateForm}
          animated
          auto
          onPress={handlePostSubmit}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { Create };
