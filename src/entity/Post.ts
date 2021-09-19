import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    title: string;
    @Column('varchar')
    content: string;
    @Column('int')
    authorId: number;
    @CreateDateColumn('timestamp')
    createdAt: Date;
    @UpdateDateColumn('timestamp')
    updatedAt: Date;
    @ManyToOne(type => User, user => user.posts)
    author: User;
    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];
}
