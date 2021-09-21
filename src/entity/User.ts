import { getDatabaseConnection } from "lib/getDatabaseConnection";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(type => Post, post => post.author)
    posts: Post[];
    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];

    errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirmation: [] as string[],
    }
    password: string;
    passwordConfirmation: string;
    async validate() {
        if (this.username === "") {
            this.errors.username.push("用户名不能为空");
        }
        if (!/[a-zA-Z0-9]/.test(this.username)) {
            this.errors.username.push("用户名有非法字符");
        }
        if (this.username.length > 42) {
            this.errors.username.push("用户名太长");
        }
        if (this.username.length < 3) {
            this.errors.username.push("用户名太短");
        }
        const found = await (await getDatabaseConnection()).manager.find(User, { username: this.username });
        console.log('found');
        console.log(found);
        if (found.length !== 0) {
            this.errors.username.push("用户名已存在，不能重复注册");
        }

        if (this.password === "") {
            this.errors.password.push("密码不能为空");
        }
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push("密码不匹配");
        }
    }
    hasErrors() {
        return !!Object.values(this.errors).find((value) => value.length > 0);
    }

}
