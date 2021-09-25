import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";
import { SignIn } from "src/model/signIn";

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  res.setHeader("Content-Type", "application/json");

  const signIn = new SignIn();
  signIn.username = username;
  signIn.password = password;
  await signIn.validate();
  if (signIn.hasErrors()) {
    res.statusCode = 422;
    res.end(JSON.stringify(signIn.errors));
  } else {
    res.statusCode = 200;
    res.end(JSON.stringify(signIn.user));
  }

  // const connection = getDatabaseConnection();
  // const user = await (
  //   await connection
  // ).manager.findOne(User, { where: { username } });

  // if (user) {
  //   console.log(user);
  //   const passwordDigest = md5(password);
  //   if (user.passwordDigest === passwordDigest) {
  //     res.statusCode = 200;
  //     res.end(JSON.stringify(user));
  //   } else {
  //     res.statusCode = 422;
  //     res.end(JSON.stringify({ password: ["密码不匹配"] }));
  //   }
  // } else {
  //   res.statusCode = 422;
  //   res.end(JSON.stringify({ username: ["用户名不存在"] }));
  // }
};
export default Sessions;
