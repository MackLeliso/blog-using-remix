import { redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const loader = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postId,
    },
  });
  if (!post) throw new Error("Post not found");
  const data = { post };
  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const post = await prisma.post.findUnique({
      where: {
        id: params.postId,
      },
    });
    if (!post) throw new Error("Post not found");
    await prisma.post.delete({ where: { id: params.postId } });
    return redirect("/posts");
  }
};

function Post() {
  const { post } = useLoaderData();
  console.log(post)
  return (
    <div>
      <div className="page-header">
      <h1>{post.title}</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <p>{post.body}</p>
      </div>
      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">Delete</button>
        </form>
        <Link to="/posts/new" className="btn">
          Add Post
        </Link>
      </div>
    </div>
  );
}

export default Post;
