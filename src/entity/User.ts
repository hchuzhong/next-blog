import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { Post } from "./Post";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn('timestamp')
    createdAt: Date;
    @UpdateDateColumn('timestamp')
    updatedAt: Date;
    @OneToMany(type => Post, post => post.author)
    posts: Post[];
    @OneToMany(type => Comment, comment => comment.user)
    comments: Comment[];
}
