import { redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const action = async ({ request }) => {
  const form = await request.formData();
  const data = Object.fromEntries(form)
  const post =  await prisma.post.create({data: data})

// todo - submit to database 
  return redirect(`/posts/${post.id}`)
};

function NewPost() {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Post Body</label>
            <textarea name="body" id="body" />
          </div>
          <button type="submit" className="btn btn-block">
            Add Post
          </button>
        </form>
      </div>
    </>
  );
}



export default NewPost;
