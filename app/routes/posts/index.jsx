import { PrismaClient } from "@prisma/client";
import { Link, useLoaderData } from "@remix-run/react";
const prisma = new PrismaClient();

export const loader = async () => {
  const data = {
    posts: await prisma.post.findMany({
      take: 20,
      orderBy: {createAt: 'desc'}
        }),
  };
  return data;
};

function PostItems() {
  const { posts } = useLoaderData();
  return (
    <>
      <div className="page-header">
        <h1>Posts</h1>
        <Link to="/posts/new" className="btn">
          New Post
        </Link>
      </div>
      <ul className="posts-list">
        {posts === null? (posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h3>{post.title}</h3>
              {new Date(post.createAt).toLocaleDateString()}
            </Link>
          </li>
        ))): (
            <h3>No recorded data</h3>
        )}
      </ul>
    </>
  );
}

export default PostItems;
