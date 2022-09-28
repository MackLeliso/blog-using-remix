import { useParams } from "@remix-run/react";

function Post() {
  const params = useParams()
  return <div>Post params {params.postId}</div>;
}

export default Post;
