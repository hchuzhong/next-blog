import axios from "axios";
import { useForm } from "hooks/useForm";
import { withSession } from "lib/withSession";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { User } from "src/entity/User";

const SignIn: NextPage<{ user: User }> = (props) => {
  const { form } = useForm({
    initFormData: {
      username: "",
      password: "",
    },
    fields: [
      {
        label: "用户名",
        type: "text",
        key: "username",
      },
      {
        label: "密码",
        type: "password",
        key: "password",
      },
    ],
    buttons: <button type="submit">登录</button>,
    submit: {
      request: (formData) => axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert("登录成功");
        const paramString = new URLSearchParams(window.location.search);
        const query = paramString.get("returnTo") || "/";
        window.location.href = query;
      },
    },
  });
  return (
    <>
      {props.user && <div>当前登录用户为 {props.user.username}</div>}
      <h1>登录</h1>
      {form}
    </>
  );
};
export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get("currentUser");
    return {
      props: {
        user: JSON.parse(JSON.stringify(user || "")),
      },
    };
  }
);
