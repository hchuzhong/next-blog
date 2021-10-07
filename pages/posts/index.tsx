import { GetServerSideProps, NextPage } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import Link from "next/link";
import { usePager } from "hooks/usePager";

type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
};
const PostsIndex: NextPage<Props> = (props) => {
  const { posts, page, totalPage } = props;
  const { pager } = usePager({ page, totalPage });
  return (
    <>
      <div className="posts">
        <h1>文章列表</h1>
        {posts.map((post) => (
          <div key={post.id} className="onePost">
            <Link href={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
          </div>
        ))}
        <footer>{pager}</footer>
      </div>
      <style jsx>{`
        .posts {
          max-width: 800px;
          margin: 0 auto;
          padding: 16px;
        }
        .onePost {
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
        }
        .onePost > a {
          border-bottom: none;
          color: #000;
        }
        .onePost > a:hover {
          color: #00abd5;
        }
      `}</style>
    </>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const index = context.req.url.indexOf("?");
  const paramString = new URLSearchParams(context.req.url.substr(index + 1));
  const page = parseInt(paramString.get("page")) || 1;
  const perPage = 10;
  const connection = await getDatabaseConnection();
  const [posts, count] = await connection.manager.findAndCount(Post, {
    skip: (page - 1) * perPage,
    take: perPage,
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      count,
      perPage,
      page,
      totalPage: Math.ceil(count / perPage),
    },
  };
};
