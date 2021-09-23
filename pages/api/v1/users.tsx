import { getDatabaseConnection } from "lib/getDatabaseConnection";
import md5 from "md5";
import { NextApiHandler } from "next";
import { User } from "src/entity/User";

const Users: NextApiHandler = async (req, res) => {
  const { username, password, passwordConfirmation } = req.body;
  const connection = await getDatabaseConnection();
  res.setHeader("Content-Type", "application/json");

  const user = new User();
  user.username = username.trim();
  // 暂时用 md 5
  user.password = password;
  user.passwordConfirmation = passwordConfirmation;
  await user.validate();

  if (user.hasErrors()) {
    res.statusCode = 422;
    res.write(JSON.stringify(user.errors));
  } else {
    user.passwordDigest = md5(user.password);
    await connection.manager.save(user);
    res.statusCode = 200;
    res.write(JSON.stringify(user));
  }
  res.end();
};
export default Users;
