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
import { updatePostModalSwitcher } from "../../../store/posts.slice";

const { useEditPostMutation } = postsApi;

function Update() {
  const dispatch = useTypedDispatch();

  const [editPost, { isSuccess }] = useEditPostMutation();

  const initialValues = useTypedSelector(({ posts }) => posts.post);

  const [post, setPost] = useState(initialValues);

  const isUpdatePostModalVisible = useTypedSelector(
    ({ posts }) => posts.isUpdatePostModalVisible
  );

  const closeUpdatePostModal = () => {
    dispatch(updatePostModalSwitcher(false));
  };

  const handleOnChange = (e: React.ChangeEvent<FormElement>) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const validateForm = useMemo(() => {
    return post.body === "" || post.title === "";
  }, [post]);

  const handleSubmit = () => {
    editPost(post);
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(updatePostModalSwitcher(false));
    }
  }, [isSuccess]);

  useEffect(() => {
    setPost(initialValues);
  }, [initialValues]);

  return (
    <Modal
      closeButton
      aria-labelledby="modal-title"
      open={isUpdatePostModalVisible}
      onClose={closeUpdatePostModal}
    >
      <Modal.Header>
        <Text b id="modal-title" size={18}>
          Edit post
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
        <Button auto flat color="error" onPress={closeUpdatePostModal}>
          Close
        </Button>
        <Button disabled={validateForm} animated auto onPress={handleSubmit}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export { Update };
