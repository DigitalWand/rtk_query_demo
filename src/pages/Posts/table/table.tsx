// @ts-nocheck
import { Button, Col, Row, Spacer, Table } from "@nextui-org/react";
import { Fragment } from "react";
import { useTypedDispatch } from "../../../hooks";
import { Posts } from "../../../models";
import { postsApi } from "../../../store/api";
import {
  createPostModalSwitcher,
  updatePostModalSwitcher,
} from "../../../store/posts.slice";
import { DeleteIcon } from "../icons/DeleteIcon";
import { EditIcon } from "../icons/EditIcon";
import { IconButton } from "../icons/IconButton";

const { useGetPostsQuery, useDeletePostMutation } = postsApi;

function PostsTable() {
  const dispatch = useTypedDispatch();

  const { data } = useGetPostsQuery();

  const [deletePost] = useDeletePostMutation();

  const columns = [
    { name: "Id", uid: "id" },
    { name: "Title", uid: "title" },
    { name: "Body", uid: "body" },
    { name: "Actions", uid: "actions" },
  ];

  const openCreatePostModal = () => {
    dispatch(createPostModalSwitcher(true));
  };

  const openUpdatePostModal = (post: Posts) => {
    dispatch(updatePostModalSwitcher(true, post));
  };

  const handleDeletePost = (id: string = "") => {
    deletePost(id);
  };

  const renderCell = (post: Posts, columnKey: any) => {
    const cellValue = post[columnKey as keyof typeof post];
    const body = post?.body?.slice(0, 100);
    const title = post?.title?.slice(0, 100);
    switch (columnKey) {
      case "id":
        return <p>{post?.id}</p>;
      case "title":
        return <p>{title}</p>;
      case "body":
        return <p>{body} </p>;
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <IconButton onClick={() => openUpdatePostModal(post)}>
                <EditIcon size={20} fill="#979797" />
              </IconButton>
            </Col>
            <Col css={{ d: "flex" }}>
              <IconButton onClick={() => handleDeletePost(post?.id)}>
                <DeleteIcon size={20} fill="#FF0080" />
              </IconButton>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }
  };
  return (
    <div>
      <Button onPress={openCreatePostModal}>Add post</Button>
      <Spacer />
      <Table
        aria-label="Example table with custom cells"
        css={{
          height: "auto",
          minWidth: "100%",
          backgroundColor: "#fff",
        }}
        selectionMode="none"
      >
        <Table.Header columns={columns}>
          {(column) => (
            <Table.Column key={column.uid}>{column.name}</Table.Column>
          )}
        </Table.Header>
        <Table.Body items={data || []}>
          {(item: Posts) => (
            <Table.Row>
              {(columnKey) => (
                <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
              )}
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export { PostsTable };
