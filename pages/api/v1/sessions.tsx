import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";

const Sessions: NextApiHandler = async (req, res) => {
  const { username, password } = req.body;
  const connection = getDatabaseConnection();
  const user = await (
    await connection
  ).manager.findOne(User, { where: { username } });
  res.setHeader("Content-Type", "application/json");

  if (user) {
    console.log(user);
    const passwordDigest = md5(password);
    if (user.passwordDigest === passwordDigest) {
      res.statusCode = 200;
      res.end(JSON.stringify(user));
    } else {
      res.statusCode = 422;
      res.end(JSON.stringify({ password: ["密码不匹配"] }));
    }
  } else {
    res.statusCode = 422;
    res.end(JSON.stringify({ username: ["用户名不存在"] }));
  }
};
export default Sessions;
