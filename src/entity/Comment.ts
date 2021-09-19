import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    content: string;
    @CreateDateColumn('timestamp')
    createdAt: Date;
    @UpdateDateColumn('timestamp')
    updatedAt: Date;
    @ManyToOne(type => User, user => user.comments)
    user: User;
    @ManyToOne(type => Post, post => post.comments)
    post: Post;
}
