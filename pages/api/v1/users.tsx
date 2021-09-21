import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";

const Posts: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  const trimUsername = username.trim();
  const errors = {
    username: [] as string[],
    password: [] as string[],
    passwordConfirmation: [] as string[],
  };
  if (trimUsername === "") {
    errors.username.push("用户名不能为空");
  }
  if (!/[a-zA-Z0-9]/.test(trimUsername)) {
    errors.username.push("用户名有非法字符");
  }
  if (trimUsername.length > 42) {
    errors.username.push("用户名太长");
  }
  if (trimUsername.length < 3) {
    errors.username.push("用户名太短");
  }
  if (password === "") {
    errors.password.push("密码不能为空");
  }
  if (password !== passwordConfirmation) {
    errors.passwordConfirmation.push("密码不匹配");
  }

  const hasErrors = Object.values(errors).find((value) => value.length > 0);

  res.setHeader("Content-Type", "application/json");
  if (hasErrors) {
    res.statusCode = 422;
    res.write(JSON.stringify(errors));
  } else {
    const connection = await getDatabaseConnection();
    const user = new User();
    user.username = trimUsername;
    // 暂时用 md 5
    user.passwordDigest = md5(password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};
export default Posts;
