import { withSession } from "lib/withSession";
import { NextApiHandler } from "next";
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
    req.session.set("currentUser", signIn.user);
    await req.session.save();
    res.statusCode = 200;
    res.end(JSON.stringify(signIn.user));
  }
};
export default withSession(Sessions);
