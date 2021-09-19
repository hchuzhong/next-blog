import "reflect-metadata";
import { createConnection } from "typeorm";
import { Post } from "./entity/Post";
import { User } from "./entity/User";
import { Comment } from "./entity/Comment";

createConnection().then(async connection => {
    const { manager } = connection;
    // create user 1
    const u1 = new User();
    u1.username = 'hcz';
    u1.passwordDigest = 'xxx';
    await manager.save(u1);
    // create post 1
    const p1 = new Post();
    p1.title = 'post 1';
    p1.content = 'My First Post';
    p1.author = u1;
    await manager.save(p1);
    // creat comment
    const c1 = new Comment()
    c1.user = u1;
    c1.post = p1;
    c1.content = 'Awesome!'
    await manager.save(c1);

    console.log('---');
    console.log(u1);
    console.log(u1.id);
    console.log(p1);
    console.log(p1.id);
    console.log(c1);
    console.log(c1.id);

    connection.close()
}).catch(error => console.log(error));
