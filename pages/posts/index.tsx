import { GetServerSideProps, NextPage } from "next";
import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Post } from "src/entity/Post";
import Link from "next/link";

type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
};
const PostsIndex: NextPage<Props> = (props) => {
  const { posts, count, perPage, page } = props;
  return (
    <div>
      <h1>
        文章列表 ({props.count}) 每页 {props.perPage}
      </h1>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </div>
      ))}
      <footer>
        共 {count} 篇文章，当前是第 {page} 页|
        <Link href={`?page=${page - 1}`}>
          <a>上一页</a>
        </Link>
        |
        <Link href={`?page=${page + 1}`}>
          <a>上一页</a>
        </Link>
        |
      </footer>
    </div>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const index = context.req.url.indexOf("?");
  const paramString = new URLSearchParams(context.req.url.substr(index + 1));
  const page = parseInt(paramString.get("page")) || 1;
  const perPage = 3;
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
    },
  };
};
