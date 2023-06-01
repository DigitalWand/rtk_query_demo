import { Fragment } from "react";
import { Create, PostsTable, Update } from ".";

function Posts() {
  return (
    <Fragment>
      <Create />
      <Update />
      <PostsTable />
    </Fragment>
  );
}

export default Posts;
