import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <div className="cover">
        <img className="logo" src="/logo.png" width="100px" height="100px"/>
        <h1>cz 的个人博客</h1>
        <p>练习时长两年半的前端实习生</p>
        <p>
          <Link href="/posts">
            <a>文章列表</a>
          </Link>
        </p>
      </div>
      <style jsx>{`
        .cover {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
    </>
  );
};
export default Home;
